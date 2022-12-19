import { useState } from "react";
import "./CurrencyDetails.css";
import { useGetCurrenciesQuery } from "../../features/coins/coinsApiSlice";

const CurrencyDetails = (props) => {
  const [selected, setSelected] = useState("usd");

  const handleSelectCurrency = (value) => {
    props.currencyFr(value.symbol);
    setSelected(value.symbol);
  };
  const { data, error, isLoading } = useGetCurrenciesQuery();
  if (!data || error || isLoading) return null;
  return (
    <>
      <div className="dropdown">
        <button
          className="border border-white rounded-pill"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ height: "30px", width: "150px" }}
        >
          {selected.toUpperCase()}
        </button>
        <ul className="dropdown-menu" id="dropdown-currencies">
          {data &&
            data.map((currency) => (
              <li className="dropdown-currencies-items">
                <p
                  onClick={() => handleSelectCurrency(currency)}
                  key={currency._id}
                >
                  {currency.symbol.toUpperCase()}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CurrencyDetails;
