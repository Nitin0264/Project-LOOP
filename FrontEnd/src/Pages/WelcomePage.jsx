import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="page hero">
      <div>
        <div className="logo">LOOP</div>
        <h1>Customer Feedback Intelligence</h1>
        <p>
          Collect, organize and understand customer feedback with AI-powered
          sentiment, themes, trends and actionable insights.
        </p>
        <Link className="btn" to="/register">Get Started</Link>
        <Link className="btn secondary" to="/login">Login</Link>
      </div>
    </div>
  );
}