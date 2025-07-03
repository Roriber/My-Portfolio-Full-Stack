import React, { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

function Contact() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Thank you for contacting me!");
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

					<Form onSubmit={handleSubmit} className="text-start mx-auto" style={{ maxWidth: "500px", color: "white" }}>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter your name" required />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" required />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Message</Form.Label>
							<Form.Control as="textarea" rows={4} placeholder="Your message" required />
						</Form.Group>

						<Button variant="primary" type="submit">
							Send Message
						</Button>
					</Form>

					<p style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "30px" }}>
						I usually respond within 24 hours — unless I’m deep in code or debugging something tricky 🐛.
					</p>
				</Container>
			</Container>
		</div>
	);
}

export default Contact;
