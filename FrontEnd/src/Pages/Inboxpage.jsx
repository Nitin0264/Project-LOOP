import React, { useMemo, useState } from "react";
import LOOP_DATA from "../assets/data";
import { Layout } from "./DashboardPage";

export default function InboxPage() {
  const [search, setSearch] = useState("");
  const [sentiment, setSentiment] = useState("all");

  const filtered = useMemo(() => LOOP_DATA.feedback.filter(item => {
    const matchesSearch = `${item.text} ${item.theme} ${item.channel}`.toLowerCase().includes(search.toLowerCase());
    const matchesSentiment = sentiment === "all" || item.sentiment === sentiment;
    return matchesSearch && matchesSentiment;
  }), [search, sentiment]);

  return (
    <Layout title="Feedback Inbox">
      <div className="toolbar">
        <input className="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search feedback..." />
        <select className="search" value={sentiment} onChange={e => setSentiment(e.target.value)}>
          <option value="all">All sentiments</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Feedback</th><th>Channel</th><th>Sentiment</th><th>Theme</th><th>Date</th></tr></thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td><td>{item.text}</td><td>{item.channel}</td>
                <td><span className={`badge ${item.sentiment}`}>{item.sentiment}</span></td>
                <td>{item.theme}</td><td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}