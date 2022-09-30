import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { login, logout } from "../../../services/auth.service";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";
import { isLoginned } from "../../../services/auth.service";
import { useState, useEffect } from "react";

const NavbarPanel = () => {
  const handleSubmit = async (event) => {
    logout();
  };
  const [logined, setLogined] = useState([]);

  useEffect(() => {
    updateLogined();
  }, []);

  const updateLogined = () => {
    setLogined(isLoginned);
  };

  const links = (
    <>
      <Nav.Link href="/DepartmentsPage">Departments</Nav.Link>
      <Nav.Link href="/EmployeesPage">Employees</Nav.Link>
    </>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {logined && links}
          </Nav>
          <Form className="d-flex">
            {!logined && (
              <Button
                className="buttonMenu"
                variant="outline-success"
                href="/LoginPage"
              >
                Login
              </Button>
            )}

            {logined && (
              <Button
                className="buttonMenu"
                variant="outline-success"
                onClick={handleSubmit}
              >
                Logout
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPanel;
