import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import getCurrencySymbol from "currency-symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

import "./CoinInfo.css";
import Footer from "../../components/Footer/Footer";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import Button from "react-bootstrap/esm/Button";
import HistoryChart from "../../components/HistoryChart/HistoryChart";
import useAuth from "../../hooks/useAuth";

const CoinInfo = () => {
  const [coinInfo, setCoinInfo] = useState("");
  const { coinID } = useParams("");
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("btc");
  const [currency2, setCurrency2] = useState("btc");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/exchange_rates`)
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  function numberFormat(number) {
    return number.toFixed(6);
  }
  function handleAmount1Change(amount1) {
    setAmount2(
      numberFormat((amount1 * rates[currency2].value) / rates[currency1].value)
    );
    setAmount1(amount1);

    console.log(amount1);
    console.log(amount2);
    console.log(currency1);
    console.log(currency2);
  }
  function handleCurrency1Change(currency1) {
    setAmount2(
      numberFormat((amount1 * rates[currency2].value) / rates[currency1].value)
    );
    setCurrency1(currency1);
  }

  const { email } = useAuth();
  console.log(email);

  const handleCreateSpotRequest = () => {
    const url = `/api/user/request/${email}/spot`;
    const token = localStorage.getItem("token");
    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    const res = axios
      .post(
        url,
        {
          type: "buy",
          firstUnit: currency2,
          secondUnit: currency1,
          amount: amount2,
          total: amount1,
          senderAddress: "",
          recieverAddress: email,
        },
        opts
      )
      .then(() => {
        alert("Buy coin successfull!!!");
      });
    return res.data;
  };
  const symbol = "eth";

  const url = "/api/coins/";
  useEffect(() => {
    axios
      .get(url, {
        params: {
          id: coinID,
        },
      })
      .then((response) => {
        setCoinInfo(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [coinID]);

  if (!coinInfo || isError || isLoading) return <Loading />;

  return (
    <>
      <NavBar />
      <section className="coininfor">
        <Container className="coin_info">
          <div className="row coin_info_main">
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <div>
                    <div id="coin-info-rank">
                      <p>#Rank {coinInfo.market_cap_rank}</p>
                    </div>
                    <div id="coin-info-name">
                      <span>
                        <img src={coinInfo.image.small} alt=""></img>
                      </span>
                      <span>{coinInfo.name}</span>
                      <span>({coinInfo.symbol.toUpperCase()})</span>
                    </div>
                    <div>
                      <div>
                        <div>
                          <span className="text-muted">{`${
                            getCurrencySymbol(symbol)
                              ? getCurrencySymbol(symbol)
                              : symbol.toUpperCase()
                          } `}</span>
                          <span className="coin-info-price">
                            {coinInfo.market_data.current_price.eth}
                          </span>
                          <span
                            className={`${
                              coinInfo.market_data
                                .market_cap_change_percentage_24h_in_currency
                                .eth > 0
                                ? "text-success"
                                : "text-danger"
                            } `}
                          >
                            {coinInfo.market_data
                              .market_cap_change_percentage_24h_in_currency
                              .eth > 0 ? (
                              <FontAwesomeIcon icon={faArrowTrendUp} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowTrendDown} />
                            )}
                            {coinInfo.market_data
                              .market_cap_change_percentage_24h_in_currency.eth
                              ? coinInfo.market_data.market_cap_change_percentage_24h_in_currency.eth.toFixed(
                                  2
                                )
                              : "?"}
                            %
                          </span>
                        </div>
                        <div>
                          <div className="progress">
                            <div
                              // className={`${
                              //   coinInfo.trust_score >= 5
                              //     ? "progress-bar bg-success"
                              //     : "progress-bar bg-warning"
                              // }`}
                              style={{
                                width: `${
                                  ((coinInfo.market_data.current_price.eth -
                                    coinInfo.market_data.low_24h.eth) /
                                    (coinInfo.market_data.high_24h.eth -
                                      coinInfo.market_data.low_24h.eth)) *
                                  100
                                }%`,
                              }}
                              role="progressbar"
                              className="coin-info-progress"
                              aria-valuenow={
                                coinInfo.market_data.current_price.eth
                              }
                              aria-valuemin={coinInfo.market_data.low_24h.eth}
                              aria-valuemax={coinInfo.market_data.high_24h.eth}
                            ></div>
                          </div>
                          <div className="progress_info">
                            <p>
                              <span className="text-muted">{`${
                                getCurrencySymbol(symbol)
                                  ? getCurrencySymbol(symbol)
                                  : symbol.toUpperCase()
                              } `}</span>
                              {coinInfo.market_data.low_24h.eth}
                            </p>
                            <p>24H</p>
                            <p>
                              <span className="text-muted">{`${
                                getCurrencySymbol(symbol)
                                  ? getCurrencySymbol(symbol)
                                  : symbol.toUpperCase()
                              } `}</span>
                              {coinInfo.market_data.high_24h.eth}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <div className="list-coin-info-2-col">
                <ul className="col">
                  <li>
                    <span className="text-muted">Market Cap</span>
                    <span>
                      {`${
                        getCurrencySymbol(symbol)
                          ? getCurrencySymbol(symbol)
                          : symbol.toUpperCase()
                      } `}
                      {coinInfo.market_data.market_cap.eth}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">24 Hour Trading Vol</span>
                    <span>
                      {`${
                        getCurrencySymbol(symbol)
                          ? getCurrencySymbol(symbol)
                          : symbol.toUpperCase()
                      } `}
                      {coinInfo.market_data.total_volume.eth}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Fully Diluted Valuation</span>
                    <span>
                      {`${
                        getCurrencySymbol(symbol)
                          ? getCurrencySymbol(symbol)
                          : symbol.toUpperCase()
                      } `}
                      {coinInfo.market_data.fully_diluted_valuation.eth}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Circulating Supply</span>
                    <span>
                      {coinInfo.market_data.circulating_supply
                        ? coinInfo.market_data.circulating_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Total Supply</span>
                    <span>
                      {coinInfo.market_data.total_supply
                        ? coinInfo.market_data.total_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Max Supply</span>
                    <span>
                      {coinInfo.market_data.max_supply
                        ? coinInfo.market_data.max_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <h6>Info</h6>
              <div className="row">
                <div className="col">Website</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href={coinInfo.links.homepage[0]}
                    >
                      bitcoin.org
                    </a>

                    <a
                      className="info_link"
                      type="button"
                      href={coinInfo.links.homepage[0]}
                    >
                      Whitepaper
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">Explorers</div>
                <div className="col">
                  <a
                    className="info_link"
                    type="button"
                    // href={coinInfo.links.blockchain_site}
                  >
                    Blockchair
                  </a>
                </div>
                {/* coinInfo.links.blockchair_site[0] */}
              </div>
              <div className="row">
                <div className="col">Wallet</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://www.ledger.com/"
                    >
                      Ledger
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://trezor.io/"
                    >
                      Trezor
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://electrum.org/#home"
                    >
                      Electrum
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://www.xdefi.io/"
                    >
                      Xdefi
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href="https://www.safepal.com/"
                    >
                      SafePal
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">Community</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href={coinInfo.links.subreddit_url}
                    >
                      Reddit
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href={`https://twitter.com/${coinInfo.links.twitter_screen_name}`}
                    >
                      Reddit
                    </a>
                    Twitter
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href={`https://www.facebook.com/${coinInfo.links.facebook_username}`}
                    >
                      Facebook
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      href={coinInfo.links.official_forum_url}
                    >
                      bitcointalk.org
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">Search on</div>
                <div className="col">
                  <div>Twitter</div>
                  {/* https://twitter.com/search?q=$btc */}
                </div>
              </div>
              <div className="row">
                <div className="col">Source Code</div>
                <div className="col">
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.repos_url.github[0]}
                    >
                      Github
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">API id</div>
                <div className="col">
                  <div>bitcoin</div>
                  {/* bitcoin */}
                </div>
              </div>
              <div className="row">
                <div className="col">Tag</div>
                <div className="col">
                  <div>Cryptocurrency</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className=" history-chart overview row">
          <div className="overview-chart col-8">
            <HistoryChart coinID={coinID} />
          </div>
          <div className="col">
            <div className="overview-convert">
              <div className="coin_trade">
                <h2>Convert Coin</h2>
                <h5>From</h5>
                <CurrencyInput
                  onAmountChange={handleAmount1Change}
                  onCurrencyChange={handleCurrency1Change}
                  currencies={Object.keys(rates)}
                  amount={amount1}
                  currency={currency1}
                  className="currencyInput"
                />
                <h5>To</h5>
                <CurrencyInput
                  onAmountChange={setAmount2}
                  onCurrencyChange={setCurrency2}
                  currencies={Object.keys(rates)}
                  amount={amount2}
                  currency={currency2}
                  className="currencyInput"
                />
                <Button
                  variant="outline-warning"
                  onClick={handleCreateSpotRequest}
                >
                  Buy
                </Button>
              </div>
            </div>
            <div className="overview-statistics">
              <h3>{coinInfo.symbol.toUpperCase()} Price Statistics</h3>
              <div className="overview-statistics-list">
                <ul>
                  <li>
                    <span className="text-muted">{coinInfo.name}</span>
                    <span>
                      {`${
                        getCurrencySymbol(symbol)
                          ? getCurrencySymbol(symbol)
                          : symbol.toUpperCase()
                      } `}
                      {coinInfo.market_data.current_price.eth}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">24h Low / 24h High</span>
                    <span>
                      {`${
                        getCurrencySymbol(symbol)
                          ? getCurrencySymbol(symbol)
                          : symbol.toUpperCase()
                      } `}
                      {coinInfo.market_data.low_24h.eth} /
                      {`${
                        getCurrencySymbol(symbol)
                          ? getCurrencySymbol(symbol)
                          : symbol.toUpperCase()
                      } `}
                      {coinInfo.market_data.high_24h.eth}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Market Cap Rank</span>
                    <span>{coinInfo.market_cap_rank}</span>
                  </li>
                  <li>
                    <span className="text-muted">Market Cap</span>
                    <span>{coinInfo.market_data.market_cap.eth}</span>
                  </li>
                  <li>
                    <span className="text-muted">Volume / Market Cap</span>
                    <span>
                      {(
                        coinInfo.market_data.total_volume.eth /
                        coinInfo.market_data.market_cap.eth
                      ).toFixed(4)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Container fluid className="coindetail">
          <div className="">
            <h3 className="text-center">
              What is <span>{coinInfo.name}</span> ?
            </h3>
            <p
              className="text-gray-500 [&>a]:text-blue-600 [&>a]:underline"
              dangerouslySetInnerHTML={{ __html: coinInfo.description.en }}
            ></p>
          </div>
        </Container>
        <Container>
          <div>
            <h5>{coinInfo.name} Markets</h5>
          </div>
          <div>
            <table
              class="table table-hover"
              style={{ width: "100%", backgroundColor: "white" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Exchange</th>
                  <th scope="col">Pair</th>
                  <th scope="col">Price</th>
                  <th scope="col">Spread</th>
                  <th scope="col">Volume %</th>
                  <th scope="col">Last Traded</th>
                  <th scope="col">Trust Score</th>
                </tr>
              </thead>
              <tbody>
                {coinInfo.tickers.map((tik, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{tik.market.name}</td>
                    <td>
                      {tik.base} / {tik.target}
                    </td>
                    <td>{tik.volume.toLocaleString()}</td>
                    <td>{tik.bid_ask_spread_percentage.toFixed(2)}</td>
                    <td>{(tik.last / 1000).toFixed(2)} %</td>
                    <td>Recently</td>
                    <td>{tik.trust_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default CoinInfo;
