import React from "react";
import { NavLink } from "react-router-dom";
import LOOP_DATA from "../assets/data";

function Layout({ children, title }) {
  const links = [
    ["/dashboard", "Dashboard"],
    ["/inbox", "Inbox"],
    ["/trends", "Trends"],
    ["/ask", "Ask AI"],
    ["/reports", "Reports"],
    ["/settings", "Settings"]
  ];
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">LOOP</div>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} className={({isActive}) => isActive ? "active" : ""}>{label}</NavLink>
        ))}
      </aside>
      <main className="main">
        <header className="topbar"><strong>{title}</strong><span className="muted">AI Feedback Intelligence</span></header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}

export { Layout };

export default function DashboardPage() {
  const feedback = LOOP_DATA.feedback;
  const positive = feedback.filter(x => x.sentiment === "positive").length;
  const negative = feedback.filter(x => x.sentiment === "negative").length;

  return (
    <Layout title="Dashboard">
      <div className="grid">
        <div className="card"><div className="muted">Total Feedback</div><div className="stat">{feedback.length}</div></div>
        <div className="card"><div className="muted">Positive</div><div className="stat">{positive}</div></div>
        <div className="card"><div className="muted">Negative</div><div className="stat">{negative}</div></div>
        <div className="card"><div className="muted">Themes</div><div className="stat">{new Set(feedback.map(x => x.theme)).size}</div></div>
      </div>

      <div className="card" style={{marginTop: 20}}>
        <h2>Recent Feedback</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Feedback</th><th>Sentiment</th><th>Theme</th><th>Status</th></tr></thead>
            <tbody>
              {feedback.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.text}</td>
                  <td><span className={`badge ${item.sentiment}`}>{item.sentiment}</span></td>
                  <td>{item.theme}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}