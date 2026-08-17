import React, { useState } from "react";
import { Layout } from "./DashboardPage";

export default function SettingsPage() {
  const [name, setName] = useState("LOOP Admin");
  const [email, setEmail] = useState("admin@example.com");
  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout title="Settings">
      <div className="card" style={{maxWidth: 650}}>
        <h2>Account Settings</h2>
        <form onSubmit={save}>
          <div className="form-group">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <button className="btn" type="submit">Save Settings</button>
          {saved && <p className="muted">Settings saved successfully.</p>}
        </form>
      </div>
    </Layout>
  );
}