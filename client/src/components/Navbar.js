import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import logo from "../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePhone, AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function scrollHandler() {
      updateNavbar(window.scrollY >= 20);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Check login state
  const isLoggedIn = !!localStorage.getItem("token");
  const currentRole = localStorage.getItem("role");
  const userObj = localStorage.getItem("user");
  const userName = userObj ? JSON.parse(userObj).name : "";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // optional: force refresh
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <img src={logo} style={{ width: "80px", height: "80px" }} alt="brand" />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about" onClick={() => updateExpanded(false)}>
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/project" onClick={() => updateExpanded(false)}>
                <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/services" onClick={() => updateExpanded(false)}>
                <CgFileDocument style={{ marginBottom: "2px" }} /> Services
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" onClick={() => updateExpanded(false)}>
                <AiOutlinePhone style={{ marginBottom: "2px" }} /> Contact
              </Nav.Link>
            </Nav.Item>
            {/* Spacer */}
            <span style={{ width: 20 }}></span>
            {/* Auth links */}
            {!isLoggedIn ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login" onClick={() => updateExpanded(false)}>
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/signup" onClick={() => updateExpanded(false)}>
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginLeft: 12
              }}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  style={{ marginTop: 0 }}
                >
                  Logout
                </Button>
                {userName && (
                  <span style={{ color: "#b37cfc", fontWeight: "bold" }}>
                    Welcome, {userName}!
                  </span>
                )}
                {currentRole && currentRole !== "undefined" && currentRole !== "" && (
                  <span style={{ color: "#888", fontSize: "0.9em", marginLeft: "4px" }}>
                    ({currentRole})
                  </span>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
