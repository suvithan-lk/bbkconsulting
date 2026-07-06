import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';

const caseStudies = [
  {
    title: 'Manufacturing Group — IFRS 16 Lease Transition',
    challenge:
      'A regional manufacturing group with over 200 lease contracts faced a complex IFRS 16 transition deadline with no internal IFRS expertise and a tight reporting calendar.',
    solution:
      'Deployed a dedicated IFRS 16 implementation team that catalogued all leases, built the right-of-use asset calculations, and trained the finance team — completing the transition within 10 weeks.',
    outcome:
      'On-time IFRS 16 adoption, zero restatement risk, and a 35% reduction in manual lease administration through automation.',
  },
  {
    title: 'Pharma Start-Up — IPO Financial Readiness',
    challenge:
      'A fast-growing pharmaceutical company needed to overhaul financial controls, restate three years of accounts under IFRS, and prepare investor-grade financial documentation for an upcoming IPO.',
    solution:
      'Full financial due diligence, IFRS restatement, internal control gap analysis, and investor presentation preparation completed within an accelerated timeline.',
    outcome:
      'Successful IPO completed. Investor confidence secured through a clean audit opinion and a robust financial narrative.',
  },
  {
    title: 'Property Developer — Tax Restructuring',
    challenge:
      'A property development group operating across four jurisdictions was paying an effective tax rate significantly above the sector average due to an inefficient corporate structure.',
    solution:
      'Comprehensive tax review, cross-border restructuring plan, and transfer pricing policy development — implemented across all operating entities.',
    outcome:
      'Annual tax savings of 28%, with full compliance maintained across all jurisdictions.',
  },
  {
    title: 'E-Commerce Retailer — Cloud Accounting Migration',
    challenge:
      'Rapid growth had rendered legacy accounting systems unmanageable, leading to month-end delays of three or more weeks and unreliable management accounts.',
    solution:
      'Full ERP migration to a cloud accounting platform with custom integrations for marketplace and payment data streams.',
    outcome:
      'Month-end close reduced from 22 days to 4 days. Real-time financial visibility restored. Finance headcount requirement reduced by 2 full-time equivalents.',
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

export function CaseStudiesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Case Studies
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Businesses. Real Results. Real Financial Transformation.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              Our work is measured not in reports delivered, but in outcomes achieved. Explore how
              BBK Consultancy has helped businesses navigate complexity, manage risk, and achieve
              sustained financial growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-6"
          >
            {caseStudies.map((study, index) => (
              <motion.div key={study.title} variants={fadeInUp} className="card-hover p-8">
                <span className="badge-primary mb-4">Case Study {index + 1}</span>
                <h2 className="text-xl font-semibold mb-5">{study.title}</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Challenge</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">BBK Solution</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{study.solution}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-semibold text-primary-600 mb-1">Outcome</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">{study.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 card p-8 md:p-12 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 text-center max-w-3xl mx-auto"
          >
            <Quote className="w-10 h-10 text-primary-400 mx-auto mb-6" />
            <p className="text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
              "BBK Consultancy did not just solve our accounting problem — they transformed how we
              think about financial management. Their team brought the rigour of a Big Four firm
              with the care and responsiveness of a trusted partner. We would not have achieved our
              growth milestones without them."
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">CFO, Regional Manufacturing Group</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss the financial challenges holding your business back.
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
