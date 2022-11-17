import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../Css/markestDetails.css";

const MarketsDetails = ({ markets, symbol }) => {
  const handleClick = (value) => {
    const url = "api/cart";
    axios({
      method: "post",
      url: url,
      data: {
        name: value.name,
        price: value.current_price,
        amount: "1",
        total: 0,
      },
    });
  };

  return (
    <table className="table table-hover markets">
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
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {markets &&
          markets.map((market) => (
            <tr key={market.market_cap_rank}>
              <th>
                <p>{market.market_cap_rank}</p>
              </th>
              <td>
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
              <td>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: `${symbol}`,
                  }).format(market.current_price)}
                </p>
              </td>
              <td>
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
              <td>
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
                    ? market.price_change_percentage_24h_in_currency.toFixed(2)
                    : "?"}
                  %
                </p>
              </td>
              <td>
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
              <td className="total_volume">
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: `${symbol}`,
                  }).format(market.total_volume)}
                </p>
              </td>
              <td className="market_cap">
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: `${symbol}`,
                  }).format(market.market_cap)}
                </p>
              </td>
              <td className="contact">
                <Link>
                  <Button
                    className="buy"
                    onClick={() => handleClick(market)}
                    value={market}
                  >
                    Buy
                  </Button>
                </Link>
                <Link to={`/coins/${market.id}`}>
                  <Button className="view">View</Button>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
      {/* <button
                  type="button"
                  className="btn btn-primary buy"
                  onClick={() => handleClick(market)}
                  value={market}
                >
                  Buy
                </button> */}
    </table>
  );
};

export default MarketsDetails;
