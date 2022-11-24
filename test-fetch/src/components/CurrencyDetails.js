import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/currencyDetails.css";

const CurrencyDetails = (props) => {
  const [currencies, setCurrencies] = useState(null);
  const [ selectedCurrency, setSelectedCurrency ] = useState(null)

  const handleSelectCurrency = (value) => {
    props.currencyFr(value.symbol);
    setSelectedCurrency(value.symbol)
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
    <>
      {/* <div id="currencyDetails">
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
      </div> */}
      <button
        type="button"
        class="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target="#currencyModalLabel"
      >
        {selectedCurrency.toUpperCase()}
      </button>
      <div
        class="modal fade currency-list-modal"
        id="currencyModalLabel"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content currency-modal-content">
            <div class="modal-header currency-modal-header">
              <input
                placeholder="Enter money unit, example: usd, eur, btc"
                class="form-control"
              />
              <button
                type="button"
                class="btn-close close-currenncy-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body currency-list">
              {currencies &&
                currencies.map((currency) => (
                  <p
                    className="currency_item"
                    onClick={() => handleSelectCurrency(currency)}
                    style={{ cursor: "pointer" }}
                    data-bs-dismiss="modal"
                  >
                    {currency.symbol.toUpperCase()}
                  </p>
                ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyDetails;
