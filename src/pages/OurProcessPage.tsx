import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Search,
  FileEdit,
  Play,
  GraduationCap,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Discovery Consultation (Free)',
    description:
      'We begin with a no-obligation consultation to understand your business, your financial challenges, and your goals. This session helps us determine the scope of engagement and which specialists to assign to your account.',
  },
  {
    icon: Search,
    title: 'Diagnostic Assessment',
    description:
      'Our team conducts a structured assessment of your current financial processes, reporting quality, compliance status, and risk exposure — producing a clear diagnostic report with prioritised recommendations.',
  },
  {
    icon: FileEdit,
    title: 'Bespoke Engagement Plan',
    description:
      'We design a tailored engagement plan with defined deliverables, timelines, team allocation, and transparent fee structures. No surprises, no scope creep.',
  },
  {
    icon: Play,
    title: 'Delivery & Execution',
    description:
      'Our senior-led teams execute with precision, maintaining weekly client communication, milestone reporting, and proactive issue escalation throughout the engagement.',
  },
  {
    icon: GraduationCap,
    title: 'Knowledge Transfer & Training',
    description:
      'We do not just deliver outputs — we build internal capability. Knowledge transfer sessions ensure your finance team can maintain and build on the improvements we implement.',
  },
  {
    icon: RefreshCw,
    title: 'Ongoing Support & Review',
    description:
      'Our relationships do not end at delivery. BBK clients benefit from ongoing advisory access, periodic reviews, and proactive updates as regulations and business needs evolve.',
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

export function OurProcessPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Our Process
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              A Structured Engagement Process Built Around Your Success
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              From the first conversation to final deliverable — and ongoing support — BBK
              Consultancy's engagement model is designed to deliver maximum value with minimum
              disruption to your business.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
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
              How We Work
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-4">
              How BBK Consultancy Delivers Value — 6-Step Process
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-900/30" />

                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 ml-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="text-primary-600 font-semibold text-sm">Step {index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{step.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Begin?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Start with a free, no-obligation discovery consultation.
            </p>
            <Link to="/contact" className="btn-lg btn-gold">
              Book Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
