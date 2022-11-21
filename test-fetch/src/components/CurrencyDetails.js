import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/currencyDetails.css";

const CurrencyDetails = (props) => {
  const [currencies, setCurrencies] = useState(null);

  const handleSelectCurrency = (value) => {
    console.log(value.symbol);
    props.currencyFr(value.symbol);
  };

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
    <div id="currencyDetails">
      {currencies &&
        currencies.map((currency) => (
          <div
            className="currency_item"
            onClick={() => handleSelectCurrency(currency)}
            style={{ cursor: "pointer" }}
          >
            {currency.symbol.toUpperCase()}
          </div>
        ))}
    </div>
  );
};

export default CurrencyDetails;
