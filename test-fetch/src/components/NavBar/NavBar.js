import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./NavBar.css";
import MenuProfile from "../MenuProfile/MenuProfile";
import useAuth from "../../hooks/useAuth";
import CurrencyDetails from "../CurrencyDetails/CurrencyDetails";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
  const [vsCurrency, setVsCurrency] = useState("usd");
  useEffect(() => {
    callback();
  }, []);

  const callback = async (childData) => {
    if (childData) {
      await setVsCurrency((vsCurrency) => (vsCurrency = childData));
      await props.currencyFr(vsCurrency);
      console.log(vsCurrency);
    } else {
      await props.currencyFr(vsCurrency);
    }
  };

  const { email } = useAuth();

  return (
    <>
      <Navbar expand="lg" className="bg-light navbar">
        <Container fluid>
          <Nav>
            <Nav.Item>
              {props.page === "markets" ? (
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
                >
                  <i className="fa-sharp fa-solid fa-bars"></i>
                </button>
              ) : (
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#staticBackdrop"
                  aria-controls="staticBackdrop"
                  style={{ display: "none" }}
                >
                  <i className="fa-sharp fa-solid fa-bars"></i>
                </button>
              )}
            </Nav.Item>
          </Nav>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand>
              <FontAwesomeIcon className="text-warning" icon={faBitcoinSign} />
              DBcoin
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto meune_collapse1">
              <Link style={{ textDecoration: "none" }} to="/markets">
                <Nav.Link href="/market">Markets</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/converter">
                <Nav.Link href="/converter">Converter</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/p2p-trading">
                <Nav.Link href="/p2p-trading">P2P</Nav.Link>
              </Link>
              {/* <Link style={{ textDecoration: "none" }} to="/aboutus">
                <Nav.Link href="/aboutus">About Us</Nav.Link>
              </Link> */}
              <Link style={{ textDecoration: "none" }} to="/nft">
                <Nav.Link href="/nft">NFT</Nav.Link>
              </Link>
              <Nav.Item>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Exchanges
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ textDecoration: "none" }}
                        to="/exchanges"
                      >
                        Crypto Exchanges
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ textDecoration: "none" }}
                        to="/exchanges/derivatives"
                      >
                        Derivatives
                      </Link>
                    </li>
                  </ul>
                </li>
              </Nav.Item>
              {/* <Nav.Item>
                <SearchBar />
              </Nav.Item> */}
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <CurrencyDetails currencyFr={callback} vsCurrency={vsCurrency} />
          </Nav>
          {email ? (
            <>
              <Nav className="me-0 menu-right">
                {/* <Link style={{ textDecoration: "none" }} to="/">
                  <Button
                    className="btn"
                    variant="outline-warning"
                    onClick={sendLogout}
                  >
                    Logout
                  </Button>
                </Link> */}
                {/* <span className="money">money</span> */}
                <MenuProfile className="menu-profile" email={email} />
                <Link
                  style={{ textDecoration: "none", alignSelf: "center" }}
                  to="/funding"
                >
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="btn ms-2 btn-cart"
                    variant="outline-warning"
                    type="button"
                  />
                </Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-0 menu-right">
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Nav.Link href="/Login">Login</Nav.Link>
                </Link>
                <Link
                  style={{ textDecoration: "none", marginLeft: "1rem" }}
                  to="/signup"
                >
                  <Button variant="outline-warning">Signup</Button>
                </Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
