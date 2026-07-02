import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Globe,
  BookOpen,
  Briefcase,
  TrendingUp,
  Shield,
} from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for exceptional quality in every engagement and deliverable.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'Honest, transparent relationships built on trust and ethical practices.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working alongside clients as true partners in their success journey.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Embracing new ideas and technologies to drive meaningful change.',
  },
];

const milestones = [
  { year: '2010', title: 'Founded', description: 'ApexConsult was established with a vision to transform consulting.' },
  { year: '2014', title: 'Global Expansion', description: 'Opened offices in London, Singapore, and Tokyo.' },
  { year: '2018', title: 'Digital Innovation', description: 'Launched our digital transformation practice.' },
  { year: '2021', title: '500+ Clients', description: 'Milestone reached serving over 500 businesses worldwide.' },
  { year: '2024', title: 'AI Integration', description: 'Integrated AI-powered analytics into our consulting framework.' },
];

const leadership = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Founder',
    bio: 'Former McKinsey partner with 20+ years in strategic consulting.',
    image: 'https://images.pexels.com/photos/7749090/pexels-photo-7749090.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Michael Chen',
    role: 'Chief Strategy Officer',
    bio: 'Expert in digital transformation and organizational change.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Financial Advisory',
    bio: 'Former Goldman Sachs VP specializing in corporate finance.',
    image: 'https://images.pexels.com/photos/3766182/pexels-photo-3766182.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'James Okoro',
    role: 'Head of Technology Consulting',
    bio: 'Pioneer in enterprise architecture and cloud solutions.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const stats = [
  { icon: Users, value: '50+', label: 'Expert Consultants' },
  { icon: Globe, value: '15+', label: 'Countries Served' },
  { icon: Briefcase, value: '1,200+', label: 'Projects Delivered' },
  { icon: Award, value: '98%', label: 'Client Satisfaction' },
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

export function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-32">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              About Us
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Empowering Businesses to Reach Their Full Potential
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              For over a decade, ApexConsult has been the trusted partner for businesses seeking
              strategic guidance, operational excellence, and transformational growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-soft-lg border border-slate-100 dark:border-slate-800 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-slate-500 leading-relaxed">
                  To empower organizations with actionable insights and strategic guidance that
                  drive sustainable growth, operational efficiency, and competitive advantage.
                  We believe every business has untapped potential waiting to be unlocked through
                  expert consultation and collaborative partnership.
                </p>
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-slate-500 leading-relaxed">
                  To be the world's most trusted consultancy partner, recognized for transforming
                  businesses across industries and creating lasting positive impact. We envision a
                  future where every organization, regardless of size, has access to world-class
                  strategic expertise.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-soft-lg">
                <div className="text-center text-white">
                  <p className="text-3xl font-bold">14+</p>
                  <p className="text-sm opacity-90">Years</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Our Values
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              What Drives Us Forward
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              Our core values form the foundation of everything we do and how we serve our clients.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="card-hover p-8 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-slate-500 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Milestones That Define Us
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-900/30" />

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 ml-4">
                  <span className="text-primary-600 font-semibold">{milestone.year}</span>
                  <h3 className="text-lg font-semibold mt-1">{milestone.title}</h3>
                  <p className="text-slate-500 text-sm mt-2">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Leadership
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Meet Our Leadership Team
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              Experienced professionals dedicated to delivering exceptional results for our clients.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {leadership.map((leader) => (
              <motion.div
                key={leader.name}
                variants={fadeInUp}
                className="card-hover overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{leader.name}</h3>
                  <p className="text-primary-600 text-sm mb-3">{leader.role}</p>
                  <p className="text-slate-500 text-sm">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <BookOpen className="w-12 h-12 text-primary-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join hundreds of businesses that have transformed their operations with our expert guidance.
            </p>
            <a href="/contact" className="btn-lg btn-gold">
              Schedule a Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
