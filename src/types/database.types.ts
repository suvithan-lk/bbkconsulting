export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          role: 'client' | 'consultant' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'client' | 'consultant' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'client' | 'consultant' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      consultants: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          specialization: string;
          bio?: string | null;
          experience_years?: number;
          rating?: number;
          hourly_rate: number;
          availability?: Json;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          specialization?: string;
          bio?: string | null;
          experience_years?: number;
          rating?: number;
          hourly_rate?: number;
          availability?: Json;
          verified?: boolean;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string;
          price: number;
          icon: string | null;
          duration_minutes: number;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category: string;
          price: number;
          icon?: string | null;
          duration_minutes?: number;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          price?: number;
          icon?: string | null;
          duration_minutes?: number;
          active?: boolean;
          created_at?: string;
        };
      };
      appointments: {
        Row: {
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
        };
        Insert: {
          id?: string;
          client_id: string;
          consultant_id: string;
          service_id: string;
          scheduled_date: string;
          scheduled_time: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string | null;
          meeting_link?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          consultant_id?: string;
          service_id?: string;
          scheduled_date?: string;
          scheduled_time?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string | null;
          meeting_link?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          appointment_id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          file_url: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          appointment_id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          file_url?: string | null;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          appointment_id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          file_url?: string | null;
          read?: boolean;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          content: string | null;
          read: boolean;
          data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          content?: string | null;
          read?: boolean;
          data?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          content?: string | null;
          read?: boolean;
          data?: Json;
          created_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          appointment_id: string;
          uploaded_by: string;
          file_name: string;
          file_url: string;
          file_type: string | null;
          file_size: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          appointment_id: string;
          uploaded_by: string;
          file_name: string;
          file_url: string;
          file_type?: string | null;
          file_size?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          appointment_id?: string;
          uploaded_by?: string;
          file_name?: string;
          file_url?: string;
          file_type?: string | null;
          file_size?: number | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          appointment_id: string;
          client_id: string;
          consultant_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          appointment_id: string;
          client_id: string;
          consultant_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          appointment_id?: string;
          client_id?: string;
          consultant_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: 'client' | 'consultant' | 'admin';
      appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Insertable<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type Updatable<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type User = Tables<'users'>;
export type Consultant = Tables<'consultants'>;
export type Service = Tables<'services'>;
export type Appointment = Tables<'appointments'>;
export type Message = Tables<'messages'>;
export type Notification = Tables<'notifications'>;
export type Document = Tables<'documents'>;
export type Review = Tables<'reviews'>;

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
