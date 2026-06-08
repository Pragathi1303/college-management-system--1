import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: "🎓",
    title: "Student Portal",
    description: "Secure login, registration, password recovery, and profile management for every student.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
  },
  {
    icon: "📊",
    title: "Admin Dashboard",
    description: "Manage students, faculty, departments, applications, and generate reports from one panel.",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
  },
  {
    icon: "📝",
    title: "Online Applications",
    description: "Digital admission forms with course selection, document uploads, and real-time status tracking.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
  },
  {
    icon: "📈",
    title: "Academic Results",
    description: "Publish semester results, grade cards, and maintain a full academic history per student.",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50",
  },
  {
    icon: "🗓️",
    title: "Timetable & Events",
    description: "Schedule classes, exams, and campus events with an interactive calendar system.",
    color: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50",
  },
  {
    icon: "🛡️",
    title: "Policies & Compliance",
    description: "Built-in FAQ, Terms of Use, and Privacy Policy pages to keep your institution compliant.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
  },
];

const stats = [
  { value: "5,200+", label: "Students Enrolled", color: "text-primary-600" },
  { value: "320+", label: "Faculty Members", color: "text-accent-cyan" },
  { value: "48", label: "Departments", color: "text-accent-pink" },
  { value: "98%", label: "Placement Rate", color: "text-accent-green" },
];

function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="shape-blob w-[600px] h-[600px] bg-primary-500 -top-32 -right-32 animate-float" />
            <div className="shape-blob w-[400px] h-[400px] bg-accent-cyan/30 top-1/2 -left-32 animate-float" style={{ animationDelay: "-3s" }} />
            <div className="shape-blob w-[300px] h-[300px] bg-gold-500/20 bottom-0 right-1/3 animate-float" style={{ animationDelay: "-1.5s" }} />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    Admissions Open for 2026
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                  Welcome to{" "}
                  <span className="gradient-gold">SECE Campus</span>
                </h1>

                <p className="text-lg md:text-xl text-navy-200 leading-relaxed max-w-xl">
                  Sri Eshwar College of Engineering — a fully integrated college management
                  platform for admissions, academics, results, and student life.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/application" className="btn-gold btn-lg text-base">
                    🎓 Apply Now
                  </Link>
                  <Link to="/login" className="btn-white btn-lg text-base">
                    🔑 Student Login
                  </Link>
                  <Link to="/about" className="btn-ghost btn-lg text-base text-white/80 hover:text-white">
                    Learn More →
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-2 border-navy-800 flex items-center justify-center text-navy-900 text-xs font-bold"
                      >
                        {["A", "B", "C", "D"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <span className="text-navy-400 text-sm">
                    Trusted by <strong className="text-white">5,200+</strong> students
                  </span>
                </div>
              </div>

              {/* Right - Feature Cards */}
              <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="card p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-2xl">📥</div>
                  <h3 className="text-white font-bold text-lg">Admissions Open</h3>
                  <p className="text-navy-300 text-sm">Track leads, review applicants, and manage new batches seamlessly.</p>
                </div>
                <div className="card p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 space-y-3 mt-8">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-2xl">📚</div>
                  <h3 className="text-white font-bold text-lg">Courses & Subjects</h3>
                  <p className="text-navy-300 text-sm">Organize semesters, subjects, and assign faculty with ease.</p>
                </div>
                <div className="card p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 space-y-3 -mt-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-2xl">📈</div>
                  <h3 className="text-white font-bold text-lg">Results & Analytics</h3>
                  <p className="text-navy-300 text-sm">Publish marks, generate reports, and track academic progress.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative -mt-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="card p-6 md:p-8 text-center animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`text-2xl md:text-3xl font-extrabold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-navy-500 text-sm mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="page-section">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="badge-primary mb-4">🚀 Platform Features</div>
              <h2 className="section-title">Everything your college needs, in one place</h2>
              <p className="section-subtitle mx-auto">
                A comprehensive suite of tools designed to streamline campus management and enhance the educational experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="card-hover p-6 md:p-8 animate-fade-up group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} ${feature.bg} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">{feature.title}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="page-section bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <div className="badge bg-white/10 text-white border border-white/10 mb-4">🎯 Ready to Join?</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to join SECE?
              </h2>
              <p className="text-navy-200 text-lg mb-8">
                Applications are open for the 2026 academic year. Join thousands of students who have chosen excellence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/application" className="btn-gold btn-lg text-base">
                  🚀 Start Application
                </Link>
                <Link to="/about" className="btn-white btn-lg text-base">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;