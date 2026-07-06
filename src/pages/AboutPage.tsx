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
  CheckCircle2,
} from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Integrity',
    description: 'Integrity in every engagement — honest, transparent relationships built on trust.',
  },
  {
    icon: Heart,
    title: 'Excellence',
    description: 'Excellence in every deliverable, with technical rigour behind every engagement.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working alongside clients as true partners in their financial success journey.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Innovation in every solution we design, staying ahead of evolving standards.',
  },
];

const credentials = [
  'ACCA Certified Professionals',
  'CPA Qualified Advisors',
  'VAT Registered Advisors',
  'OECD Tax Compliant Practitioners',
];

const stats = [
  { icon: Users, value: '50+', label: 'Qualified Accounting Professionals' },
  { icon: Globe, value: '15+', label: 'Countries Served' },
  { icon: Briefcase, value: '1,200+', label: 'Engagements Delivered' },
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
              About BBK Consultancy
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built on Trust, Precision and Two Decades of Financial Excellence
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              BBK Consultancy was founded on a simple but powerful belief: that every business in
              the UAE — regardless of size — deserves access to the calibre of accounting
              expertise traditionally reserved for large corporations. Based in Dubai, we serve
              clients across UAE free zones and the mainland.
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
                  At BBK Consultancy, our mission is to deliver precise, transparent, and impactful
                  accounting solutions that empower businesses to make confident financial decisions.
                  We believe that robust financial management is not a luxury — it is the bedrock of
                  sustainable growth.
                </p>
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Qualified, Certified &amp; Internationally Recognised</h2>
                <p className="text-slate-500 leading-relaxed">
                  Our team of over 50 qualified accounting professionals brings together decades of
                  experience from Big Four firms, public sector organisations, and multinational
                  corporations — ensuring BBK clients benefit from institutional-grade expertise
                  delivered with boutique-level attention.
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
              These values have shaped our reputation as one of the most reliable accounting
              advisory practices in the region.
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

      {/* Credentials */}
      <section id="team" className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Credentials
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Qualified, Certified, and Internationally Recognised
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              Our certified accountants and financial advisors hold qualifications from
              internationally recognised bodies including ACCA, CPA, and ICAI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {credentials.map((credential) => (
              <motion.div
                key={credential}
                variants={fadeInUp}
                className="card-hover p-6 flex items-center gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0" />
                <span className="font-medium text-slate-900 dark:text-white text-sm">{credential}</span>
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
              Join over 500 businesses that trust BBK Consultancy for their accounting advisory,
              audit, tax, and financial management needs.
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
