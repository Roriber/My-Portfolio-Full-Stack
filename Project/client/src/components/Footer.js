import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Developed by Roland Oliver Petrola</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} ROP</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/Roriber"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/roland-petrola-794994175/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <span style={{ color: "white" }}>
                <AiOutlineTwitter />
              </span>
            </li>
            <li className="social-icons">
              <span style={{ color: "white" }}>
                <AiFillInstagram />
              </span>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
