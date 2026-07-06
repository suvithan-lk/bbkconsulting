import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Building,
  Factory,
  Cpu,
  HeartPulse,
  ShoppingBag,
  HandHeart,
  ArrowRight,
} from 'lucide-react';

const industries = [
  {
    icon: Landmark,
    title: 'Financial Services & Banking',
    description:
      'BBK provides specialised financial services accounting covering IFRS 9 (expected credit losses), Basel regulatory capital requirements, revenue recognition under IFRS 15, and insurance contracts under IFRS 17. We serve banks, investment firms, insurance companies, and fintech start-ups navigating complex regulatory environments.',
  },
  {
    icon: Building,
    title: 'Real Estate & Construction',
    description:
      'Our real estate accounting advisors understand the nuances of property valuation, IFRS 16 lease accounting, project cost management, and developer revenue recognition. We serve property developers, REITs, construction firms, and hospitality groups.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Supply Chain',
    description:
      "Manufacturing businesses face unique accounting challenges around inventory valuation, cost accounting, and transfer pricing. BBK's manufacturing accounting team helps optimise cost structures, comply with customs and excise requirements, and manage multi-entity consolidations efficiently.",
  },
  {
    icon: Cpu,
    title: 'Technology & SaaS',
    description:
      'From revenue recognition for subscription models (IFRS 15 / ASC 606) to R&D tax credit advisory and equity compensation accounting, BBK supports tech companies through every funding stage — from seed round to IPO readiness.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Life Sciences',
    description:
      "Healthcare organisations face stringent financial reporting requirements, grant accounting, and regulatory compliance pressures. BBK's healthcare finance consultants ensure your organisation maintains compliance while optimising financial performance.",
  },
  {
    icon: ShoppingBag,
    title: 'Retail & E-Commerce',
    description:
      'Inventory management, multi-currency transactions, marketplace fee accounting, and VAT compliance across jurisdictions — BBK helps retail and e-commerce businesses scale their finance function to match their growth trajectory.',
  },
  {
    icon: HandHeart,
    title: 'Non-Profit & Public Sector',
    description:
      'We provide fund accounting, grant compliance, and public sector financial management advisory — ensuring non-profit organisations and public bodies meet their fiduciary responsibilities with transparency and accountability.',
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

export function IndustriesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Industries We Serve
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Accounting Expertise Tailored to Your Industry's Unique Needs
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              Generic accounting advice costs businesses dearly. BBK Consultancy brings deep
              sector-specific knowledge to every engagement — understanding the regulations, risks,
              and revenue models unique to your industry.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {industries.map((industry) => (
              <motion.div key={industry.title} variants={fadeInUp} className="card-hover p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-5">
                  <industry.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold mb-3">{industry.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{industry.description}</p>
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
              Don't See Your Industry?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              We work across dozens of sectors. Talk to us about your specific financial and
              regulatory challenges.
            </p>
            <Link to="/contact" className="btn-lg btn-gold">
              Talk to an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
