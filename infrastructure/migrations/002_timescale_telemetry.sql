-- Create telemetry table using TimescaleDB hypertable
CREATE TABLE IF NOT EXISTS telemetry (
    time TIMESTAMPTZ NOT NULL,
    rider_id UUID NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    speed DOUBLE PRECISION,
    heading DOUBLE PRECISION,
    device_battery INTEGER,
    event_type VARCHAR(50),
    metadata JSONB
);

-- Convert to hypertable
SELECT create_hypertable('telemetry', 'time', if_not_exists => TRUE);

-- Create indexes for efficient querying
CREATE INDEX idx_telemetry_rider_time ON telemetry (rider_id, time DESC);
CREATE INDEX idx_telemetry_location ON telemetry USING GIST (ll_to_earth(latitude, longitude));

-- Create retention policy (keep data for 90 days)
SELECT add_retention_policy('telemetry', INTERVAL '90 days', if_not_exists => TRUE);

-- Create continuous aggregates for analytics
CREATE MATERIALIZED VIEW telemetry_hourly
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS bucket,
    rider_id,
    COUNT(*) AS event_count,
    AVG(speed) AS avg_speed,
    MAX(speed) AS max_speed,
    AVG(device_battery) AS avg_battery
FROM telemetry
GROUP BY bucket, rider_id
WITH NO DATA;

-- Refresh policy for continuous aggregate
SELECT add_continuous_aggregate_policy('telemetry_hourly',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour',
    if_not_exists => TRUE
);
