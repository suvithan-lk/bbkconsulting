import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Video,
  MessageCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Users,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+971 4 123 4567',
    description: 'Available Mon-Fri, 8:00am to 6:00pm (UAE time)',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@bbkca.ae',
    description: 'Receive a response within 4 business hours',
  },
  {
    icon: MapPin,
    title: 'Visit Our Office',
    value: 'Office 1204, Business Bay',
    description: 'Dubai, UAE — private meeting rooms available',
  },
  {
    icon: Video,
    title: 'Book a Free Consultation',
    value: '30-Minute Session',
    description: 'Video or in-person — no commitment required',
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

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess(true);
    setLoading(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 pt-24 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="container-custom relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span variants={fadeInUp} className="badge bg-white/10 text-white border-white/20 mb-6">
              Contact Us
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Journey to Financial Excellence Today
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              Whether you need an urgent audit, tax advisory, or a long-term financial
              transformation partner — BBK Consultancy is ready. Contact us for a free,
              no-obligation consultation with a senior accounting professional.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-8 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {contactInfo.map((info) => (
            <motion.div
              key={info.title}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 lg:p-6 shadow-soft border border-slate-100 dark:border-slate-800"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-3">
                <info.icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{info.title}</h3>
              <p className="text-sm font-medium text-primary-600">{info.value}</p>
              <p className="text-xs text-slate-500 mt-1">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="section pt-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-slate-500 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm text-emerald-700 dark:text-emerald-400">
                      Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="input-group">
                      <label className="label">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="input"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="input-group">
                      <label className="label">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="input"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="input-group">
                      <label className="label">Phone (optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 4 000 0000"
                        className="input"
                        disabled={loading}
                      />
                    </div>
                    <div className="input-group">
                      <label className="label">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input"
                        required
                        disabled={loading}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="tax">Tax Advisory & Compliance</option>
                        <option value="audit">Audit & Assurance</option>
                        <option value="corporate">Corporate Finance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="label">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      className="input resize-none"
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="card overflow-hidden h-80 lg:h-96">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.4!2d54.9!3d25.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1699999999999!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* FAQ CTA */}
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Need quick answers?</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      Check out our frequently asked questions for immediate help with common queries.
                    </p>
                    <a href="/faq" className="text-primary-600 hover:underline text-sm font-medium">
                      View FAQ &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Contact BBK */}
      <section className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="badge-primary mb-4">Why Contact BBK Consultancy?</span>
            <p className="text-slate-500 leading-relaxed">
              Every enquiry is handled by a qualified professional — not a sales representative.
              Your first consultation is free, confidential, and focused entirely on understanding
              your financial challenges and how we can help you overcome them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge-primary mb-4">Local &amp; Global</span>
              <h2 className="mb-6">BBK Consultancy — Your Trusted Local Accounting Partner</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                BBK Consultancy serves businesses locally and internationally, combining the
                expertise of a global accounting firm with the accessibility and understanding of a
                local partner. Our offices are conveniently located and equipped to host client
                meetings, workshops, and executive briefings.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We serve clients across industries including financial services, real estate,
                manufacturing, technology, retail, healthcare, and the public sector. Whether you
                are headquartered locally or managing operations across multiple countries, BBK
                provides the financial expertise your business needs to grow with confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 md:p-10 bg-gradient-to-br from-primary-900 via-primary-800 to-navy-900 text-center"
            >
              <Users className="w-10 h-10 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Ready to Transform Your Financial Operations?
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Join over 500 businesses that trust BBK Consultancy for their accounting advisory,
                audit, tax, and financial management needs.
              </p>
              <Link to="/case-studies" className="btn-lg btn-gold">
                See Client Results
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
