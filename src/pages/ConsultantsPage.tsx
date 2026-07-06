import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Clock,
  SortAsc,
  ArrowRight,
  Users,
} from 'lucide-react';
import { api } from '../lib/api';
import type { ConsultantWithUser } from '../types/database.types';

const specializations = [
  'All',
  'Business Strategy',
  'Financial Advisory',
  'IT Consulting',
  'Legal Consultation',
  'Marketing',
  'HR Consulting',
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ConsultantsPage() {
  const [searchParams] = useSearchParams();
  const [consultants, setConsultants] = useState<ConsultantWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price'>('rating');

  useEffect(() => {
    const spec = searchParams.get('spec');
    if (spec) {
      setSelectedSpec(spec.replace(/-/g, ' '));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchConsultants();
  }, [selectedSpec, search, sortBy]);

  const fetchConsultants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedSpec !== 'All') params.set('spec', selectedSpec);
      if (search) params.set('search', search);
      params.set('sort', sortBy);

      const { data } = await api.get<{ data: ConsultantWithUser[] }>(`/consultants?${params.toString()}`);
      setConsultants(data);
    } catch (err) {
      console.error('Error fetching consultants:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Our Consultants
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our Expert Team
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              Industry veterans with proven track records ready to guide your business to success.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 lg:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-12"
              />
            </div>

            {/* Specializations */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpec(spec)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedSpec === spec
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SortAsc className="w-5 h-5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="input w-auto"
              >
                <option value="rating">Top Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="price">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Consultants Grid */}
      <section className="section">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4" />
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto mb-2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto mb-4" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              ))}
            </div>
          ) : consultants.length > 0 ? (
            <>
              <p className="text-slate-500 mb-6">
                {consultants.length} expert consultant{consultants.length !== 1 ? 's' : ''} available
              </p>

              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {consultants.map((consultant) => (
                  <motion.div key={consultant.id} variants={fadeInUp}>
                    <div className="card-hover p-6 text-center group h-full flex flex-col">
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-medium ring-4 ring-white dark:ring-slate-800 shadow-soft">
                        {consultant.user.avatar_url ? (
                          <img
                            src={consultant.user.avatar_url}
                            alt={consultant.user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          consultant.user.name?.charAt(0)
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                        {consultant.user.name}
                      </h3>

                      <span className="badge badge-primary self-center mb-3">
                        {consultant.specialization}
                      </span>

                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
                        {consultant.bio}
                      </p>

                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
                          <span className="font-semibold">{consultant.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{consultant.experience_years}+ yrs</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-slate-500">
                          <span className="text-xl font-bold text-primary-600">${consultant.hourly_rate}</span>
                          <span className="text-sm">/hr</span>
                        </div>
                        <Link
                          to={`/consultants/${consultant.id}`}
                          className="btn-primary btn-sm"
                        >
                          View Profile
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No consultants found</h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedSpec('All');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
