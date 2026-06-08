import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  { title: "📜 Acceptance of Terms", text: "By accessing or using CampusFlow, you agree to be bound by these terms. If you do not agree, please do not use the platform." },
  { title: "🔑 Account Registration", text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account." },
  { title: "🎓 Use of Service", text: "CampusFlow is intended for educational institution management. You agree to use it only for lawful purposes and in accordance with college policies." },
  { title: "📄 Intellectual Property", text: "All content, features, and functionality of CampusFlow are owned by Sri Eshwar College of Engineering and are protected by intellectual property laws." },
  { title: "⚖️ Limitation of Liability", text: "CampusFlow is provided 'as is' without warranties. We are not liable for any damages arising from your use of the platform." },
  { title: "🔄 Changes to Terms", text: "We reserve the right to update these terms at any time. Users will be notified of material changes via email or platform notice." },
];

function Terms() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="badge bg-white/10 text-white border border-white/10 mb-4">📜 Legal</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-navy-200 text-lg">Last updated: January 2026. Please read these terms carefully.</p>
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

export default Terms;