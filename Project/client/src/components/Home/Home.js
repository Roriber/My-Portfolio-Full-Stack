import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import homeLogo from "../../Assets/home-main.svg";
import Type from "./Type";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="contact-wrapper">
      <Helmet>
        <title>My Portfolio | Roland Oliver Petrola</title>
        <meta
          name="description"
          content="Welcome to the personal portfolio of Roland Oliver Petrola, a passionate software developer crafting modern web and mobile solutions."
        />
      </Helmet>

      <section>
        <Container fluid className="home-section" id="home">
          <Container className="home-content">
            <Row>
              <Col md={7} className="home-header">
                <h1 style={{ paddingBottom: 15 }} className="heading">
                  Welcome to My Portfolio{" "}
                  <span className="wave" role="img" aria-label="wave">
                    👋🏻
                  </span>
                </h1>

                <h1 className="heading-name">
                  I'M{" "}
                  <strong className="main-name">ROLAND OLIVER PETROLA</strong>
                </h1>

                <p style={{ fontSize: "1.1rem", color: "#ccc", paddingTop: "15px" }}>
                  A passionate software developer focused on creating efficient,
                  user-centric web and mobile solutions that make a difference.
                </p>

                <div style={{ padding: 50, textAlign: "left" }}>
                  <Type />
                </div>
              </Col>

              <Col md={5} style={{ paddingBottom: 20 }}>
                <img
                  src={homeLogo}
                  alt="Roland Oliver Petrola"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </section>
    </div>
  );
}

export default Home;
