import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Crown,
  Zap,
  Lock,
  Globe2,
  Compass,
  Heart,
  ArrowRight,
} from 'lucide-react';

const differentiators = [
  {
    icon: Crown,
    title: 'Senior-Led Every Time',
    description: 'Every BBK engagement is led by a qualified senior — no junior-heavy teams, no handoffs after kickoff.',
  },
  {
    icon: Zap,
    title: 'Agile Delivery',
    description: 'We operate without the bureaucratic layers of large firms, enabling faster delivery without sacrificing quality.',
  },
  {
    icon: Lock,
    title: 'Ironclad Confidentiality',
    description: 'Your financial data is protected by rigorous confidentiality protocols and non-disclosure safeguards at all times.',
  },
  {
    icon: Globe2,
    title: 'Global Standards, Local Knowledge',
    description: 'IFRS and GAAP compliant expertise delivered with understanding of local regulatory and business context.',
  },
  {
    icon: Compass,
    title: 'Strategic Advisory, Not Just Compliance',
    description: 'We see beyond the numbers — our advice helps you make strategic decisions, not just tick regulatory boxes.',
  },
  {
    icon: Heart,
    title: 'Relationship-Driven',
    description: 'A dedicated client relationship manager ensures continuity, responsiveness, and deep institutional knowledge of your business.',
  },
];

const comparisonRows = [
  { criteria: 'Senior Partner Access', bigFour: 'Limited — junior-heavy teams', midTier: 'Moderate', bbk: 'Direct senior engagement on every project' },
  { criteria: 'SME & Mid-Market Focus', bigFour: 'Primarily large corporates', midTier: 'Good', bbk: 'Core specialisation' },
  { criteria: 'Turnaround Speed', bigFour: 'Slow — large bureaucracy', midTier: 'Moderate', bbk: 'Agile and responsive' },
  { criteria: 'Cost-to-Value', bigFour: 'Premium pricing', midTier: 'Mid-range', bbk: 'Competitive and transparent' },
  { criteria: 'Personalised Solutions', bigFour: 'Template-driven', midTier: 'Semi-customised', bbk: 'Fully bespoke' },
  { criteria: 'IFRS Technical Expertise', bigFour: 'Excellent', midTier: 'Good', bbk: 'Certified specialists' },
  { criteria: 'Forensic & Litigation Support', bigFour: 'Strong', midTier: 'Limited', bbk: 'Dedicated specialist team' },
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

export function WhyBbkPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Why BBK Consultancy
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Smart Alternative to Big Four Accounting Firms
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              World-class expertise. Senior-led engagements. Prices that reflect your scale —
              not their overheads. Discover why businesses increasingly choose BBK Consultancy
              over global accounting giants.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
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
              Benchmarking
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              How BBK Compares to the World's Top Accounting Firms
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-2xl mx-auto">
              While Big Four firms offer breadth at scale, most growing businesses find that
              mid-tier and boutique firms like BBK Consultancy deliver superior value through
              direct senior access, faster turnaround, and genuinely customised solutions.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-left">
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Criteria</th>
                  <th className="px-6 py-4 font-semibold text-slate-500">Big Four</th>
                  <th className="px-6 py-4 font-semibold text-slate-500">Mid-Tier Firms</th>
                  <th className="px-6 py-4 font-semibold text-primary-600">BBK Consultancy</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.criteria} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.criteria}</td>
                    <td className="px-6 py-4 text-slate-500">{row.bigFour}</td>
                    <td className="px-6 py-4 text-slate-500">{row.midTier}</td>
                    <td className="px-6 py-4 text-primary-600 font-medium">{row.bbk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Six Reasons */}
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
              The BBK Difference
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              Six Reasons BBK Consultancy Delivers More
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {differentiators.map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="card-hover p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience the BBK Difference
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              See how senior-led, agile, and transparent advisory can transform your finance function.
            </p>
            <Link to="/contact" className="btn-lg btn-gold">
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
