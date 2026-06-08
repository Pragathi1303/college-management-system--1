import React, { useState } from 'react';
import '../Css/campusflow.css';

const CampusFlowHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="campusflow">
      {/* Sticky Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-text">CampusFlow</span>
          </div>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#apply">Apply</a></li>
            <li><a href="#login">Login</a></li>
            <li><a href="#signup">Signup</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#admin">Admin</a></li>
          </ul>

          <button className="cta-button">Apply Now →</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-left">
            <div className="admissions-badge">
              <span className="pulse-dot"></span>
              Admissions Open 2026
            </div>
            
            <h1 className="hero-heading">Welcome to SECE Campus</h1>
            
            <p className="hero-subtitle">
              Discover a world-class learning platform designed to elevate your college experience. 
              CampusFlow connects students, faculty, and administration in a seamless ecosystem.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary">Apply Now</button>
              <button className="btn btn-secondary">Student Login</button>
              <a href="#" className="admin-link">Admin Panel →</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">5,200+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">320+</div>
                <div className="stat-label">Faculty</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">48</div>
                <div className="stat-label">Departments</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="section-header">
            <h2>Comprehensive Campus Solutions</h2>
            <p>Everything you need for a seamless college experience</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Student Portal</h3>
              <p>Access your grades, attendance, and academic records in real-time from anywhere.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎛️</div>
              <h3>Admin Dashboard</h3>
              <p>Comprehensive management tools for faculty and administrators to oversee operations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Online Applications</h3>
              <p>Streamlined admission and application process with instant confirmation and tracking.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Academic Results</h3>
              <p>Instant access to exam results, transcripts, and performance analytics.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Timetable & Events</h3>
              <p>Never miss important dates. View schedules, events, and campus activities.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Policies & Compliance</h3>
              <p>Easy access to college policies, guidelines, and important compliance documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section className="portal-section">
        <div className="portal-container">
          <div className="portal-card">
            <h2>Student Gateway</h2>
            <p className="portal-subtitle">Unlock your academic journey</p>
            
            <div className="portal-links">
              <a href="#" className="pill-button">Student Login</a>
              <a href="#" className="pill-button">Register</a>
              <a href="#" className="pill-button">Apply Now</a>
              <a href="#" className="pill-button">Reset Password</a>
            </div>
          </div>

          <div className="portal-card">
            <h2>Admin Control Center</h2>
            <p className="portal-subtitle">Manage and oversee operations</p>
            
            <div className="portal-links">
              <a href="#" className="pill-button">Admin Panel</a>
              <a href="#" className="pill-button">About SECE</a>
              <a href="#" className="pill-button">Contact Us</a>
              <a href="#" className="pill-button">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to join SECE?</h2>
          <p>Begin your journey towards academic excellence and success</p>
          
          <div className="cta-buttons">
            <button className="btn btn-dark">Start Application</button>
            <button className="btn btn-outline">Learn More →</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>CampusFlow</h4>
            <p>A modern platform designed to streamline college management and enhance the student experience at Sri Eshwar College of Engineering.</p>
          </div>

          <div className="footer-column">
            <h4>Students</h4>
            <ul>
              <li><a href="#">Student Portal</a></li>
              <li><a href="#">Apply Now</a></li>
              <li><a href="#">Course Finder</a></li>
              <li><a href="#">Campus Tour</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>College</h4>
            <ul>
              <li><a href="#">About SECE</a></li>
              <li><a href="#">Faculty</a></li>
              <li><a href="#">Departments</a></li>
              <li><a href="#">News & Events</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Sri Eshwar College of Engineering. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CampusFlowHome;
