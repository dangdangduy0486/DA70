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
import axios from "axios";

import MenuProfile from "../MenuProfile/MenuProfile";
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useState } from "react";

const NavBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { email } = useAuth();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const Search = (key) => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${key}`)
      .then((response) => {
        console.log(response.data.coins);
        setSearchResults(response.data.coins);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchResultsList = () => {
    const list = document.getElementById("list-group");
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-light fixed-top navbar">
        <Container fluid>
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
                <Nav.Link href="/market">Market</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/converter">
                <Nav.Link href="/converter">Converter</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/trading">
                <Nav.Link href="/trading">P2P</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/aboutus">
                <Nav.Link href="/aboutus">About Us</Nav.Link>
              </Link>
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
            </Nav>
          </Navbar.Collapse>
          {email ? (
            <>
              <Nav className="me-0 menu-right">
                <Link style={{ textDecoration: "none" }} to="/logout">
                  <Button
                    className="btn"
                    variant="outline-warning"
                    onClick={sendLogout}
                  >
                    Logout
                  </Button>
                </Link>
                <span className="money">money</span>
                <MenuProfile className="menu-profile" email={email} />
                <Link
                  style={{ textDecoration: "none", alignSelf: "center" }}
                  to="/charge"
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
        <Nav>
          <Nav.Item>
            <input
              className="me-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => Search(event.target.value)}
              onFocus={searchResultsList}
            />
          </Nav.Item>
          <Nav.Item>
            <ul
              className="list-group"
              id="list-group"
              style={{ display: "none", zIndex: 1 }}
            >
              {searchResults &&
                searchResults.map((s) => (
                  <li className="list-group-item">{s.name}</li>
                ))}
            </ul>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
