package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type TelemetryService struct {
	db    *pgxpool.Pool
	redis *redis.Client
}

type LocationUpdate struct {
	RiderID   string    `json:"rider_id"`
	Lat       float64   `json:"lat"`
	Lng       float64   `json:"lng"`
	Accuracy  float64   `json:"accuracy"`
	Speed     float64   `json:"speed"`
	Heading   float64   `json:"heading"`
	Timestamp time.Time `json:"timestamp"`
}

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:postgres@localhost:5432/riderguy"
	}

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}
	defer pool.Close()

	redisClient := redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_URL"),
	})

	service := &TelemetryService{
		db:    pool,
		redis: redisClient,
	}

	router := mux.NewRouter()

	router.HandleFunc("/api/health", healthHandler).Methods("GET")
	router.HandleFunc("/api/telemetry/location", service.updateLocationHandler).Methods("POST")
	router.HandleFunc("/api/telemetry/batch", service.batchLocationHandler).Methods("POST")
	router.HandleFunc("/api/telemetry/rider/{riderId}/location", service.getRiderLocationHandler).Methods("GET")
	router.HandleFunc("/api/telemetry/rider/{riderId}/history", service.getLocationHistoryHandler).Methods("GET")

	port := os.Getenv("PORT")
	if port == "" {
		port = "3011"
	}

	log.Printf("Telemetry Service (Go) running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"service":   "telemetry-service",
		"status":    "healthy",
		"timestamp": time.Now(),
		"language":  "Go",
	})
}

func (s *TelemetryService) updateLocationHandler(w http.ResponseWriter, r *http.Request) {
	var location LocationUpdate
	if err := json.NewDecoder(r.Body).Decode(&location); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if location.Timestamp.IsZero() {
		location.Timestamp = time.Now()
	}

	// Store in TimescaleDB hypertable for time-series data
	ctx := context.Background()
	_, err := s.db.Exec(ctx, `
		INSERT INTO rider_telemetry 
		(rider_id, location, accuracy, speed, heading, timestamp)
		VALUES ($1, point($2, $3), $4, $5, $6, $7)
	`, location.RiderID, location.Lng, location.Lat, location.Accuracy, location.Speed, location.Heading, location.Timestamp)

	if err != nil {
		log.Println("Database error:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Cache current location in Redis
	locationJSON, _ := json.Marshal(map[string]interface{}{
		"lat":       location.Lat,
		"lng":       location.Lng,
		"speed":     location.Speed,
		"heading":   location.Heading,
		"timestamp": location.Timestamp,
	})

	s.redis.Set(ctx, "rider:location:"+location.RiderID, locationJSON, 5*time.Minute)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Location updated",
	})
}

func (s *TelemetryService) batchLocationHandler(w http.ResponseWriter, r *http.Request) {
	var locations []LocationUpdate
	if err := json.NewDecoder(r.Body).Decode(&locations); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	successful := 0

	for _, location := range locations {
		if location.Timestamp.IsZero() {
			location.Timestamp = time.Now()
		}

		_, err := s.db.Exec(ctx, `
			INSERT INTO rider_telemetry 
			(rider_id, location, accuracy, speed, heading, timestamp)
			VALUES ($1, point($2, $3), $4, $5, $6, $7)
		`, location.RiderID, location.Lng, location.Lat, location.Accuracy, location.Speed, location.Heading, location.Timestamp)

		if err == nil {
			successful++
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":   true,
		"processed": successful,
		"total":     len(locations),
	})
}

func (s *TelemetryService) getRiderLocationHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	riderID := vars["riderId"]

	ctx := context.Background()

	// Try Redis cache first
	cached, err := s.redis.Get(ctx, "rider:location:"+riderID).Result()
	if err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(cached))
		return
	}

	// Fall back to database
	var lat, lng, speed, heading float64
	var timestamp time.Time

	err = s.db.QueryRow(ctx, `
		SELECT location[0] as lng, location[1] as lat, speed, heading, timestamp
		FROM rider_telemetry
		WHERE rider_id = $1
		ORDER BY timestamp DESC
		LIMIT 1
	`, riderID).Scan(&lng, &lat, &speed, &heading, &timestamp)

	if err != nil {
		http.Error(w, "Location not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"rider_id":  riderID,
		"lat":       lat,
		"lng":       lng,
		"speed":     speed,
		"heading":   heading,
		"timestamp": timestamp,
	})
}

func (s *TelemetryService) getLocationHistoryHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	riderID := vars["riderId"]

	// Get query parameters
	hours := r.URL.Query().Get("hours")
	if hours == "" {
		hours = "24"
	}

	ctx := context.Background()
	rows, err := s.db.Query(ctx, `
		SELECT location[0] as lng, location[1] as lat, speed, heading, timestamp
		FROM rider_telemetry
		WHERE rider_id = $1
		AND timestamp > NOW() - INTERVAL '`+hours+` hours'
		ORDER BY timestamp ASC
	`, riderID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var history []map[string]interface{}

	for rows.Next() {
		var lat, lng, speed, heading float64
		var timestamp time.Time

		if err := rows.Scan(&lng, &lat, &speed, &heading, &timestamp); err != nil {
			continue
		}

		history = append(history, map[string]interface{}{
			"lat":       lat,
			"lng":       lng,
			"speed":     speed,
			"heading":   heading,
			"timestamp": timestamp,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"rider_id": riderID,
		"history":  history,
		"count":    len(history),
	})
}
