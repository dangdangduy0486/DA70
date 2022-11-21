import axios from "axios";
import { useEffect, useState } from "react";

const ExchangeRates = () => {
  const [exchangeFrom, setExchangeFrom] = useState("btc");
  const [exchangeTo, setExchangeTo] = useState("eth");
  const [exchangeResult, setExchangeResult] = useState(null);
  const [currencies, setCurrencies] = useState(null);

  const url = "api/exchange";
  const handleExchangeFrom = (event) => {
    setExchangeFrom(event.target.value);
  };
  const handleExchangeTo = (event) => {
    setExchangeTo(event.target.value);
  };
  const handleExchange = (e) => {
    e.preventDefault();
    axios
      .get(url, {
        params: {
          from: exchangeFrom,
          to: exchangeTo,
        },
      })
      .then((response) => {
        setExchangeResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(exchangeResult);
  const handleSelected = (event) => {
    console.log(event.target.value)
  }
  useEffect(() => {
    axios
      .get("/api/currency")
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
      <form onSubmit={handleExchange}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            From
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            id="exchangeFrom"
            name="exchangeFrom"
            onChange={handleExchangeFrom}
            value={exchangeFrom}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            To
          </label>
          <input
            type="text"
            class="form-control"
            id="exchangeTo"
            name="exchangeTo"
            onChange={handleExchangeTo}
            value={exchangeTo}
          />
        </div>
        <div className="mb-3">
          <p className="text text-warning">{exchangeResult}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* <form onSubmit={handleExchange}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            From
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            id="exchangeFrom"
            name="exchangeFrom"
            onChange={handleExchangeFrom}
            value={exchangeFrom}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            To
          </label>
          <input
            type="text"
            class="form-control"
            id="exchangeTo"
            name="exchangeTo"
            onChange={handleExchangeTo}
            value={exchangeTo}
          />
        </div>
        <div className="mb-3">
          <p className="text text-warning">{exchangeResult}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form> */}
      <select className="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        {currencies &&
          currencies.map((currency) => (
            <option
              className="currency_item"
              onSelect={() => handleSelected}
              style={{ cursor: "pointer" }}
              defaultValue={currency.symbol.toUpperCase()}
            >
              {currency.symbol.toUpperCase()}
            </option>
          ))}
      </select>
    </>
  );
};

export default ExchangeRates;
