import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const contactInfo = [
  { icon: "📍", title: "Address", lines: ["Sri Eshwar College of Engineering", "Tamil Nadu, India"] },
  { icon: "📞", title: "Phone", lines: ["+91 XXXXX XXXXX", "+91 XXXXX XXXXX"] },
  { icon: "✉️", title: "Email", lines: ["contact@sece.edu.in", "admissions@sece.edu.in"] },
  { icon: "🕐", title: "Hours", lines: ["Mon - Fri: 9:00 AM - 5:00 PM", "Saturday: 10:00 AM - 2:00 PM"] },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/contact', form);
      if (res.data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          <div className="shape-blob w-[500px] h-[500px] bg-accent-cyan/20 top-0 -left-20 animate-float" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="badge bg-white/10 text-white border border-white/10 mb-4">📬 Get in Touch</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Contact Us</h1>
            <p className="text-navy-200 text-lg max-w-2xl mx-auto">
              Get in touch with our team — we're here to help with any questions or inquiries.
            </p>
          </div>
        </section>

        <section className="page-section">
          <div className="page-container">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Contact Info */}
              <div className="space-y-6 animate-fade-up">
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-2">Get in Touch</h2>
                  <p className="text-navy-500">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="card p-5 space-y-2">
                      <div className="text-2xl">{item.icon}</div>
                      <h3 className="font-bold text-navy-900 text-sm">{item.title}</h3>
                      {item.lines.map((line, i) => (
                        <p key={i} className="text-navy-500 text-sm">{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="card p-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-xl font-bold text-navy-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label">Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Your full name" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="label">Phone *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="input-field" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" required className="input-field" />
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows="5" required className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      '📬 Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;