export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'client' | 'consultant' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Consultant {
  id: string;
  user_id: string;
  specialization: string;
  bio: string | null;
  experience_years: number;
  rating: number;
  hourly_rate: number;
  availability: Json;
  verified: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  category: string;
  price: number;
  icon: string | null;
  duration_minutes: number;
  active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  consultant_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  meeting_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  appointment_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  file_url: string | null;
  read: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content: string | null;
  read: boolean;
  data: Json;
  created_at: string;
}

export interface Document {
  id: string;
  appointment_id: string;
  uploaded_by: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
}

export interface Review {
  id: string;
  appointment_id: string;
  client_id: string;
  consultant_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface ConsultantWithUser extends Consultant {
  user: User;
}

export interface AppointmentWithDetails extends Appointment {
  client: User;
  consultant: ConsultantWithUser;
  service: Service;
}

export interface MessageWithSender extends Message {
  sender: User;
}
