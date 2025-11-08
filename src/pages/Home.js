import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Welcome to SkillCert Locker</h1>
        <p>Your trusted digital space to explore, earn, and showcase professional certifications.</p>
        <button className="cta">Get Started</button>
      </section>

      {/* TRENDING CERTIFICATIONS */}
      <section className="section">
        <h2>Trending Certifications</h2>
        <div className="grid">
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
              alt="AWS"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=AWS"; }}
            />
            <h3>AWS Cloud Practitioner</h3>
            <p>Launch your cloud career with the leading AWS certification.</p>
          </div>

          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=Google"; }}
            />
            <h3>Google Cloud Engineer</h3>
            <p>Build and manage cloud solutions on Google Cloud Platform.</p>
          </div>

          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=Microsoft"; }}
            />
            <h3>Azure Fundamentals</h3>
            <p>Understand the core of Microsoft’s Azure services and tools.</p>
          </div>

          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
              alt="IBM"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=IBM"; }}
            />
            <h3>IBM AI Analyst</h3>
            <p>Build intelligent solutions with IBM’s AI and analytics tools.</p>
          </div>
        </div>
      </section>

      {/* ROLE-BASED CERTIFICATIONS (keeps your cards; no images required) */}
      <section className="section">
        <h2>Role-Based Certifications</h2>
        <div className="grid">
          <div className="card">
            <h3>Software Developer / Cloud Engineer</h3>
            <p>AWS Developer Associate, Azure DevOps Engineer, Google Cloud Engineer</p>
          </div>
          <div className="card">
            <h3>Cybersecurity Analyst</h3>
            <p>CompTIA Security+, CEH, CISSP, IBM Cybersecurity Analyst</p>
          </div>
          {/* ... keep the rest as before ... */}
        </div>
      </section>

      {/* RECOMMENDED SECTION */}
      <section className="section">
        <h2>Recommended For You</h2>
        <div className="grid">
          <div className="card small">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Coursera_logo.svg"
              alt="Coursera"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=Coursera"; }}
            />
            <h3>Coursera Specializations</h3>
            <p>Build career-ready skills with globally recognized programs.</p>
          </div>
          <div className="card small">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg"
              alt="Udemy"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=Udemy"; }}
            />
            <h3>Udemy Pro Courses</h3>
            <p>Learn in-demand skills from top instructors worldwide.</p>
          </div>
          <div className="card small">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
              alt="LinkedIn Learning"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=LinkedIn"; }}
            />
            <h3>LinkedIn Learning</h3>
            <p>Enhance your professional profile with verified skills.</p>
          </div>
        </div>
      </section>

      {/* TOP INSTITUTIONS */}
      <section className="section institutions">
        <h2>Top Issuing Institutions</h2>
        <div className="logos">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg"
            alt="Harvard"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/90?text=Harvard"; }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg"
            alt="MIT"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/90?text=MIT"; }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/47/Stanford_University_seal_2003.svg"
            alt="Stanford"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/90?text=Stanford"; }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/3a/NPTEL_Logo.png"
            alt="NPTEL"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/90?text=NPTEL"; }}
          />
        </div>
      </section>

      {/* RECENT CERTIFICATES */}
      <section className="section">
        <h2>Recently Earned Certificates</h2>
        <div className="grid">
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google Developers"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=Google"; }}
            />
            <h3>Frontend Web Developer</h3>
            <p>By: John Doe — Issued on 2 Nov 2025</p>
          </div>
          <div className="card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg"
              alt="MIT"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=MIT"; }}
            />
            <h3>AI Ethics Certificate</h3>
            <p>By: Priya Sharma — Issued on 1 Nov 2025</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="t-card">
            <p>“SkillCert Locker helped me organize all my achievements and share them easily in job applications!”</p>
            <h4>– Ananya, Software Engineer</h4>
          </div>
          <div className="t-card">
            <p>“The platform’s clean design and easy access to trending certifications is unmatched.”</p>
            <h4>– Rohan, Cloud Architect</h4>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section newsletter">
        <h2>Stay Updated!</h2>
        <p>Get the latest certification trends and offers delivered to you.</p>
        <input type="email" placeholder="Enter your email" />
        <button className="cta">Subscribe</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 SkillCert Locker | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
