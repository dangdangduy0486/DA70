import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import getCurrencySymbol from "currency-symbols";

import "./MarkestDetails.css";

const MarketsDetails = ({ markets, symbol, categoryFr }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("All Categories");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/categories/list")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectCategory = (value) => {
    let data = value.category_id;
    if (!data) {
      data = "all";
      categoryFr(data);
      setSelected("All Categories");
    } else {
      categoryFr(data);
      setSelected(value.name);
    }
  };

  if (!categories) return null;
  return (
    <>
      <div>
        <div>
          <h2>Cryptocurrency Prices by Market Cap</h2>
        </div>
        <div>
          <p className="text-muted">
            The global cryptocurrency market cap today is $835 Billion, a
            <span className="text-danger">
              -5.7% <FontAwesomeIcon icon={faArrowTurnDown} />
            </span>
            change in the last 24 hours.
            <a
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              style={{ textDecoration: "underline" }}
              className="text-muted"
            >
              Read more.
            </a>
            <p className="collapse" id="collapseExample">
              Total cryptocurrency trading volume in the last day is at $60
              Billion. Bitcoin dominance is at 38.4% and Ethereum dominance is
              at 17%. CoinGecko is now tracking 12,961 cryptocurrencies. The
              largest gainers in the industry right now are Stablecoins and
              Tezos Ecosystem cryptocurrencies.
            </p>
          </p>
        </div>
      </div>
      <div className="dropdown">
        <button
          className="border border-white rounded-pill"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ height: "30px", width: "150px" }}
        >
          {selected}
        </button>
        <ul className="dropdown-menu" id="dropdown-categories">
          <li className="dropdown-categories-items">
            <p onClick={() => handleSelectCategory("all")}>All</p>
          </li>
          {categories &&
            categories.map((category) => (
              <li
                className="dropdown-categories-items"
                key={category.category_id}
              >
                <p
                  onClick={() => handleSelectCategory(category)}
                  key={category.category_id}
                >
                  {category.name}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <table className="table_markets table table-hover">
          <thead>
            <tr>
              <th id="market_rank">#</th>
              <th>Coin</th>
              <th></th>
              <th></th>
              <th>Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th className="total_volume">24h Volume</th>
              <th className="market_cap">Market Cap</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {markets &&
              markets.map((market, index) => (
                <tr key={index}>
                  <td data-label="#">
                    <p>
                      {market.market_cap_rank ? market.market_cap_rank : "?"}
                    </p>
                  </td>
                  <td data-label="Coin" colSpan="3">
                    <div className="coin_box">
                      <Link
                        style={{
                          textDecoration: "none",
                          display: "flex",
                        }}
                        to={`/coins/${market.id}`}
                      >
                        <img className="imgCoin" src={market.image} alt="" />
                        <p
                          style={{ color: "black", marginBottom: 0 }}
                          className="me-3"
                        >
                          {market.name}
                        </p>
                        <span className="text-muted">
                          {market.symbol.toUpperCase()}
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td data-label="Price">
                    <span className="text-muted">{`${
                      getCurrencySymbol(symbol)
                        ? getCurrencySymbol(symbol)
                        : symbol.toUpperCase()
                    } `}</span>
                    <span>
                      {market.current_price
                        ? market.current_price.toLocaleString()
                        : "?"}
                    </span>
                  </td>
                  <td data-label="1h">
                    <p
                      className={`${
                        market.price_change_percentage_1h_in_currency > 0
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      {market.price_change_percentage_1h_in_currency < 0 ? (
                        <FontAwesomeIcon icon={faArrowTrendDown} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                      )}
                      {market.price_change_percentage_1h_in_currency
                        ? market.price_change_percentage_1h_in_currency.toFixed(
                            2
                          )
                        : "?"}
                      %
                    </p>
                  </td>
                  <td data-label="24h">
                    <p
                      className={`${
                        market.price_change_percentage_24h_in_currency > 0
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      {market.price_change_percentage_24h_in_currency < 0 ? (
                        <FontAwesomeIcon icon={faArrowTrendDown} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                      )}
                      {market.price_change_percentage_24h_in_currency
                        ? market.price_change_percentage_24h_in_currency.toFixed(
                            2
                          )
                        : "?"}
                      %
                    </p>
                  </td>
                  <td data-label="7d">
                    <p
                      className={`${
                        market.price_change_percentage_7d_in_currency > 0
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      {market.price_change_percentage_7d_in_currency < 0 ? (
                        <FontAwesomeIcon icon={faArrowTrendDown} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                      )}
                      {market.price_change_percentage_7d_in_currency
                        ? market.price_change_percentage_7d_in_currency.toFixed(
                            2
                          )
                        : "?"}
                      %
                    </p>
                  </td>
                  <td data-label="Volume" className="total_volume">
                    <span className="text-muted">{`${
                      getCurrencySymbol(symbol)
                        ? getCurrencySymbol(symbol)
                        : symbol.toUpperCase()
                    } `}</span>
                    <span>
                      {market.total_volume
                        ? market.total_volume.toLocaleString()
                        : "?"}
                    </span>
                  </td>
                  <td data-label="Market Cap" className="market_cap">
                    <span className="text-muted">{`${
                      getCurrencySymbol(symbol)
                        ? getCurrencySymbol(symbol)
                        : symbol.toUpperCase()
                    } `}</span>
                    <span>
                      {market.market_cap
                        ? market.market_cap.toLocaleString()
                        : "?"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Buy
                    </button>
                    <ul
                      className="dropdown-menu"
                      style={{ textAlign: "center" }}
                    >
                      <li>Please login first!</li>
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MarketsDetails;
