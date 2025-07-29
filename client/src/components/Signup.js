import React, { useState } from "react";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [welcomeName, setWelcomeName] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    // Always send role from form (user can select)
    const payload = { ...form, role: form.role || "user" };
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      setWelcomeName(form.name); // Save name before clearing form!
      setMessage("Signup successful! You can now log in.");
      setForm({ name: "", email: "", password: "", role: "user" });
      if (onSignup) onSignup();
    } else {
      setWelcomeName(""); // clear welcome if error
      setMessage(data.error || "Signup failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 320,
          padding: 32,
          borderRadius: 8,
          background: "rgba(24,24,40,0.98)",
          boxShadow: "0 4px 24px #0006",
          color: "#fff",
          marginTop: 32,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24, color: "#b37cfc" }}>
          Sign Up
        </h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 5,
            border: "none",
          }}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 5,
            border: "none",
          }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 5,
            border: "none",
          }}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            borderRadius: 5,
            border: "none",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            background: "#8e44ec",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
        {/* Error or info message */}
        <div
          style={{
            color: message.toLowerCase().includes("success") ? "#0f0" : "#f77",
            marginTop: 14,
            minHeight: 22,
            textAlign: "center",
          }}
        >
          {message}
        </div>
        {/* Welcome message and link */}
        {message.toLowerCase().includes("successful") && welcomeName && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <span style={{ color: "#b37cfc", fontWeight: "bold" }}>
              Welcome, {welcomeName}! 🎉
            </span>
            <br />
            <a
              href="/My-Portfolio-Full-Stack/login"
              style={{
                color: "#b37cfc",
                textDecoration: "underline",
                marginTop: 6,
                display: "inline-block",
              }}
            >
              Go to Login
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
