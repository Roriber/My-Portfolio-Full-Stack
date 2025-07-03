import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";

function Services() {
  return (
    <Container fluid className="about-section d-flex flex-column justify-content-center min-vh-100">
      <Helmet>
        <title>My Portfolio | Roland Oliver Petrola</title>
        <meta name="description" content="Software development services offered by Roland Oliver Petrola, including full-stack development, mobile app prototyping, API integration, and custom web features." />
        <meta name="keywords" content="Roland Oliver Petrola, Software Developer, Services, Full-Stack Development, API Integration, React, Firebase" />
      </Helmet>

      <Container className="text-center">
        <h1 className="project-heading mb-4">
          My <strong className="purple">Services</strong>
        </h1>
        <p className="text-white mb-5">
          Here's what I can offer as a Software Developer:
        </p>
        <Row className="justify-content-center text-white">
          <Col md={5} className="mb-4">
            <h4>💻 Full-Stack Development</h4>
            <p>
              Building responsive and robust web applications using React.js,
              Node.js, Express, and MongoDB.
            </p>
          </Col>
          <Col md={5} className="mb-4">
            <h4>📱 Mobile App Prototyping</h4>
            <p>
              Creating mobile-ready UIs using Ionic/Angular or React Native for
              cross-platform deployment.
            </p>
          </Col>
          <Col md={5} className="mb-4">
            <h4>🛠️ API Integration</h4>
            <p>
              Integrating third-party services like Firebase, RESTful APIs, or
              GraphQL into applications.
            </p>
          </Col>
          <Col md={5} className="mb-4">
            <h4>🎯 Custom Web Features</h4>
            <p>
              Developing specific features like authentication, dashboards, and
              interactive components.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Services;
