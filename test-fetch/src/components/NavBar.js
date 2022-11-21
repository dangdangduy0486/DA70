import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../Css/NavBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MenuProfile from "./MenuProfile";

const NavBar = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const email = localStorage.getItem("email");
  console.log(email);
  const handleLogout = () => {
    localStorage.removeItem("token", "email");
    window.location.reload();
  };
  return (
    <>
      <Navbar expand="lg" className="bg-light fixed-top navbar">
        <Container>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand>
              <FontAwesomeIcon className="text-warning" icon={faBitcoinSign} />
              DBcoin
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link style={{ textDecoration: "none" }} to="/markets">
                <Nav.Link href="/market">Market</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/converter">
                <Nav.Link href="/converter">Converter</Nav.Link>
              </Link>

              <NavDropdown title="About Us" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {token ? (
              <>
                <Nav className="me-0">
                  <Link style={{ textDecoration: "none" }} to="/logout">
                    <Button
                      className="btn"
                      variant="outline-warning"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Link>

                  <MenuProfile email={email} />

                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="btn ms-2 btn-cart"
                    variant="outline-warning"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  />
                </Nav>
              </>
            ) : (
              <>
                <Nav className="me-0">
                  <Link style={{ textDecoration: "none" }} to="/login">
                    <Nav.Link href="/Login">Login</Nav.Link>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/signup">
                    <Button variant="outline-warning">Signup</Button>
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
