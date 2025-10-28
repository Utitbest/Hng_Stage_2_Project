import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Ticket Manager Pro. All rights reserved.</p>
        <div className="footer-links">
          <a href="#" aria-label="About">About</a>
          <a href="#" aria-label="Privacy Policy">Privacy</a>
          <a href="#" aria-label="Terms and Conditions">Terms</a>
        </div>
      </div>
    </footer>
  );
}
