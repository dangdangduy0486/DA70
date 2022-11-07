import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyDetails from "./CurrencyDetails";

const NavBar = () => {
  const [currencies, setCurrencies] = useState(null);

  const url = "/api/currency";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCurrencies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(currencies);
  if (!currencies) return null;
  console.log(currencies);
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          {currencies &&
            currencies.map((currency) => (
              <CurrencyDetails key={currency._id} currency={currency} />
            ))}
        </ul>
      </div>
      <h1>hello</h1>
    </>
  );
};

export default NavBar;
