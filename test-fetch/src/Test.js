import React from "react";
import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";

const Test = () => {
  return (
    <>
      <div className="contaier-fluid" style={{ backgroundColor: "red" }}>
        31fsdfdsf
        <p>dsfsdfs</p>
      </div>
      <div
        className="container-fluid"
        style={{ backgroundColor: "black", height: "100%" }}
      >
        <div
          className="container"
          style={{ backgroundColor: "white", height: "100%" }}
        >
          <div>
            <ul
              style={{
                listStyle: "none",
              }}
            >
              <span>Porfolio</span>
              <span>Coins</span>
              <span>New Coins</span>
              <span>Gainers & Losers</span>
              <span>Categories</span>
            </ul>
          </div>
          <div>
            <div>
              <h1>Cryptocurrency Prices by Market Cap</h1>
            </div>
            <div>
              <p>
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
                  style={{ textDecoration: "underline", color: "initial" }}
                >
                  Read more.
                </a>
                <p className="collapse" id="collapseExample">
                  Total cryptocurrency trading volume in the last day is at $60
                  Billion. Bitcoin dominance is at 38.4% and Ethereum dominance
                  is at 17%. CoinGecko is now tracking 12,961 cryptocurrencies.
                  The largest gainers in the industry right now are Stablecoins
                  and Tezos Ecosystem cryptocurrencies.
                </p>
              </p>
            </div>
          </div>
          <div>
            <button className="rounded-pill" height="30px" width="150px">
              All Categories
            </button>
          </div>
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Coin</th>
                  <th></th>
                  <th></th>
                  <th scope="col">Price</th>
                  <th scope="col">1h</th>
                  <th scope="col">24h</th>
                  <th scope="col">7d</th>
                  <th scope="col">24 Volume</th>
                  <th scope="col">Mkt Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td colspan="3">
                    <p>Bitcoin-------------- BTC</p>
                  </td>
                  <td>$16,730.24</td>
                  <td>0.2%</td>
                  <td>-4.1%</td>
                  <td>-2.4%</td>
                  <td>$27,845,849,842</td>
                  <td>$322,117,995,856</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
