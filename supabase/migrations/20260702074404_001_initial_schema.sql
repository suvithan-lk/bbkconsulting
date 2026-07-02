/*
# Initial Schema for Consultancy Platform

This migration creates the complete database structure for a consultancy firm website
with real-time client-consultant interaction capabilities.

## 1. New Tables

### users (extends auth.users)
- `id` (uuid, primary key, references auth.users)
- `name` (text, not null)
- `email` (text, unique, not null)
- `phone` (text, nullable)
- `avatar_url` (text, nullable)
- `role` (enum: client/consultant/admin, default: client)
- `created_at` (timestamp with timezone, default now())
- `updated_at` (timestamp with timezone, default now())

### consultants
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users)
- `specialization` (text, not null)
- `bio` (text, nullable)
- `experience_years` (integer, default 0)
- `rating` (decimal, default 0)
- `hourly_rate` (decimal, not null)
- `availability` (jsonb, default '{}')
- `verified` (boolean, default false)
- `created_at` (timestamp with timezone)

### services
- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text, nullable)
- `category` (text, not null)
- `price` (decimal, not null)
- `icon` (text, nullable)
- `duration_minutes` (integer, default 60)
- `active` (boolean, default true)
- `created_at` (timestamp with timezone)

### appointments
- `id` (uuid, primary key)
- `client_id` (uuid, foreign key to users)
- `consultant_id` (uuid, foreign key to consultants)
- `service_id` (uuid, foreign key to services)
- `scheduled_date` (date, not null)
- `scheduled_time` (time, not null)
- `status` (enum: pending/confirmed/completed/cancelled, default: pending)
- `notes` (text, nullable)
- `meeting_link` (text, nullable)
- `created_at` (timestamp with timezone)
- `updated_at` (timestamp with timezone)

### messages
- `id` (uuid, primary key)
- `appointment_id` (uuid, foreign key to appointments)
- `sender_id` (uuid, foreign key to users)
- `receiver_id` (uuid, foreign key to users)
- `content` (text, not null)
- `file_url` (text, nullable)
- `read` (boolean, default false)
- `created_at` (timestamp with timezone)

### notifications
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users)
- `type` (text, not null)
- `title` (text, not null)
- `content` (text, nullable)
- `read` (boolean, default false)
- `data` (jsonb, default '{}')
- `created_at` (timestamp with timezone)

### documents
- `id` (uuid, primary key)
- `appointment_id` (uuid, foreign key to appointments)
- `uploaded_by` (uuid, foreign key to users)
- `file_name` (text, not null)
- `file_url` (text, not null)
- `file_type` (text, nullable)
- `file_size` (integer, nullable)
- `created_at` (timestamp with timezone)

### reviews
- `id` (uuid, primary key)
- `appointment_id` (uuid, foreign key to appointments)
- `client_id` (uuid, foreign key to users)
- `consultant_id` (uuid, foreign key to consultants)
- `rating` (integer, 1-5, not null)
- `comment` (text, nullable)
- `created_at` (timestamp with timezone)

## 2. Security
- Enable RLS on all tables
- Owner-scoped policies for users, appointments, messages, notifications, documents
- Public read for consultants (profile viewing), services
- Appropriate CRUD policies for each table

## 3. Indexes
- appointments by client, consultant, date, status
- messages by appointment
- notifications by user and read status
- reviews by consultant
*/

-- Create custom enum types
CREATE TYPE user_role AS ENUM ('client', 'consultant', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    phone text,
    avatar_url text,
    role user_role NOT NULL DEFAULT 'client',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create consultants table
CREATE TABLE IF NOT EXISTS consultants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialization text NOT NULL,
    bio text,
    experience_years integer DEFAULT 0,
    rating decimal(3,2) DEFAULT 0.00,
    hourly_rate decimal(10,2) NOT NULL DEFAULT 0.00,
    availability jsonb DEFAULT '{}',
    verified boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    category text NOT NULL,
    price decimal(10,2) NOT NULL,
    icon text,
    duration_minutes integer DEFAULT 60,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consultant_id uuid NOT NULL REFERENCES consultants(id) ON DELETE CASCADE,
    service_id uuid NOT NULL REFERENCES services(id) ON DELETE SET NULL,
    scheduled_date date NOT NULL,
    scheduled_time time NOT NULL,
    status appointment_status NOT NULL DEFAULT 'pending',
    notes text,
    meeting_link text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content text NOT NULL,
    file_url text,
    read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type text NOT NULL,
    title text NOT NULL,
    content text,
    read boolean DEFAULT false,
    data jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    uploaded_by uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_name text NOT NULL,
    file_url text NOT NULL,
    file_type text,
    file_size integer,
    created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consultant_id uuid NOT NULL REFERENCES consultants(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamptz DEFAULT now(),
    UNIQUE(appointment_id)
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultants ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- USERS POLICIES
DROP POLICY IF EXISTS "users_select_own" ON users;
CREATE POLICY "users_select_own" ON users FOR SELECT
    TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON users;
CREATE POLICY "users_update_own" ON users FOR UPDATE
    TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "users_insert_own" ON users;
CREATE POLICY "users_insert_own" ON users FOR INSERT
    TO authenticated WITH CHECK (auth.uid() = id);

-- Admin can see all users
DROP POLICY IF EXISTS "admin_select_all_users" ON users;
CREATE POLICY "admin_select_all_users" ON users FOR SELECT
    TO authenticated USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- CONSULTANTS POLICIES (Public read for profiles, owner update)
DROP POLICY IF EXISTS "consultants_public_select" ON consultants;
CREATE POLICY "consultants_public_select" ON consultants FOR SELECT
    TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "consultants_insert_own" ON consultants;
CREATE POLICY "consultants_insert_own" ON consultants FOR INSERT
    TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "consultants_update_own" ON consultants;
CREATE POLICY "consultants_update_own" ON consultants FOR UPDATE
    TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- SERVICES POLICIES (Public read, admin write)
DROP POLICY IF EXISTS "services_public_select" ON services;
CREATE POLICY "services_public_select" ON services FOR SELECT
    TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "services_admin_insert" ON services;
CREATE POLICY "services_admin_insert" ON services FOR INSERT
    TO authenticated WITH CHECK (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

DROP POLICY IF EXISTS "services_admin_update" ON services;
CREATE POLICY "services_admin_update" ON services FOR UPDATE
    TO authenticated USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- APPOINTMENTS POLICIES (Owner-scoped for clients and consultants)
DROP POLICY IF EXISTS "appointments_select_own" ON appointments;
CREATE POLICY "appointments_select_own" ON appointments FOR SELECT
    TO authenticated USING (
        client_id = auth.uid() 
        OR EXISTS (SELECT 1 FROM consultants WHERE user_id = auth.uid() AND id = consultant_id)
        OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

DROP POLICY IF EXISTS "appointments_insert_own" ON appointments;
CREATE POLICY "appointments_insert_own" ON appointments FOR INSERT
    TO authenticated WITH CHECK (client_id = auth.uid());

DROP POLICY IF EXISTS "appointments_update_own" ON appointments;
CREATE POLICY "appointments_update_own" ON appointments FOR UPDATE
    TO authenticated USING (
        client_id = auth.uid() 
        OR EXISTS (SELECT 1 FROM consultants WHERE user_id = auth.uid() AND id = consultant_id)
        OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- MESSAGES POLICIES (Participants in appointment can access)
DROP POLICY IF EXISTS "messages_select_own" ON messages;
CREATE POLICY "messages_select_own" ON messages FOR SELECT
    TO authenticated USING (
        sender_id = auth.uid() 
        OR receiver_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM appointments 
            WHERE id = appointment_id 
            AND (client_id = auth.uid() OR EXISTS (SELECT 1 FROM consultants WHERE user_id = auth.uid() AND id = consultant_id))
        )
    );

DROP POLICY IF EXISTS "messages_insert_own" ON messages;
CREATE POLICY "messages_insert_own" ON messages FOR INSERT
    TO authenticated WITH CHECK (
        sender_id = auth.uid()
    );

DROP POLICY IF EXISTS "messages_update_own" ON messages;
CREATE POLICY "messages_update_own" ON messages FOR UPDATE
    TO authenticated USING (receiver_id = auth.uid());

-- NOTIFICATIONS POLICIES (Owner-scoped)
DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT
    TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_insert_own" ON notifications;
CREATE POLICY "notifications_insert_own" ON notifications FOR INSERT
    TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_update_own" ON notifications;
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE
    TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_delete_own" ON notifications;
CREATE POLICY "notifications_delete_own" ON notifications FOR DELETE
    TO authenticated USING (user_id = auth.uid());

-- DOCUMENTS POLICIES (Appointment participants)
DROP POLICY IF EXISTS "documents_select_participant" ON documents;
CREATE POLICY "documents_select_participant" ON documents FOR SELECT
    TO authenticated USING (
        EXISTS (
            SELECT 1 FROM appointments 
            WHERE id = appointment_id 
            AND (client_id = auth.uid() OR EXISTS (SELECT 1 FROM consultants WHERE user_id = auth.uid() AND id = consultant_id))
        )
    );

DROP POLICY IF EXISTS "documents_insert_participant" ON documents;
CREATE POLICY "documents_insert_participant" ON documents FOR INSERT
    TO authenticated WITH CHECK (
        uploaded_by = auth.uid()
        AND EXISTS (
            SELECT 1 FROM appointments 
            WHERE id = appointment_id 
            AND (client_id = auth.uid() OR EXISTS (SELECT 1 FROM consultants WHERE user_id = auth.uid() AND id = consultant_id))
        )
    );

DROP POLICY IF EXISTS "documents_delete_participant" ON documents;
CREATE POLICY "documents_delete_participant" ON documents FOR DELETE
    TO authenticated USING (
        uploaded_by = auth.uid()
        OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
    );

-- REVIEWS POLICIES (Client can review, public can read)
DROP POLICY IF EXISTS "reviews_public_select" ON reviews;
CREATE POLICY "reviews_public_select" ON reviews FOR SELECT
    TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "reviews_insert_own" ON reviews;
CREATE POLICY "reviews_insert_own" ON reviews FOR INSERT
    TO authenticated WITH CHECK (client_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_consultant ON appointments(consultant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_messages_appointment ON messages(appointment_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_reviews_consultant ON reviews(consultant_id);
CREATE INDEX IF NOT EXISTS idx_consultants_specialization ON consultants(specialization);