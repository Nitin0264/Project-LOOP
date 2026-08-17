import React from "react";
import LOOP_DATA from "../assets/data";
import { Layout } from "./DashboardPage";

export default function ReportsPage() {
  const downloadReport = () => {
    const header = "ID,Feedback,Channel,Sentiment,Theme,Date\\n";
    const rows = LOOP_DATA.feedback.map(x =>
      [x.id, `"${x.text.replaceAll('"', '""')}"`, x.channel, x.sentiment, x.theme, x.date].join(",")
    ).join("\\n");
    const blob = new Blob([header + rows], {type: "text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loop-feedback-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title="Reports">
      <div className="grid">
        <div className="card"><div className="muted">Feedback analyzed</div><div className="stat">{LOOP_DATA.feedback.length}</div></div>
        <div className="card"><div className="muted">Positive rate</div><div className="stat">{Math.round(LOOP_DATA.feedback.filter(x => x.sentiment === "positive").length / LOOP_DATA.feedback.length * 100)}%</div></div>
        <div className="card"><div className="muted">Negative rate</div><div className="stat">{Math.round(LOOP_DATA.feedback.filter(x => x.sentiment === "negative").length / LOOP_DATA.feedback.length * 100)}%</div></div>
        <div className="card"><div className="muted">Channels</div><div className="stat">{new Set(LOOP_DATA.feedback.map(x => x.channel)).size}</div></div>
      </div>
      <div className="card" style={{marginTop: 20}}>
        <h2>Feedback Report</h2>
        <p className="muted">Download the current feedback dataset as a CSV report.</p>
        <button className="btn" onClick={downloadReport}>Download CSV</button>
      </div>
    </Layout>
  );
}