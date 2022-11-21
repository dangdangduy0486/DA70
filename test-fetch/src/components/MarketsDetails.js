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
                    {market.current_price}-{`${symbol}`}
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
                      ? market.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )
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
                    {(market.total_volume)}-{`${symbol}`}
                  </p>
                </td>
                <td className="market_cap">
                  <p>
                    {market.market_cap}-{`${symbol}`}
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
      </table>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-center" id="offcanvasRightLabel">
            Cart information
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {shopCartList.length === 0 ? (
            <>
              <p>Your cart is empty</p>
            </>
          ) : (
            <>
              <form>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Amout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shopCartList.map((cartItem, index) => (
                      <tr key={index}>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.price}</td>
                        <td className="number-input">
                          <input type="number"></input>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <div className="text-end fw-bold">Total:BTC</div>
                <Button className="btn btn-buy" variant="outline-warning">
                  Buy
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MarketsDetails;
