import { useEffect, useState } from "react";
import axios from "axios";
// import CurrencyDetails from "./CurrencyDetails";

const NavBar = (props) => {
  const [currencies, setCurrencies] = useState(null);

  
  // const [daTa, setData] = useState(null);
  const handleSelectCurrency = (value) => {
    console.log(value.symbol)
    props.currencyFr(value.symbol)
  }

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

  if (!currencies) return null;
  console.log(currencies);

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {props.vsCurrency.toUpperCase()}
        </button>
        <ul className="dropdown-menu">
        {currencies &&
        currencies.map((currency) => (
          <li className="dropdown-item">
            <button onClick={() => handleSelectCurrency(currency)} value={currency}>
              {currency.symbol} - {currency.name}
            </button>
          </li>
      ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
