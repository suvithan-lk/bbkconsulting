import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  Star,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import type { AppointmentWithDetails } from '../../types/database.types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const statusConfig = {
  pending: { color: 'warning', icon: AlertCircle, label: 'Pending' },
  confirmed: { color: 'success', icon: CheckCircle2, label: 'Confirmed' },
  completed: { color: 'primary', icon: CheckCircle2, label: 'Completed' },
  cancelled: { color: 'error', icon: XCircle, label: 'Cancelled' },
};

export function ClientDashboard() {
  const [searchParams] = useSearchParams();
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    pending: 0,
  });

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const { data } = await api.get<{ data: AppointmentWithDetails[] }>('/appointments');
      setAppointments(data);

      const total = data.length;
      const completed = data.filter((a) => a.status === 'completed').length;
      const upcoming = data.filter(
        (a) =>
          a.status === 'confirmed' &&
          new Date(`${a.scheduled_date}T${a.scheduled_time}`) > new Date()
      ).length;
      const pending = data.filter((a) => a.status === 'pending').length;

      setStats({ total, completed, upcoming, pending });
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule a new consultation',
      href: '/book',
      color: 'primary',
    },
    {
      icon: MessageSquare,
      title: 'Messages',
      description: 'View and send messages',
      href: '/client/dashboard/messages',
      color: 'primary',
    },
    {
      icon: FileText,
      title: 'Documents',
      description: 'Access shared documents',
      href: '/client/dashboard/documents',
      color: 'primary',
    },
    {
      icon: Star,
      title: 'Reviews',
      description: 'Manage your reviews',
      href: '/client/dashboard/reviews',
      color: 'primary',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container-custom">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container-custom">
        {/* Success Message */}
        {searchParams.get('booking') === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="text-emerald-700 dark:text-emerald-400">
              Your appointment has been booked successfully! We'll send you a confirmation shortly.
            </p>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.name?.split(' ')[0] || 'Client'}
          </h1>
          <p className="text-slate-500">
            Manage your appointments, messages, and documents all in one place.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {Object.entries({
            total: { label: 'Total Appointments', icon: Calendar, color: 'primary' },
            completed: { label: 'Completed', icon: CheckCircle2, color: 'emerald' },
            upcoming: { label: 'Upcoming', icon: Clock, color: 'blue' },
            pending: { label: 'Pending', icon: AlertCircle, color: 'amber' },
          }).map(([key, config]) => (
            <div key={key} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${config.color}-100 dark:bg-${config.color}-900/30 flex items-center justify-center`}>
                  <config.icon className={`w-5 h-5 text-${config.color}-600`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{stats[key as keyof typeof stats]}</p>
              <p className="text-sm text-slate-500">{config.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="card-hover p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-${action.color}-100 dark:bg-${action.color}-900/30 flex items-center justify-center mb-4`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-slate-500">{action.description}</p>
            </Link>
          ))}
        </motion.div>

        {/* Recent Appointments */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="card"
        >
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold">Recent Appointments</h2>
          </div>

          {appointments.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {appointments.slice(0, 5).map((appointment) => {
                const StatusIcon = statusConfig[appointment.status].icon;
                return (
                  <div key={appointment.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
                          {appointment.consultant.user.avatar_url ? (
                            <img
                              src={appointment.consultant.user.avatar_url}
                              alt={appointment.consultant.user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            appointment.consultant.user.name?.charAt(0)
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.service.title}</h3>
                          <p className="text-sm text-slate-500">
                            with {appointment.consultant.user.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <StatusIcon className={`w-4 h-4 text-${statusConfig[appointment.status].color}-500`} />
                          <span className={`badge badge-${statusConfig[appointment.status].color}`}>
                            {statusConfig[appointment.status].label}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          {new Date(appointment.scheduled_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No appointments yet</h3>
              <p className="text-slate-500 mb-4">
                Book your first consultation to get started.
              </p>
              <Link to="/book" className="btn-primary">
                Book Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {appointments.length > 5 && (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800">
              <Link to="/client/dashboard/appointments" className="link">
                View all appointments &rarr;
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
