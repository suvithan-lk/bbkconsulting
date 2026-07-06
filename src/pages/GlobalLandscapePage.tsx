import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';

const globalFirms = [
  { firm: 'KPMG', rank: '#1', specialisation: 'Audit, Tax, Advisory', clientSize: 'Large Corporates / Multinational' },
  { firm: 'PwC', rank: '#2', specialisation: 'Assurance, Tax, Consulting', clientSize: 'Large Corporates / Multinational' },
  { firm: 'EY (Ernst & Young)', rank: '#3', specialisation: 'Assurance, Tax, Strategy', clientSize: 'Large Corporates / Multinational' },
  { firm: 'Deloitte', rank: '#4', specialisation: 'Audit, Consulting, Risk', clientSize: 'Large Corporates / Multinational' },
  { firm: 'Grant Thornton', rank: '#5', specialisation: 'Accounting & Consulting', clientSize: 'Mid-Market' },
  { firm: 'Baker Tilly', rank: '#6', specialisation: 'Assurance, Tax, Advisory', clientSize: 'Mid-Market' },
  { firm: 'PKF International', rank: '#7', specialisation: 'Audit, Tax, Advisory', clientSize: 'SME to Mid-Market' },
  { firm: 'Protiviti', rank: '#8', specialisation: 'Risk, Internal Audit, Consulting', clientSize: 'Mid to Large' },
  { firm: 'Accenture', rank: '#9', specialisation: 'Finance Transformation, ERP', clientSize: 'Large Enterprise' },
  { firm: 'FTI Consulting', rank: '#12', specialisation: 'Forensic, Economic Advisory', clientSize: 'Litigation & Dispute-Driven' },
  { firm: 'BBK Consultancy', rank: 'Regional Leader', specialisation: 'Full-Service Accounting Advisory', clientSize: 'SME, Mid-Market, Growing Enterprises', highlight: true },
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

export function GlobalLandscapePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Global Accounting Landscape
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Understanding the Global Accounting Consultancy Landscape
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              The world's top accounting firms set the benchmark for excellence. BBK Consultancy
              aligns with global best practices while delivering the personalised service that
              international giants cannot match.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="badge-primary mb-4">
              Where BBK Stands
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              The World's Leading Accounting Consultancy Firms — And What Sets BBK Apart
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed">
              According to global industry rankings, the world's top accounting consulting firms
              include KPMG, PwC, EY, and Deloitte (the Big Four), followed by mid-tier leaders such
              as Grant Thornton, Baker Tilly, PKF, Protiviti, and Accenture. BBK Consultancy
              benchmarks its service quality, methodologies, and professional standards against
              these global leaders — while delivering the agility, accessibility, and
              personalisation that growing businesses require.
            </motion.p>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-left">
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Firm</th>
                  <th className="px-6 py-4 font-semibold text-slate-500">Global Rank</th>
                  <th className="px-6 py-4 font-semibold text-slate-500">Specialisation</th>
                  <th className="px-6 py-4 font-semibold text-slate-500">Typical Client Size</th>
                </tr>
              </thead>
              <tbody>
                {globalFirms.map((row) => (
                  <tr
                    key={row.firm}
                    className={`border-t border-slate-100 dark:border-slate-800 ${
                      row.highlight ? 'bg-primary-50/60 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    <td className={`px-6 py-4 font-medium flex items-center gap-2 ${row.highlight ? 'text-primary-600' : 'text-slate-900 dark:text-white'}`}>
                      {row.highlight && <Globe className="w-4 h-4" />}
                      {row.firm}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{row.rank}</td>
                    <td className="px-6 py-4 text-slate-500">{row.specialisation}</td>
                    <td className="px-6 py-4 text-slate-500">{row.clientSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-12 space-y-4"
          >
            <p className="text-slate-500 leading-relaxed">
              While global firms such as KPMG and Deloitte dominate the large-enterprise segment,
              BBK Consultancy occupies the high-value mid-market space — bringing institutional-grade
              expertise to businesses that deserve premium advisory without enterprise-scale pricing
              or impersonal service delivery.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Firms like Protiviti specialise in risk and internal audit, while FTI Consulting leads
              in forensic and litigation support. BBK uniquely integrates these disciplines under one
              roof — giving mid-market clients access to the full spectrum of accounting advisory
              without the need to engage multiple specialist firms.
            </p>
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
              Institutional-Grade Expertise, Without the Overhead
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              See how BBK Consultancy benchmarks against the firms you already know.
            </p>
            <Link to="/why-bbk" className="btn-lg btn-gold">
              Why Choose BBK
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
