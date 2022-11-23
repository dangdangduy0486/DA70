import React from "react";
import "../Css/converter.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CurrencyInput from "./CurrencyInput";
import Button from "react-bootstrap/esm/Button";
import NavBar from "./NavBar";
const Coverter = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("btc");
  const [currency2, setCurrency2] = useState("btc");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/exchange_rates`)
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  function numberFormat(number) {
    return number.toFixed(6);
  }
  function handleAmount1Change(amount1) {
    setAmount2(
      numberFormat((amount1 * rates[currency2].value) / rates[currency1].value)
    );
    setAmount1(amount1);
  }
  function handleCurrency1Change(currency1) {
    setAmount2(
      numberFormat((amount1 * rates[currency2].value) / rates[currency1].value)
    );
    setCurrency1(currency1);
  }
  return (
    <>
      <NavBar />
      <div className="container_converter">
        <div className="coin_con">
          <div className="coin_trade">
            <h2>Converter Coin</h2>
            <h5>From</h5>
            <CurrencyInput
              onAmountChange={handleAmount1Change}
              onCurrencyChange={handleCurrency1Change}
              currencies={Object.keys(rates)}
              amount={amount1}
              currency={currency1}
            />
            <h5>To</h5>
            <CurrencyInput
              onAmountChange={setAmount2}
              onCurrencyChange={setCurrency2}
              currencies={Object.keys(rates)}
              amount={amount2}
              currency={currency2}
            />
            <Button variant="outline-warning">Swap</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coverter;
