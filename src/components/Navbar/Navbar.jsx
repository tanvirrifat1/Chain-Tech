import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Header = () => {
  return (
    <div className="">
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <div className="text-center">
            <Link to={"/"}>
              <button className="btn btn-outline w-70 rounded-full">
                Home
              </button>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="text-center">
                <Link to={"/other"}>
                  <button className="btn btn-outline w-50 rounded-full">
                    {/* Add inline style for center alignment and width */}
                    <span style={{ display: "inline-block", width: "50px" }}>
                      Profile
                    </span>
                  </button>
                </Link>
              </div>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
