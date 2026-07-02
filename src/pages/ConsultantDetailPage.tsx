import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  MessageSquare,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Mail,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { ConsultantWithUser, Service, Review } from '../types/database.types';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function ConsultantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [consultant, setConsultant] = useState<ConsultantWithUser | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<(Review & { client: { name: string; avatar_url: string | null } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchConsultant();
    }
  }, [id]);

  const fetchConsultant = async () => {
    try {
      const { data: consultantData, error } = await supabase
        .from('consultants')
        .select('*, user:users(*)')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (consultantData) {
        setConsultant(consultantData as ConsultantWithUser);

        // Fetch related services
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .eq('category', consultantData.specialization)
          .eq('active', true)
          .limit(4);

        if (servicesData) setServices(servicesData);

        // Fetch reviews
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*, client:users!client_id(name, avatar_url)')
          .eq('consultant_id', id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (reviewsData) {
          // Type assertion for the nested client data
          setReviews(reviewsData as typeof reviews);
        }
      }
    } catch (err) {
      console.error('Error fetching consultant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login?redirect=/consultants/' + id);
      return;
    }
    navigate(`/book?consultant=${id}`);
  };

  const getAvailabilityForDay = (day: string) => {
    if (!consultant?.availability) return null;
    const avail = consultant.availability as Record<string, { start: string; end: string; available: boolean }>;
    return avail[day.toLowerCase()];
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="flex gap-8">
                <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container-custom">
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Consultant Not Found</h2>
            <p className="text-slate-500 mb-6">
              The consultant you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/consultants" className="btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Consultants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const avgRating = consultant.rating || 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Link
              to="/consultants"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Consultants
            </Link>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl font-medium ring-4 ring-white/20 shadow-soft-lg">
              {consultant.user.avatar_url ? (
                <img
                  src={consultant.user.avatar_url}
                  alt={consultant.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                consultant.user.name?.charAt(0)
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{consultant.user.name}</h1>
                {consultant.verified && (
                  <span className="badge bg-gold-500/20 text-gold-400 border-gold-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>

              <p className="text-xl text-primary-300 mb-4">{consultant.specialization}</p>

              <div className="flex flex-wrap items-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  <span className="text-lg font-medium">{avgRating.toFixed(1)}</span>
                  <span className="text-slate-400">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{consultant.experience_years}+ years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>${consultant.hourly_rate}/hr</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section pt-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {consultant.bio || 'No bio available.'}
                </p>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Weekly Availability</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {daysOfWeek.map((day) => {
                    const availability = getAvailabilityForDay(day);
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          availability?.available
                            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'
                        } ${selectedDay === day ? 'ring-2 ring-primary-500' : ''}`}
                      >
                        <p className="font-medium text-sm">{day}</p>
                        {availability?.available ? (
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                            {availability.start} - {availability.end}
                          </p>
                        ) : (
                          <p className="text-xs text-slate-400 mt-1">Unavailable</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Reviews */}
              {reviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
                      <span className="font-bold">{avgRating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm">
                            {review.client.avatar_url ? (
                              <img src={review.client.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              review.client.name?.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{review.client.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'text-gold-500 fill-gold-500'
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {review.comment && (
                          <p className="text-slate-500">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Related Services */}
              {services.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Related Services</h2>
                    <Link to="/services" className="link text-sm">View All</Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.id}`}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <h3 className="font-medium group-hover:text-primary-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          ${service.price.toLocaleString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6 sticky top-28"
              >
                <div className="text-center mb-6">
                  <p className="text-slate-500 mb-1">Hourly Rate</p>
                  <p className="text-3xl font-bold text-primary-600">
                    ${consultant.hourly_rate}
                    <span className="text-base font-normal text-slate-400">/hr</span>
                  </p>
                </div>

                <button
                  onClick={handleBookNow}
                  className="btn-primary w-full mb-3"
                >
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </button>

                <Link
                  to={`/book?consultant=${id}&message=true`}
                  className="btn-outline w-full"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </Link>

                <div className="mt-6 space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{consultant.user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">Available Online</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-sm">{consultant.experience_years}+ years exp.</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
