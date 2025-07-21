import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet";

function Contact() {
  // Form state for user
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Admin state for messages
  const [contacts, setContacts] = useState([]);
  const isAdmin = () => localStorage.getItem("role") === "admin";
  const token = localStorage.getItem("token");

  // On mount, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    // If admin, fetch all contacts
    if (isAdmin()) {
      fetch("/api/contacts", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(() => setError("Failed to load messages."));
    }
  }, [token]);

  // Handle input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (anyone)
  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else {
          setSuccess("Message sent!");
          setForm({ name: "", email: "", message: "" });
          // Optionally reload messages if admin
          if (isAdmin()) setContacts(contacts => [data, ...contacts]);
        }
      })
      .catch(() => setError("Something went wrong!"));
  };

  // Admin: delete a message
  const handleDelete = id => {
    if (!window.confirm("Delete this message?")) return;
    fetch(`/api/contacts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(() =>
      setContacts(contacts => contacts.filter(c => c._id !== id))
    );
  };

  return (
    <div className="contact-wrapper">
      <Helmet>
        <title>My Portfolio | Roland Oliver Petrola</title>
        <meta name="description" content="Ways to get in touch with Roland Oliver Petrola. Email, phone, and contact form." />
        <meta name="keywords" content="Roland Oliver Petrola, contact, email, phone, software developer" />
      </Helmet>

      <Container fluid className="about-section">
        <Container className="text-center py-5">
          <h1 className="project-heading">
            Let's <strong className="purple">Connect</strong>
          </h1>

          <p style={{ color: "#fff", marginBottom: "20px" }}>
            📞 Contact Number:{" "}
            <span style={{ color: "#c770f0" }}>
              +1 437-228-5319
            </span>
          </p>

          {/* Alert for status */}
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* User & Admin: Contact Form */}
          <Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: "500px", color: "white" }}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>

          {/* Admin only: show all messages */}
          {isAdmin() && (
            <div className="mt-5">
              <h4 style={{ color: "#c770f0" }}>All Messages</h4>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>Message</th><th>Received</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(c => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.message}</td>
                      <td>{new Date(c.createdAt).toLocaleString()}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(c._id)}
                        >Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <p style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "30px" }}>
            I usually respond within 24 hours — unless I’m deep in code or debugging something tricky 🐛.
          </p>
        </Container>
      </Container>
    </div>
  );
}

export default Contact;
