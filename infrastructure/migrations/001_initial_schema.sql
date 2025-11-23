-- Create riders table
CREATE TABLE IF NOT EXISTS riders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    region_id UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'inactive', 'blocked')),
    rating DECIMAL(3,2) DEFAULT 5.0,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT false,
    profile_image TEXT,
    address JSONB,
    emergency_contact JSONB,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE
);

-- Create rider_documents table
CREATE TABLE IF NOT EXISTS rider_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('id_card', 'drivers_license', 'vehicle_registration', 'insurance', 'profile_photo', 'background_check')),
    file_key TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
    verified_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL,
    pickup_address JSONB NOT NULL,
    dropoff_address JSONB NOT NULL,
    assigned_rider_id UUID REFERENCES riders(id) ON DELETE SET NULL,
    status VARCHAR(30) DEFAULT 'created' CHECK (status IN ('created', 'assigned', 'accepted', 'in_progress', 'arrived_pickup', 'picked_up', 'arrived_dropoff', 'completed', 'canceled', 'failed')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    estimated_time INTEGER, -- minutes
    distance INTEGER, -- meters
    earnings DECIMAL(10,2) NOT NULL,
    proof_of_delivery JSONB,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID UNIQUE NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    balance DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    pending_hold DECIMAL(10,2) DEFAULT 0.00,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    total_withdrawals DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('earning', 'bonus', 'penalty', 'withdrawal', 'refund', 'adjustment', 'tip')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'canceled')),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- minutes
    level INTEGER DEFAULT 1,
    required_for_levels INTEGER[],
    mandatory BOOLEAN DEFAULT false,
    category VARCHAR(50) NOT NULL CHECK (category IN ('safety', 'navigation', 'customer_service', 'vehicle_maintenance', 'regulations', 'advanced_skills')),
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('video', 'text', 'interactive', 'quiz')),
    content_ref TEXT NOT NULL,
    duration INTEGER, -- minutes
    sort_order INTEGER NOT NULL,
    quiz_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create training_progress table
CREATE TABLE IF NOT EXISTS training_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'failed', 'expired')),
    score INTEGER,
    certificate_url TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(rider_id, course_id)
);

-- Create xp_events table
CREATE TABLE IF NOT EXISTS xp_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('task_completed', 'training_completed', 'perfect_delivery', 'streak_bonus', 'referral', 'milestone', 'community_contribution')),
    xp_amount INTEGER NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create levels table
CREATE TABLE IF NOT EXISTS levels (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    xp_threshold INTEGER NOT NULL,
    privileges JSONB,
    badge_url TEXT,
    color VARCHAR(7)
);

-- Create community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL,
    content TEXT NOT NULL,
    attachments TEXT[],
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft', 'moderation', 'removed')),
    likes INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create channels table
CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('general', 'regional', 'help', 'announcements', 'training')),
    region_id UUID,
    is_private BOOLEAN DEFAULT false,
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create insurance_enrollments table
CREATE TABLE IF NOT EXISTS insurance_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'expired', 'canceled')),
    premium DECIMAL(10,2) NOT NULL,
    coverage JSONB NOT NULL,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('vehicle_purchase', 'vehicle_repair', 'equipment', 'emergency', 'education')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disbursed', 'repaying', 'completed', 'defaulted')),
    approved_amount DECIMAL(10,2),
    interest_rate DECIMAL(5,2),
    repayment_period INTEGER, -- months
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('accident', 'harassment', 'theft', 'vehicle_breakdown', 'customer_dispute', 'safety_concern', 'other')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT NOT NULL,
    evidence_keys TEXT[],
    location JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'reported' CHECK (status IN ('reported', 'investigating', 'resolved', 'closed', 'escalated')),
    escalated_to TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    referred_id UUID NOT NULL REFERENCES riders(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired', 'canceled')),
    reward_paid BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX idx_riders_email ON riders(email);
CREATE INDEX idx_riders_phone ON riders(phone);
CREATE INDEX idx_riders_region ON riders(region_id);
CREATE INDEX idx_riders_status ON riders(status);
CREATE INDEX idx_rider_documents_rider_id ON rider_documents(rider_id);
CREATE INDEX idx_tasks_assigned_rider ON tasks(assigned_rider_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_training_progress_rider_id ON training_progress(rider_id);
CREATE INDEX idx_xp_events_rider_id ON xp_events(rider_id);
CREATE INDEX idx_xp_events_created_at ON xp_events(created_at DESC);
CREATE INDEX idx_community_posts_channel_id ON community_posts(channel_id);
CREATE INDEX idx_community_posts_author_id ON community_posts(author_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_incidents_rider_id ON incidents(rider_id);
CREATE INDEX idx_incidents_status ON incidents(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to tables
CREATE TRIGGER update_riders_updated_at BEFORE UPDATE ON riders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rider_documents_updated_at BEFORE UPDATE ON rider_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_training_progress_updated_at BEFORE UPDATE ON training_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_insurance_enrollments_updated_at BEFORE UPDATE ON insurance_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON loan_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default levels
INSERT INTO levels (id, name, xp_threshold, privileges, color) VALUES
(1, 'Rookie', 0, '[]', '#808080'),
(2, 'Bronze', 100, '[{"type": "priority_tasks", "value": false}]', '#CD7F32'),
(3, 'Silver', 500, '[{"type": "priority_tasks", "value": true}]', '#C0C0C0'),
(4, 'Gold', 1500, '[{"type": "priority_tasks", "value": true}, {"type": "higher_earnings", "value": 1.05}]', '#FFD700'),
(5, 'Platinum', 3000, '[{"type": "priority_tasks", "value": true}, {"type": "higher_earnings", "value": 1.1}, {"type": "instant_payout", "value": true}]', '#E5E4E2'),
(6, 'Diamond', 6000, '[{"type": "priority_tasks", "value": true}, {"type": "higher_earnings", "value": 1.15}, {"type": "instant_payout", "value": true}, {"type": "premium_support", "value": true}]', '#B9F2FF'),
(7, 'Elite', 10000, '[{"type": "priority_tasks", "value": true}, {"type": "higher_earnings", "value": 1.2}, {"type": "instant_payout", "value": true}, {"type": "premium_support", "value": true}, {"type": "mentor_access", "value": true}]', '#FF6B6B')
ON CONFLICT (id) DO NOTHING;
