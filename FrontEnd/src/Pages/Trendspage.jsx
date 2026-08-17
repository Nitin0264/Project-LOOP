import React from "react";
import LOOP_DATA from "../assets/data";
import { Layout } from "./DashboardPage";

export default function TrendsPage() {
  const themes = [...new Set(LOOP_DATA.feedback.map(x => x.theme))];
  const counts = themes.map(theme => ({
    theme,
    count: LOOP_DATA.feedback.filter(x => x.theme === theme).length
  }));
  const max = Math.max(...counts.map(x => x.count), 1);

  return (
    <Layout title="Trends">
      <div className="card">
        <h2>Feedback by Theme</h2>
        <div className="chart-row">
          {counts.map(item => (
            <div key={item.theme} style={{flex: 1}}>
              <div className="bar" style={{height: `${(item.count / max) * 160}px`}}></div>
              <div className="bar-label">{item.theme}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid" style={{marginTop: 20}}>
        {counts.map(item => (
          <div className="card" key={item.theme}>
            <div className="muted">{item.theme}</div>
            <div className="stat">{item.count}</div>
            <p>Feedback items</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}