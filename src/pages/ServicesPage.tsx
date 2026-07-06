import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  DollarSign,
  Clock,
  Filter,
  Search,
  ArrowRight,
  SortAsc,
  ScrollText,
  FileBarChart,
  Landmark,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../lib/api';
import type { Service } from '../types/database.types';

const categories = [
  'All',
  'Tax Advisory',
  'Financial Reporting',
  'Corporate Finance',
  'Audit & Assurance',
  'Forensic Accounting',
  'Cloud Accounting',
];

const coreServices = [
  {
    icon: ScrollText,
    number: '01',
    title: 'Tax Advisory & Compliance',
    description:
      "Navigating the UAE's evolving tax landscape requires strategic expertise that combines local knowledge with global awareness. BBK's tax team provides comprehensive advisory across UAE Corporate Tax, VAT, transfer pricing, and international tax structures — ensuring you pay what you owe, and not a penny more.",
    features: [
      'UAE Corporate Tax (9%) Planning & Compliance',
      'VAT Registration, Filing & Advisory',
      'Transfer Pricing Documentation',
      'Cross-Border Tax Structuring',
      'OECD Pillar Two (Global Minimum Tax) Compliance',
      'Tax Due Diligence for M&A Transactions',
    ],
  },
  {
    icon: FileBarChart,
    number: '02',
    title: 'Financial Reporting & IFRS Advisory',
    description:
      "BBK's IFRS-certified accountants ensure your financial statements meet the highest international standards. Whether you are transitioning from local GAAP to IFRS, adopting new standards such as IFRS 15, 16, or 17, or preparing for an IPO, our technical expertise ensures your reporting reflects both accuracy and strategic positioning.",
    features: [],
  },
  {
    icon: Building2,
    number: '03',
    title: 'Corporate Services — Company Formation & Residency Visa',
    description:
      'From free zone and mainland company formation to residency (Golden) visa preparation, our corporate services team handles the full setup process — trade licensing, bank account facilitation, and Emirates ID coordination — so you can start operating in the UAE with confidence.',
    features: [
      'Free Zone & Mainland Company Formation',
      'Trade Licence Application & Renewal',
      'Residency (Golden) Visa Preparation',
      'Corporate Bank Account Facilitation',
    ],
  },
  {
    icon: Landmark,
    number: '04',
    title: 'Corporate Finance & Transaction Advisory',
    description:
      'Our corporate finance advisors support businesses through mergers, acquisitions, disposals, and fundraising transactions. We offer independent business valuations, financial due diligence, deal structuring, and post-merger integration — providing the financial intelligence that drives better transaction outcomes.',
    features: [],
  },
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

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name'>('name');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category.replace(/-/g, ' '));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchServices();
  }, [selectedCategory, search, sortBy]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      if (search) params.set('search', search);
      params.set('sort', sortBy);

      const { data } = await api.get<{ data: Service[] }>(`/services?${params.toString()}`);
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category.toLowerCase().replace(/ /g, '-'));
    }
    setSearchParams(searchParams);
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
              Our Services
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              End-to-End Accounting &amp; Financial Advisory Services
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              From statutory audit to digital CFO services, BBK Consultancy offers a complete suite
              of accounting, tax, and financial consulting solutions — including UAE Corporate Tax,
              VAT, and free zone company formation — designed to support your business at every
              stage of growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Service Details */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Core Services
            </motion.span>
            <motion.h2 variants={fadeInUp}>Where BBK Consultancy Delivers Most Value</motion.h2>
          </motion.div>

          <div className="space-y-10">
            {coreServices.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <span className="text-primary-600 font-semibold text-sm">{service.number}</span>
                  <h2 className="text-2xl font-bold mt-1 mb-3">{service.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-5">{service.description}</p>
                  {service.features.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 lg:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-12"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
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
                <option value="name">Sort by Name</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <>
              <p className="text-slate-500 mb-6">
                Showing {services.length} service{services.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>

              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {services.map((service) => (
                  <motion.div key={service.id} variants={fadeInUp}>
                    <div className="card-hover p-6 h-full flex flex-col group">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-5">
                        <Briefcase className="w-7 h-7 text-primary-600" />
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>

                      <span className="badge badge-primary self-start mb-4">
                        {service.category}
                      </span>

                      <p className="text-slate-500 text-sm flex-grow line-clamp-3">
                        {service.description}
                      </p>

                      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-slate-500">
                            <DollarSign className="w-5 h-5 text-primary-600" />
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                              AED {service.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-sm">
                            <Clock className="w-4 h-4" />
                            {service.duration_minutes} min
                          </div>
                        </div>

                        <Link
                          to={`/services/${service.id}`}
                          className="btn-primary w-full group"
                        >
                          Book Now
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <Briefcase className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-slate-500 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setSortBy('name');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Our senior-led teams can create tailored accounting and advisory engagements that
              address your unique financial challenges. Let's discuss your needs.
            </p>
            <Link to="/consultants" className="btn-lg btn-gold">
              Talk to an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
