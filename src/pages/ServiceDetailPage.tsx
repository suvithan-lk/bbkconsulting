import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Star,
  Calendar,
  User,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import type { Service, ConsultantWithUser } from '../types/database.types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const benefits = [
  'Personalized consultation session',
  'Actionable recommendations document',
  'Follow-up support via messaging',
  'Industry-specific insights',
  'Confidential and secure',
];

export function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [consultants, setConsultants] = useState<ConsultantWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const { data: serviceData } = await api.get<{ data: Service | null }>(`/services/${id}`);

      if (serviceData) {
        setService(serviceData);

        const params = new URLSearchParams({ spec: serviceData.category });
        const { data: consultantsData } = await api.get<{ data: ConsultantWithUser[] }>(
          `/consultants?${params.toString()}`
        );
        setConsultants(consultantsData.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching service:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/contact');
      return;
    }
    navigate(`/book?service=${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container-custom">
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
            <p className="text-slate-500 mb-6">
              The service you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/services" className="btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              to="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="badge bg-white/10 text-white border-white/20">
                {service.category}
              </span>
              <span className="badge-success">Available</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section pt-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Service Details */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Related Consultants */}
              {consultants.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Expert Consultants</h2>
                    <Link to="/consultants" className="link text-sm">
                      View All
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {consultants.map((consultant) => (
                      <Link
                        key={consultant.id}
                        to={`/consultants/${consultant.id}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium">
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
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary-600 transition-colors truncate">
                            {consultant.user.name}
                          </h3>
                          <p className="text-sm text-slate-500">{consultant.specialization}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                            <span className="text-sm font-medium">{consultant.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6 sticky top-28"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary-600 mb-1">
                    AED {service.price.toLocaleString()}
                  </div>
                  <p className="text-slate-500">Starting price</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-5 h-5" />
                      Duration
                    </div>
                    <span className="font-medium">{service.duration_minutes} minutes</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar className="w-5 h-5" />
                      Availability
                    </div>
                    <span className="badge-success">Open</span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <User className="w-5 h-5" />
                      Experts
                    </div>
                    <span className="font-medium">{consultants.length} available</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="btn-primary w-full mb-3"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-slate-500">
                  Free consultation available for first-time clients
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
