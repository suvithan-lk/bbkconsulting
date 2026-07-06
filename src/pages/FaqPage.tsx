import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'What is accounting consultancy and how is it different from a regular accountant?',
    answer:
      'An accounting consultancy provides strategic financial advisory services that go beyond bookkeeping or tax filing. While a traditional accountant manages compliance tasks, accounting consultants like BBK help businesses optimise their financial structures, improve reporting, manage complex transactions, and develop long-term financial strategies aligned with growth objectives.',
  },
  {
    question: 'How is BBK Consultancy different from Big Four firms like KPMG, PwC, EY, or Deloitte?',
    answer:
      'BBK Consultancy delivers Big Four-calibre expertise with a fundamentally different service model. Every engagement is senior-led, with direct access to qualified professionals rather than junior teams. Our clients benefit from faster turnaround, more personalised advice, and transparent pricing — without the overhead costs embedded in Big Four fee structures.',
  },
  {
    question: 'Does BBK Consultancy work with small and medium-sized businesses?',
    answer:
      'Absolutely. SMEs and mid-market businesses form the core of our client base. We believe every business deserves access to institutional-grade accounting advice, and we structure our engagements to deliver exceptional value at a scale appropriate for growing organisations.',
  },
  {
    question: 'What accounting standards does BBK Consultancy work with?',
    answer:
      "BBK's team is proficient across all major international and local accounting standards including IFRS (International Financial Reporting Standards), US GAAP, UK GAAP, and local GAAP frameworks. Our specialists are up-to-date on the latest standards including IFRS 15, 16, 17, and OECD Pillar Two global minimum tax requirements.",
  },
  {
    question: 'How does BBK Consultancy charge for its services?',
    answer:
      'We offer flexible fee structures tailored to your needs — including fixed-fee project engagements, retainer arrangements for ongoing advisory, and hourly rates for shorter consultations. We provide full fee transparency upfront, with no hidden charges or scope-creep surprises.',
  },
  {
    question: 'Can BBK help with a tax dispute or investigation?',
    answer:
      'Yes. BBK Consultancy has a dedicated tax advisory and forensic accounting team with experience in managing tax disputes, regulatory investigations, and voluntary disclosures. We represent clients before tax authorities and prepare expert reports for dispute resolution proceedings.',
  },
  {
    question: 'Does BBK offer cloud accounting or digital finance transformation services?',
    answer:
      'Yes. We provide end-to-end digital finance transformation services including cloud accounting platform implementation (Xero, QuickBooks, SAP, Oracle), ERP configuration, finance process automation, and Virtual CFO services for businesses that want financial leadership without a full-time hire.',
  },
  {
    question: 'How quickly can BBK start an engagement?',
    answer:
      'For urgent requirements, BBK can mobilise a team within 48 to 72 hours of engagement confirmation. Standard engagements are typically scoped and initiated within one week of the initial consultation. We understand that financial deadlines are non-negotiable and structure our availability accordingly.',
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

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              FAQ
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              Transparent, straightforward answers to common questions about accounting
              consultancy, our services, fees, and how we work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                variants={fadeInUp}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
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
              Still Have Questions?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Our team is happy to walk you through anything not covered here.
            </p>
            <Link to="/contact" className="btn-lg btn-gold">
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
