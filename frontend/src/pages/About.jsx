import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const highlights = [
  { icon: "🏛️", title: "Our Institution", desc: "Established with a vision to create world-class engineers, SECE offers UG, PG, and research programs across 15+ departments." },
  { icon: "🎯", title: "Our Mission", desc: "To provide quality technical education with strong ethical values, preparing students for global careers and leadership roles." },
  { icon: "🌟", title: "Our Vision", desc: "To be a globally recognized center of excellence in engineering education, research, and innovation." },
  { icon: "🏆", title: "Accreditation", desc: "Accredited by NAAC with A+ grade. NBA accredited programs. Ranked among top engineering colleges in Tamil Nadu." },
];

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "15+", label: "Departments" },
  { value: "500+", label: "Industry Partners" },
  { value: "50+", label: "Research Centers" },
];

function About() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          <div className="shape-blob w-[500px] h-[500px] bg-primary-500/20 -top-20 -left-20 animate-float" />
          <div className="shape-blob w-[300px] h-[300px] bg-accent-cyan/20 bottom-0 right-0 animate-float" style={{ animationDelay: "-2s" }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="badge bg-white/10 text-white border border-white/10 mb-4">🏛️ About Us</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              About <span className="gradient-gold">SECE</span>
            </h1>
            <p className="text-navy-200 text-lg max-w-2xl mx-auto">
              Sri Eshwar College of Engineering is a premier institution committed to excellence 
              in engineering education, innovation, and holistic student development.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="relative -mt-12 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="card p-6 text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-2xl md:text-3xl font-extrabold text-primary-600">{stat.value}</div>
                  <div className="text-navy-500 text-sm mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="page-section">
          <div className="page-container">
            <div className="grid md:grid-cols-2 gap-6">
              {highlights.map((item, i) => (
                <div key={item.title} className="card-hover p-8 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-2xl mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                  <p className="text-navy-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="page-section bg-gradient-to-br from-navy-900 to-navy-800">
          <div className="page-container text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Start Your Journey at SECE</h2>
            <p className="text-navy-200 mb-8 max-w-xl mx-auto">Join thousands of successful engineers who started their journey here.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/application" className="btn-gold btn-lg">🎓 Apply Now</Link>
              <Link to="/contact" className="btn-white btn-lg">📬 Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;