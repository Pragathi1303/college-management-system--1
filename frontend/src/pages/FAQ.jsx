import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  { q: "How do I apply for admission?", a: "Visit the Application page, fill in your details, select your preferred course, and submit. Our team will contact you within 48 hours." },
  { q: "Can I track my application status?", a: "Yes, after submitting your application, you'll receive a confirmation email with a tracking link to monitor your application status." },
  { q: "What documents are required for admission?", a: "You'll need your 10th and 12th mark sheets, transfer certificate, passport-size photos, and valid ID proof." },
  { q: "How do I reset my password?", a: "Click on 'Forgot Password' on the login page, enter your registered email, and we'll send you a password reset link." },
  { q: "Is there an entrance exam?", a: "Admission is based on merit and management quota. Some programs may require an entrance test as per university guidelines." },
  { q: "What courses are available?", a: "We offer B.E. in CSE, ECE, Mechanical, Civil, EEE, along with M.E. programs and MBA." },
  { q: "How do I contact the admissions office?", a: "You can reach us via the Contact page, email at admissions@sece.edu.in, or call +91 XXXXX XXXXX during office hours." },
  { q: "What is the fee structure?", a: "Fee details vary by program. Please contact the admissions office or visit the college for the latest fee structure." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          <div className="shape-blob w-[400px] h-[400px] bg-primary-500/20 top-0 right-0 animate-float" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="badge bg-white/10 text-white border border-white/10 mb-4">❓ Help Center</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-navy-200 text-lg max-w-2xl mx-auto">
              Quick answers to common questions about admissions, academics, and campus life.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="page-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="card overflow-hidden animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-navy-50/50 transition-colors"
                  >
                    <span className="font-semibold text-navy-900 text-sm pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-navy-400 transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 text-navy-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12 animate-fade-up">
              <p className="text-navy-500 mb-4">Still have questions?</p>
              <Link to="/contact" className="btn-primary">
                📬 Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FAQ;