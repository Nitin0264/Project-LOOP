import React, { useState } from "react";
import LOOP_API from "../assets/api";
import LOOP_DATA from "../assets/data";
import { Layout } from "./DashboardPage";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const response = await LOOP_API.post("/insights/ask", { question });
      setAnswer(response.data?.answer || JSON.stringify(response.data));
    } catch {
      const q = question.toLowerCase();
      if (q.includes("negative")) {
        const items = LOOP_DATA.feedback.filter(x => x.sentiment === "negative");
        setAnswer(`There are ${items.length} negative feedback items. The main issues are ${items.map(x => x.theme).join(", ")}.`);
      } else if (q.includes("positive")) {
        const items = LOOP_DATA.feedback.filter(x => x.sentiment === "positive");
        setAnswer(`There are ${items.length} positive feedback items, especially around ${items.map(x => x.theme).join(", ")}.`);
      } else {
        setAnswer(`Based on the current dataset, LOOP has ${LOOP_DATA.feedback.length} feedback items across ${new Set(LOOP_DATA.feedback.map(x => x.theme)).size} themes.`);
      }
    }
  };

  return (
    <Layout title="Ask AI">
      <div className="card">
        <h2>Ask LOOP AI</h2>
        <p className="muted">Ask questions about your customer feedback.</p>
        <form onSubmit={ask}>
          <div className="form-group">
            <textarea rows="5" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Example: What are the main negative feedback themes?" />
          </div>
          <button className="btn" type="submit">Ask</button>
        </form>
        {answer && <div className="answer"><strong>LOOP AI:</strong><br />{answer}</div>}
      </div>
    </Layout>
  );
}