import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  { title: "📋 Information We Collect", text: "We collect personal information such as your name, email address, phone number, and academic records when you register or submit an application through CampusFlow." },
  { title: "🔐 How We Use Your Data", text: "Your information is used solely for college management purposes including admissions processing, academic record keeping, communication, and platform improvement." },
  { title: "🚫 Data Sharing", text: "We do not sell, trade, or rent your personal information to third parties. Data may be shared with authorized college departments for legitimate educational purposes only." },
  { title: "🍪 Cookies", text: "CampusFlow uses cookies to maintain your session, remember preferences, and improve your experience. You can control cookie settings through your browser." },
  { title: "🔒 Data Security", text: "We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your personal information." },
  { title: "📩 Contact About Privacy", text: "If you have any questions about our privacy practices, please contact us at privacy@campusflow.in." },
];

function Privacy() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="badge bg-white/10 text-white border border-white/10 mb-4">🔒 Legal</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-navy-200 text-lg">Last updated: January 2026. Your privacy is important to us.</p>
          </div>
        </section>

        <section className="page-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {sections.map((section, i) => (
                <div key={i} className="card p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{section.title}</h3>
                  <p className="text-navy-500 leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Privacy;