import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import MenuProfile from "../MenuProfile/MenuProfile";

const NavBar = () => {
  const email = localStorage.getItem("email");
  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };
  // return (
  //   <>
  //     <Navbar expand="lg" className="bg-light fixed-top navbar">
  //       <Container fluid>
  //         <Link style={{ textDecoration: "none" }} to="/">
  //           <Navbar.Brand>
  //             <FontAwesomeIcon className="text-warning" icon={faBitcoinSign} />
  //             DBcoin
  //           </Navbar.Brand>
  //         </Link>
  //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //         <Navbar.Collapse id="basic-navbar-nav ">
  //           <Nav className="me-auto meune_collapse1">
  //             <Link style={{ textDecoration: "none" }} to="/markets">
  //               <Nav.Link href="/market">Market</Nav.Link>
  //             </Link>
  //             <Link style={{ textDecoration: "none" }} to="/converter">
  //               <Nav.Link href="/converter">Converter</Nav.Link>
  //             </Link>
  //             <Link style={{ textDecoration: "none" }} to="/trading">
  //               <Nav.Link href="/trading">P2P</Nav.Link>
  //             </Link>
  //             <Link style={{ textDecoration: "none" }} to="/aboutus">
  //               <Nav.Link href="/aboutus">About Us</Nav.Link>
  //             </Link>
  //           </Nav>
  //           {token ? (
  //             <>
  //               <Nav className="me-0">
  //                 <Link style={{ textDecoration: "none" }} to="/logout">
  //                   <Button
  //                     className="btn"
  //                     variant="outline-warning"
  //                     onClick={handleLogout}
  //                   >
  //                     Logout
  //                   </Button>
  //                 </Link>
  //                 <span className="money">money</span>
  //                 <MenuProfile email={email} />
  //                 <Link
  //                   style={{ textDecoration: "none", alignSelf: "center" }}
  //                   to="/charge"
  //                 >
  //                   <FontAwesomeIcon
  //                     icon={faSackDollar}
  //                     className="btn ms-2 btn-cart"
  //                     variant="outline-warning"
  //                     type="button"
  //                   />
  //                 </Link>
  //                 <FontAwesomeIcon
  //                   icon={faSackDollar}
  //                   className="btn ms-2 btn-cart"
  //                   variant="outline-warning"
  //                   type="button"
  //                 />
  //               </Link>
  //             </Nav>
  //           </>
  //         ) : (
  //           <>
  //             <Nav className="me-0 menu-right">
  //               <Link style={{ textDecoration: "none" }} to="/login">
  //                 <Nav.Link href="/Login">Login</Nav.Link>
  //               </Link>
  //               <Link
  //                 style={{ textDecoration: "none", marginLeft: "1rem" }}
  //                 to="/signup"
  //               >
  //                 <Button variant="outline-warning">Signup</Button>
  //               </Link>
  //             </Nav>
  //           </>
  //         )}
  //       </Container>
  //     </Navbar>
  //   </>
  // );
};

export default NavBar;
