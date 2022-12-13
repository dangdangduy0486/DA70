import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";

const Exchanges = () => {
  const [exchangesData, setExchangesData] = useState([]);
  const [exchangeData, setExchangeData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1")
      .then((response) => {
        setExchangesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  // exchangesData.map((ex) =>
  //   axios
  //     .get(`https://api.coingecko.com/api/v3/exchanges/${ex.id}`)
  //     .then((response) => {
  //       setExchangeData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // );
  // }, [exchangesData]);
  // console.log(exchangeData);

  if (!exchangesData) return <Loading />;
  console.log(exchangesData);
  return (
    <>
      <NavBar />
      <table className="table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Exchanges</th>
            <th scope="col">Trust Score</th>
            <th scope="col">24h Volume (Normalized)</th>
            <th scope="col">24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {exchangesData &&
            exchangesData.map((exchange) => (
              <>
                <tr key={exchange.id}>
                  <td>{exchange.trust_score_rank}</td>
                  <td>
                    <span>
                      <img src={exchange.image} alt="" />
                    </span>
                    <span>{exchange.name}</span>
                  </td>
                  <td>
                    {exchange.trust_score ? (
                      <div className="progress">
                        <div
                          className={`${
                            exchange.trust_score >= 5
                              ? "progress-bar bg-success"
                              : "progress-bar bg-warning"
                          }`}
                          style={{ width: `${exchange.trust_score * 10}%` }}
                          role="progressbar"
                          aria-valuenow={exchange.trust_score}
                          aria-valuemin="0"
                          aria-valuemax="10"
                        >
                          {exchange.trust_score}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>NaN</p>
                      </div>
                    )}
                  </td>
                  <td>
                    <div>
                      {exchange.trade_volume_24h_btc_normalized
                        ? exchange.trade_volume_24h_btc_normalized.toFixed(2)
                        : "?"}
                      <div>USD</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {exchange.trade_volume_24h_btc
                        ? exchange.trade_volume_24h_btc.toFixed(2)
                        : "?"}
                    </div>
                    <div>USD</div>
                  </td>
                  <td></td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Exchanges;
