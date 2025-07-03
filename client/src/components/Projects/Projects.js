import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import almontImg from "../../Assets/Projects/almontpage.png";
import dashboardImg from "../../Assets/Projects/dashboard.png";

function Projects() {
  return (
    <Container fluid className="project-section d-flex flex-column min-vh-100">
      <Helmet>
        <title>My Portfolio | Roland Oliver Petrola</title>
        <meta
          name="description"
          content="Projects by Roland Oliver Petrola: Almont DigiHealth App, Dashboard UI, and Login Authentication System"
        />
      </Helmet>

      <Container className="text-center">
        <h1 className="project-heading mb-4">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p className="text-white mb-5">
          Here are a few projects I’ve worked on recently.
        </p>

        <Row className="justify-content-center g-4">
          <Col md={4} className="mb-4">
            <a
              href="https://almonthealth.net/login"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card className="bg-dark text-white p-3 h-100" style={{ cursor: "pointer" }}>
                <Card.Img variant="top" src={almontImg} alt="Almont DigiHealth App" />
                <Card.Body>
                  <Card.Title>🏥 Almont DigiHealth App</Card.Title>
                  <Card.Text>
                    A healthcare application built for hospital login and patient monitoring.
                    Developed with a clean and responsive UI for better staff experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="bg-dark text-white p-3 h-100">
              <Card.Img variant="top" src={dashboardImg} alt="Dashboard UI" />
              <Card.Body>
                <Card.Title>📊 Dashboard UI</Card.Title>
                <Card.Text>
                  Admin dashboard using React and Chart.js for dynamic data metrics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="bg-dark text-white p-3 h-100">
              <Card.Img variant="top" src={dashboardImg} alt="Login Authentication System" />
              <Card.Body>
                <Card.Title>🔐 Login Authentication System</Card.Title>
                <Card.Text>
                  A secure login/register system using React and Firebase Authentication with form
                  validation.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
