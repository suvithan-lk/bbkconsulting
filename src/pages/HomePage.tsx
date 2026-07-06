import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Award,
  Briefcase,
  Star,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../lib/api';
import type { Service, ConsultantWithUser } from '../types/database.types';

const stats = [
  { icon: Users, value: '500+', label: 'Businesses Served' },
  { icon: Briefcase, value: '1,200+', label: 'Engagements Delivered' },
  { icon: Award, value: '50+', label: 'Certified Accountants' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Tax Consulting',
    description: 'Strategic tax structuring, compliance filings, and multi-jurisdiction tax optimisation.',
  },
  {
    icon: Shield,
    title: 'Financial Reporting (IFRS / GAAP)',
    description: 'Full-cycle financial statement preparation and international standards compliance.',
  },
  {
    icon: Zap,
    title: 'Corporate Services',
    description: 'Company formation, residency visa preparation, M&A due diligence, valuations, and restructuring.',
  },
];

const categories = [
  { name: 'Financial Services & Banking', tag: 'IFRS 9 & Basel', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Real Estate & Construction', tag: 'IFRS 16 Leases', image: 'https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Technology & SaaS', tag: 'Revenue Recognition', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Healthcare & Life Sciences', tag: 'Grant Accounting', image: 'https://images.pexels.com/photos/4427380/pexels-photo-4427380.jpeg?auto=compress&cs=tinysrgb&w=400' },
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

export function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [consultants, setConsultants] = useState<ConsultantWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, consultantsRes] = await Promise.all([
        api.get<{ data: Service[] }>('/services'),
        api.get<{ data: ConsultantWithUser[] }>('/consultants'),
      ]);

      setServices(servicesRes.data.slice(0, 6));
      setConsultants(consultantsRes.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/92 to-navy-900/97" />
        <div className="absolute inset-0 dot-pattern opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm">
                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                Dubai, UAE | UAE Corporate Tax &amp; VAT Compliant | Free Zone &amp; Mainland
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Expert Accounting Consultancy
              <span className="block text-gold-400">
                Services for Businesses Across the UAE
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl"
            >
              BBK Consultancy delivers world-class accounting advisory, UAE Corporate Tax and VAT
              planning, audit support, and free zone &amp; mainland company formation — trusted by
              businesses across the UAE seeking clarity, confidence, and measurable growth.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-sm text-slate-400 mb-8 max-w-2xl italic"
            >
              The activity must align with the trade license categories: Tax Consultancy,
              Accounting &amp; Bookkeeping, and Corporate Services providers.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="btn-lg btn-primary group">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-lg btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20">
                Get a Free Consultation
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium"
                  >
                    {String.fromCharCode(65 + i - 1)}
                  </div>
                ))}
              </div>
              <div className="text-white/80">
                <p className="font-medium">Join 500+ businesses that trust BBK</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                  <span className="ml-1 text-sm">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-soft-lg border border-slate-100 dark:border-slate-800"
            >
              <stat.icon className="w-8 h-8 text-primary-600 mb-3" />
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Where Financial Expertise Meets Strategic Vision
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Our Core Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              In a global landscape where accounting standards evolve rapidly and financial risks
              multiply, BBK Consultancy stands as your steadfast partner — combining the precision
              of the world's best accounting methodologies with locally responsive, client-first service.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="card-hover p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Businesses Choose BBK Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-primary mb-4">Why BBK</span>
              <h2 className="mb-6">Why Businesses Choose BBK Consultancy</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                BBK Consultancy is recognised among the leading accounting consulting firms for its
                combination of technical expertise, strategic insight, and personalised client
                service. Unlike Big Four firms where smaller clients receive limited senior
                attention, BBK ensures that every engagement is led by experienced professionals
                committed to your success.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Our certified accountants and financial advisors hold qualifications from
                internationally recognised bodies including ACCA, CPA, and ICAI. We stay ahead of
                evolving standards — from IFRS 17 insurance contracts to OECD Pillar Two global
                minimum tax requirements — so your business remains compliant and competitive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {['ACCA Certified Professionals', 'CPA Qualified Advisors', 'VAT Registered Advisors', 'OECD Tax Compliant Practitioners'].map(
                (credential) => (
                  <div key={credential} className="card p-5 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    <span className="font-medium text-slate-900 dark:text-white text-sm">{credential}</span>
                  </div>
                )
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Our Services
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              End-to-End Accounting &amp; Financial Advisory
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              From statutory audit to digital CFO services, we offer a complete suite of accounting,
              tax, and financial consulting solutions designed to support your business at every stage.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={fadeInUp}>
                  <Link
                    to={`/services/${service.id}`}
                    className="card-hover p-6 block h-full group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-semibold">
                        AED {service.price.toLocaleString()}
                      </span>
                      <span className="badge badge-primary">
                        {service.category}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
              Industries
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Accounting Expertise Tailored to Your Industry
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              Generic accounting advice costs businesses dearly. We bring deep sector-specific
              knowledge to every engagement.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.name} variants={fadeInUp}>
                <Link
                  to="/industries"
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-slate-300 text-sm">{category.tag}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/industries" className="btn-outline">
              View All Industries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Consultants Section */}
      <section className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Our Team
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Meet Our Expert Consultants
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              Industry veterans with proven track records ready to guide your business to success.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card p-6 text-center animate-pulse">
                  <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          ) : consultants.length > 0 ? (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {consultants.map((consultant) => (
                <motion.div key={consultant.id} variants={fadeInUp}>
                  <Link
                    to={`/consultants/${consultant.id}`}
                    className="card-hover p-6 text-center block group"
                  >
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-medium">
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
                    <h3 className="font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                      {consultant.user.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">{consultant.specialization}</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                      <span className="text-sm font-medium">{consultant.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {consultant.experience_years}+ years experience
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">No consultants available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/consultants" className="btn-outline">
              View All Consultants <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Journey to Financial Excellence Today
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Book a free, no-obligation consultation with a senior accounting professional and
              discover how BBK Consultancy can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-lg btn-gold">
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
