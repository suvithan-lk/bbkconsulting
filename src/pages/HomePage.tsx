import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Award,
  Briefcase,
  Clock,
  Star,
  ChevronRight,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Service, ConsultantWithUser } from '../types/database.types';

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Briefcase, value: '1,200+', label: 'Projects Completed' },
  { icon: Award, value: '50+', label: 'Expert Consultants' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Strategic Planning',
    description: 'Data-driven strategies to accelerate your business growth and market expansion.',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Comprehensive risk assessment and mitigation strategies for sustainable success.',
  },
  {
    icon: Zap,
    title: 'Digital Transformation',
    description: 'Modernize your operations with cutting-edge technology solutions.',
  },
];

const categories = [
  { name: 'Business Strategy', count: 24, image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Financial Advisory', count: 18, image: 'https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'IT Consulting', count: 32, image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Legal Consultation', count: 12, image: 'https://images.pexels.com/photos/4427380/pexels-photo-4427380.jpeg?auto=compress&cs=tinysrgb&w=400' },
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
        supabase
          .from('services')
          .select('*')
          .eq('active', true)
          .limit(6),
        supabase
          .from('consultants')
          .select('*, user:users(*)')
          .eq('verified', true)
          .limit(4),
      ]);

      if (servicesRes.data) setServices(servicesRes.data);
      if (consultantsRes.data) setConsultants(consultantsRes.data as ConsultantWithUser[]);
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-navy-900/95" />
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

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
                Trusted by 500+ businesses worldwide
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Transform Your Business With
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-gold-400">
                Expert Consultancy
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl"
            >
              Connect with industry-leading consultants who understand your challenges and deliver
              actionable strategies for sustainable growth and innovation.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="btn-lg btn-primary group">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/consultants" className="btn-lg btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20">
                Meet Our Consultants
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
                <p className="font-medium">Join 1,200+ happy clients</p>
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
              Why Choose Us
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Expert Guidance for Your Growth
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              Our team of seasoned professionals brings decades of combined experience across
              multiple industries to help you achieve your business objectives.
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
              Comprehensive Business Solutions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              From strategy development to implementation, we offer end-to-end consulting services
              tailored to your unique needs.
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
                        ${service.price.toLocaleString()}
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
              Specialized Expertise
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              We bring deep industry knowledge across multiple sectors to deliver tailored solutions.
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
                  to={`/services?category=${category.name.toLowerCase().replace(' ', '-')}`}
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
                    <p className="text-slate-300 text-sm">{category.count} consultants</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Book a free consultation with our experts and discover how we can help you achieve
              your goals. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-lg btn-gold">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-lg btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
