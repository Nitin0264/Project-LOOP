import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">LOOP</div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/inbox">Inbox</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <section className="hero">
        <div>
          <h1>Turn feedback into action</h1>
          <p>
            LOOP gives your team one place to understand what customers love,
            what frustrates them and what needs attention.
          </p>
          <Link className="btn" to="/dashboard">Open Dashboard</Link>
        </div>
      </section>
    </div>
  );
}