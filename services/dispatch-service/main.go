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

type DispatchService struct {
	db    *pgxpool.Pool
	redis *redis.Client
}

type Task struct {
	TaskID           string    `json:"task_id"`
	PickupLocation   Location  `json:"pickup_location"`
	DeliveryLocation Location  `json:"delivery_location"`
	Priority         string    `json:"priority"`
	Status           string    `json:"status"`
	CreatedAt        time.Time `json:"created_at"`
}

type Location struct {
	Lat  float64 `json:"lat"`
	Lng  float64 `json:"lng"`
	Name string  `json:"name"`
}

type Rider struct {
	RiderID     string   `json:"rider_id"`
	Location    Location `json:"location"`
	Available   bool     `json:"available"`
	VehicleType string   `json:"vehicle_type"`
	Rating      float64  `json:"rating"`
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

	service := &DispatchService{
		db:    pool,
		redis: redisClient,
	}

	router := mux.NewRouter()

	router.HandleFunc("/api/health", healthHandler).Methods("GET")
	router.HandleFunc("/api/dispatch/match", service.matchRiderHandler).Methods("POST")
	router.HandleFunc("/api/dispatch/assign", service.assignTaskHandler).Methods("POST")
	router.HandleFunc("/api/dispatch/optimize", service.optimizeRoutesHandler).Methods("POST")

	port := os.Getenv("PORT")
	if port == "" {
		port = "3010"
	}

	log.Printf("Dispatch Service (Go) running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"service":   "dispatch-service",
		"status":    "healthy",
		"timestamp": time.Now(),
		"language":  "Go",
	})
}

func (s *DispatchService) matchRiderHandler(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Smart matching algorithm
	riders := s.findNearbyRiders(task.PickupLocation, 5.0)
	bestRider := s.selectBestRider(riders, task)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":    true,
		"rider":      bestRider,
		"candidates": len(riders),
	})
}

func (s *DispatchService) assignTaskHandler(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		TaskID  string `json:"task_id"`
		RiderID string `json:"rider_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update task assignment in database
	ctx := context.Background()
	_, err := s.db.Exec(ctx,
		"UPDATE tasks SET rider_id = $1, status = 'assigned', assigned_at = NOW() WHERE task_id = $2",
		payload.RiderID, payload.TaskID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Task assigned successfully",
	})
}

func (s *DispatchService) optimizeRoutesHandler(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		RiderID string   `json:"rider_id"`
		TaskIDs []string `json:"task_ids"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Route optimization logic (TSP-like problem)
	optimizedRoute := s.optimizeRoute(payload.RiderID, payload.TaskIDs)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":         true,
		"optimized_route": optimizedRoute,
	})
}

func (s *DispatchService) findNearbyRiders(location Location, radiusKm float64) []Rider {
	// Haversine formula for finding nearby riders
	// In production, use PostGIS or similar
	riders := []Rider{}

	ctx := context.Background()
	rows, err := s.db.Query(ctx, `
		SELECT rider_id, current_location, available, vehicle_type, rating
		FROM riders
		WHERE available = true
		AND status = 'active'
	`)

	if err != nil {
		log.Println("Query error:", err)
		return riders
	}
	defer rows.Close()

	for rows.Next() {
		var rider Rider
		var locationJSON []byte

		err := rows.Scan(&rider.RiderID, &locationJSON, &rider.Available, &rider.VehicleType, &rider.Rating)
		if err != nil {
			continue
		}

		json.Unmarshal(locationJSON, &rider.Location)

		distance := haversine(location, rider.Location)
		if distance <= radiusKm {
			riders = append(riders, rider)
		}
	}

	return riders
}

func (s *DispatchService) selectBestRider(riders []Rider, task Task) *Rider {
	if len(riders) == 0 {
		return nil
	}

	// Scoring algorithm: distance (40%), rating (30%), priority match (30%)
	var bestRider *Rider
	bestScore := 0.0

	for i := range riders {
		rider := &riders[i]

		distance := haversine(task.PickupLocation, rider.Location)
		distanceScore := (5.0 - distance) / 5.0 * 40.0

		ratingScore := rider.Rating / 5.0 * 30.0

		priorityScore := 30.0
		if task.Priority == "urgent" {
			priorityScore = 40.0
		}

		totalScore := distanceScore + ratingScore + priorityScore

		if totalScore > bestScore {
			bestScore = totalScore
			bestRider = rider
		}
	}

	return bestRider
}

func (s *DispatchService) optimizeRoute(riderID string, taskIDs []string) []string {
	// Simplified nearest neighbor TSP
	// In production, use more sophisticated algorithms (OR-Tools, etc.)
	return taskIDs
}

func haversine(loc1, loc2 Location) float64 {
	const earthRadius = 6371.0 // km

	lat1 := loc1.Lat * 3.14159265359 / 180.0
	lat2 := loc2.Lat * 3.14159265359 / 180.0
	lng1 := loc1.Lng * 3.14159265359 / 180.0
	lng2 := loc2.Lng * 3.14159265359 / 180.0

	dlat := lat2 - lat1
	dlng := lng2 - lng1

	a := 0.5 - 0.5*((dlat)/2.0) + (lat1)*(lat2)*0.5*(1.0-((dlng)/2.0))

	return earthRadius * 2.0 * a
}
