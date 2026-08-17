import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields.");
    }
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h1>Create your LOOP account</h1>
        <div className="form-group">
          <label>Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Create password" />
        </div>
        <button className="btn" type="submit">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}