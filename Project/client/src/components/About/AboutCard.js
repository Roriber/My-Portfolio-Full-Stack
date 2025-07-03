import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Roland Oliver Petrola </span>
            from <span className="purple">Pangasinan, Philippines</span><br></br>
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
               <li className="about-activity">
              <ImPointRight /> Enjoying Life
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Movies
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Progress isn’t just about writing code — it’s about writing the right code."{" "}
          </p>
          <footer className="blockquote-footer">Roland Oliver</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
