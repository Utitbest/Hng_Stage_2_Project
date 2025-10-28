import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/landing.css"; 

export default function LandingPage() {
  return (
    <>  
      <Navbar />

      <main className="landing-page container" data-testid="test-landing-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Ticket Manager Pro</h1>
            <p className="subtitle">
              Manage, track, and resolve support tickets effortlessly — all in one place.
            </p>

            <div className="cta-buttons">
              <Link to="/auth/login" className="btn btn-primary1">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-outline">
                Get Started
              </Link>
            </div>
          </div>

          <div className="circle-decor"></div>

          <div className="wave">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path fill="#473fd6ff" fillOpacity="1" d="M0,0L12.6,10.7C25.3,21,51,43,76,58.7C101.1,75,126,85,152,96C176.8,107,202,117,227,149.3C252.6,181,278,235,303,261.3C328.4,288,354,288,379,266.7C404.2,245,429,203,455,202.7C480,203,505,245,531,240C555.8,235,581,181,606,144C631.6,107,657,85,682,80C707.4,75,733,85,758,85.3C783.2,85,808,75,834,90.7C858.9,107,884,149,909,160C934.7,171,960,149,985,133.3C1010.5,117,1036,107,1061,128C1086.3,149,1112,203,1137,202.7C1162.1,203,1187,149,1213,149.3C1237.9,149,1263,203,1288,197.3C1313.7,192,1339,128,1364,112C1389.5,96,1415,128,1427,144L1440,160L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z">
                    </path>
                </svg>
              </div>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Ticket Manager Pro?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🚀 Fast & Simple</h3>
              <p>Streamline your ticket workflow with an intuitive, responsive interface.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Secure Access</h3>
              <p>Keep your data safe and protected with local session-based authentication.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Powerful Dashboard</h3>
              <p>Track open, closed, and in-progress tickets at a glance.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
