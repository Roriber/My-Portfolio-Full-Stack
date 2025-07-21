import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import almontImg from "../../Assets/Projects/almontpage.png";
import dashboardImg from "../../Assets/Projects/dashboard.png";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editProject, setEditProject] = useState({ name: "", description: "" });

  // Only admins can see add/edit/delete
  const isAdmin = () => localStorage.getItem("role") === "admin";

  // Fetch all projects (GET)
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Add project (POST)
  const handleAdd = (e) => {
    e.preventDefault();
    fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProject),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects([...projects, data]);
        setNewProject({ name: "", description: "" });
      });
  };

  // Edit project (start editing)
  const handleEdit = (project) => {
    setEditId(project._id);
    setEditProject({ name: project.name, description: project.description });
  };

  // Update project (PUT)
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/api/projects/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editProject),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(projects.map((proj) => (proj._id === editId ? data : proj)));
        setEditId(null);
        setEditProject({ name: "", description: "" });
      });
  };

  // Delete project (DELETE)
  const handleDelete = (id) => {
    fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      setProjects(projects.filter((proj) => proj._id !== id));
    });
  };

  const getImage = (projectName) => {
    if (projectName?.toLowerCase().includes("almont")) return almontImg;
    if (projectName?.toLowerCase().includes("dashboard")) return dashboardImg;
    return dashboardImg;
  };

  return (
    <Container fluid className="project-section d-flex flex-column min-vh-100">
      <Helmet>
        <title>My Portfolio | Roland Oliver Petrola</title>
        <meta name="description" content="Projects by Roland Oliver Petrola" />
      </Helmet>
      <Container className="text-center">
        <h1 className="project-heading mb-4">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p className="text-white mb-5">
          Here are a few projects I’ve worked on recently.
        </p>

        {/* Admin only: Add Project Form */}
        {isAdmin() && (
          <Form onSubmit={handleAdd} className="mb-4">
            <Row className="justify-content-center">
              <Col md={3}>
                <Form.Control
                  placeholder="Name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md="auto">
                <Button type="submit" variant="primary">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        <Row className="justify-content-center g-4">
          {projects.map((project) => (
            <Col md={4} className="mb-4" key={project._id}>
              <Card className="bg-dark text-white p-3 h-100">
                <Card.Img
                  variant="top"
                  src={project.image || getImage(project.name)}
                  alt={project.name}
                />
                <Card.Body>
                  {editId === project._id ? (
                    <Form onSubmit={handleUpdate}>
                      <Form.Control
                        className="mb-2"
                        value={editProject.name}
                        onChange={(e) =>
                          setEditProject({ ...editProject, name: e.target.value })
                        }
                        required
                      />
                      <Form.Control
                        className="mb-2"
                        value={editProject.description}
                        onChange={(e) =>
                          setEditProject({
                            ...editProject,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                      <Button type="submit" variant="success" size="sm" className="me-2">
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <Card.Title>{project.name}</Card.Title>
                      <Card.Text>
                        {project.description || "No description provided."}
                      </Card.Text>
                      {/* Admin only: Edit and Delete buttons */}
                      {isAdmin() && (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(project._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
