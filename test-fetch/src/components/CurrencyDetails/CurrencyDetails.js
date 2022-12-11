import { useEffect, useState } from "react";
import axios from "axios";
import "./CurrencyDetails.css";
import { useGetCurrenciesQuery } from "../../features/coins/coinsApiSlice";

const CurrencyDetails = (props) => {
  const [currencies, setCurrencies] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const handleSelectCurrency = (value) => {
    props.currencyFr(value.symbol);
    setSelectedCurrency(value.symbol);
  };

  // const url = "/api/currency";
  // const token = localStorage.getItem("token");
  // const opts = {
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .get(url, opts)
  //     .then((response) => {
  //       setCurrencies(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const { data, error, isLoading } = useGetCurrenciesQuery();
  if (!data || error || isLoading) return null;
  return (
    <>
      <div id="currencyDetails">
        {data &&
          data.map((currency) => (
            <div
              className="currency_item"
              onClick={() => handleSelectCurrency(currency)}
              style={{ cursor: "pointer" }}
              key={currency._id}
            >
              {currency.symbol.toUpperCase()}
            </div>
          ))}
      </div>
      {/* <button
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
      </div> */}
    </>
  );
};

export default CurrencyDetails;
