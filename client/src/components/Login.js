import React, { useState } from "react";

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = e =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage("");
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user));
            setMessage("Login successful!");
            if (onLogin) onLogin(data.user);
            window.location.href = "/My-Portfolio-Full-Stack/"; // Redirect to home or dashboard
        } else {
            setMessage(data.error || "Login failed");
        }
    };

    return (
        <div style={{
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: 320,
                    padding: 32,
                    borderRadius: 8,
                    background: "rgba(24,24,40,0.98)",
                    boxShadow: "0 4px 24px #0006",
                    color: "#fff",
                    marginTop: 32
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: 24, color: "#b37cfc" }}>Sign In</h2>
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 10, marginBottom: 16, borderRadius: 5, border: "none" }}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 10, marginBottom: 16, borderRadius: 5, border: "none" }}
                />
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
                        cursor: "pointer"
                    }}
                >
                    Sign In
                </button>
                <div style={{ color: "#f77", marginTop: 14, minHeight: 22, textAlign: "center" }}>{message}</div>
            </form>
        </div>
    );
}
