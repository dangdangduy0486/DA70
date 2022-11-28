// import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../Css/markestDetails.css";

const MarketsDetails = ({ markets, symbol }) => {
  const [shopCart, setShopCart] = useState([
    {
      name: null,
      price: 0,
      amount: 0,
      total: 0,
    },
  ]);
  let updatedValue = {};
  const handleClick = (value) => {
    updatedValue = {
      name: value.name,
      price: value.current_price,
      amount: 10,
      total: 100,
    };
    setShopCart([...shopCart, updatedValue]);
  };
  if (!shopCart) return null;
  const shopCartList = [];
  shopCart.forEach((el) => {
    if (el.name !== null) {
      shopCartList.push(el);
    }
  });
  return (
    <>
      {/* <table className="table table-hover table_markets">
        <thead>
          <tr>
            <th scope="col" id="market_rank">
              #
            </th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">1h</th>
            <th scope="col">24h</th>
            <th scope="col">7d</th>
            <th scope="col" className="total_volume">
              Volume
            </th>
            <th scope="col" className="market_cap">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {markets &&
            markets.map((market) => (
              <tr key={market.market_cap_rank}>
                <th data-label="#">
                  <p>{market.market_cap_rank}</p>
                </th>
                <td data-label="Coin">
                  <div className="d-flex justify-content-center">
                    <Link
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      to={`/coins/${market.id}`}
                    >
                      <img
                        className="imgCoin"
                        src={market.image}
                        alt="{coin.image}"
                      />
                      <p style={{ color: "black", marginBottom: 0 }}>
                        {market.name}
                      </p>
                      <span className="text-center text-black ">
                        ({market.symbol})
                      </span>
                    </Link>
                  </div>
                </td>
                <td data-label="Price">
                  <p>
                    {market.current_price}-{`${symbol}`}
                  </p>
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
                      ? market.price_change_percentage_1h_in_currency.toFixed(2)
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
                      ? market.price_change_percentage_7d_in_currency.toFixed(2)
                      : "?"}
                    %
                  </p>
                </td>
                <td data-label="Volume" className="total_volume">
                  <p>
                    {market.total_volume}-{`${symbol}`}
                  </p>
                </td>
                <td data-label="Market Cap" className="market_cap">
                  <p>
                    {market.market_cap}-{`${symbol}`}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}
      <table className="table_markets">
        <thead>
          <th id="market_rank">#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th className="total_volume">Volume</th>
          <th className="market_cap">Market Cap</th>
        </thead>
        <tbody>
          {markets &&
            markets.map((market) => (
              <tr key={market.market_cap_rank}>
                <td data-label="#">
                  <p>{market.market_cap_rank}</p>
                </td>
                <td data-label="Coin">
                  <div className="coin_box">
                    <Link
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                      to={`/coins/${market.id}`}
                    >
                      <img
                        className="imgCoin"
                        src={market.image}
                        alt="{coin.image}"
                      />
                      <p style={{ color: "black", marginBottom: 0 }}>
                        {market.name}
                      </p>
                      <span className="text-center text-black ">
                        ({market.symbol})
                      </span>
                    </Link>
                  </div>
                </td>
                <td data-label="Price">
                  <p>
                    {market.current_price}-{`${symbol}`}
                  </p>
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
                      ? market.price_change_percentage_1h_in_currency.toFixed(2)
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
                      ? market.price_change_percentage_7d_in_currency.toFixed(2)
                      : "?"}
                    %
                  </p>
                </td>
                <td data-label="Volume" className="total_volume">
                  <p>
                    {market.total_volume}-{`${symbol}`}
                  </p>
                </td>
                <td data-label="Market Cap" className="market_cap">
                  <p>
                    {market.market_cap}-{`${symbol}`}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default MarketsDetails;
