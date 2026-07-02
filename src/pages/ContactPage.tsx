import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri from 9am to 6pm',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@apexconsult.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: '123 Business Avenue, Suite 500',
    description: 'New York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Monday - Friday',
    description: '9:00 AM - 6:00 PM EST',
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
              Let's Start a Conversation
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300">
              Have a question or ready to transform your business? We're here to help.
              Reach out and our team will get back to you within 24 hours.
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
                        placeholder="+1 (555) 000-0000"
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
                        <option value="consulting">Consulting Services</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="support">Support Request</option>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.69766374873451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
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
    </div>
  );
}
