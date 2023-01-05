import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import getCurrencySymbol from "currency-symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "./CoinInfo.css";
import Footer from "../../components/Footer/Footer";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import Button from "react-bootstrap/esm/Button";
import HistoryChart from "../../components/HistoryChart/HistoryChart";
import useAuth from "../../hooks/useAuth";
import { getByTestId } from "@testing-library/react";

const CoinInfo = (props) => {
  const [coinInfo, setCoinInfo] = useState([]);
  const { coinID } = useParams("");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(1);
  const [currency1, setCurrency1] = useState("btc");
  const [currency2, setCurrency2] = useState("btc");
  const [vsCurrency, setVsCurrency] = useState("usd");

  const callback = async (childData) => {
    await setVsCurrency((vsCurrency) => (vsCurrency = childData));
  };

  const { email } = useAuth();

  useEffect(() => {
    let spotTotal = document.getElementById("spotTotal");
    setTotal(spotTotal.innerText);
  });

  const handleCreateSpotRequest = async () => {
    const url = `/api/user/request/${email}/spot`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    const res = await axios
      .post(
        url,
        {
          type: "buy",
          firstUnit: currency1,
          secondUnit: currency2,
          amount: amount,
          total: total,
          senderAddress: "DB Crypto",
          recieverAddress: email,
        },
        opts
      )
      .then((response) => {
        toast.success(response.data.message);
        // spotTotal.innerText = 0;
        // setAmount(0);
      })
      .catch((error) => {
        if (!email) {
          toast.error("Please Login");
          return;
        }
        toast.error(error.response.data.message);
      });
    return res.data;
  };

  const handleAmountChange = (event) => {
    if (!event.target.value === true) {
      setAmount(0);
    }
    setAmount(parseFloat(event.target.value));
  };

  // const req = async () => {
  //   const url = "/api/coins/";
  //   await axios
  //     .get(url, {
  //       params: {
  //         vs_currency: vsCurrency,
  //         ids: coinID,
  //       },
  //     })
  //     .then((response) => {
  //       setCoinInfo(response.data[0]);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // };

  const url = "/api/coins/";
  useEffect(() => {
    axios
      .get(url, {
        params: {
          vs_currency: vsCurrency,
          ids: coinID,
        },
      })
      .then((response) => {
        setCoinInfo(response.data[0]);
        setCurrency2(vsCurrency);
        setCurrency1(coinID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [vsCurrency, coinID]);
  if (!coinInfo) return <Loading />;

  return (
    <>
      <NavBar currencyFr={callback} vsCurrency={vsCurrency} />
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
                        <img src={coinInfo.image} alt=""></img>
                      </span>
                      <span>{coinInfo.name}</span>
                      <span>({vsCurrency.toUpperCase()})</span>
                    </div>
                    <div>
                      <div>
                        <div>
                          <span className="text-muted">{`${
                            getCurrencySymbol(vsCurrency)
                              ? getCurrencySymbol(vsCurrency)
                              : vsCurrency.toUpperCase()
                          } `}</span>
                          <span className="coin-info-price">
                            {coinInfo.current_price
                              ? coinInfo.current_price.toLocaleString()
                              : "?"}
                          </span>
                          <span
                            className={`${
                              coinInfo.market_cap_change_percentage_24h_in_currency >
                              0
                                ? "text-success"
                                : "text-danger"
                            } `}
                          >
                            {coinInfo.market_cap_change_percentage_24h_in_currency >
                            0 ? (
                              <FontAwesomeIcon icon={faArrowTrendUp} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowTrendDown} />
                            )}
                            {coinInfo.market_cap_change_percentage_24h_in_currency
                              ? coinInfo.market_cap_change_percentage_24h_in_currency.toFixed(
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
                                  ((coinInfo.current_price - coinInfo.low_24h) /
                                    (coinInfo.high_24h - coinInfo.low_24h)) *
                                  100
                                }%`,
                              }}
                              role="progressbar"
                              className="coin-info-progress"
                              aria-valuenow={coinInfo.current_price}
                              aria-valuemin={coinInfo.low_24h}
                              aria-valuemax={coinInfo.high_24h}
                            ></div>
                          </div>
                          <div className="progress_info">
                            <p>
                              <span className="text-muted">{`${
                                getCurrencySymbol(vsCurrency)
                                  ? getCurrencySymbol(vsCurrency)
                                  : vsCurrency.toUpperCase()
                              } `}</span>
                              {coinInfo.low_24h}
                            </p>
                            <p>24H</p>
                            <p>
                              <span className="text-muted">{`${
                                getCurrencySymbol(vsCurrency)
                                  ? getCurrencySymbol(vsCurrency)
                                  : vsCurrency.toUpperCase()
                              } `}</span>
                              {coinInfo.high_24h}
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
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {coinInfo.market_cap}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">24 Hour Trading Vol</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {coinInfo.total_volume
                        ? coinInfo.total_volume.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Fully Diluted Valuation</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {coinInfo.fully_diluted_valuation
                        ? coinInfo.fully_diluted_valuation.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Circulating Supply</span>
                    <span>
                      {coinInfo.circulating_supply
                        ? coinInfo.circulating_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Total Supply</span>
                    <span>
                      {coinInfo.total_supply
                        ? coinInfo.total_supply.toLocaleString()
                        : "?"}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Max Supply</span>
                    <span>
                      {coinInfo.max_supply
                        ? coinInfo.max_supply.toLocaleString()
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
                      // href={coinInfo.links.homepage[0]}
                    >
                      bitcoin.org
                    </a>

                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.links.homepage[0]}
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
                      // href={coinInfo.links.subreddit_url}
                    >
                      Reddit
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={`https://twitter.com/${coinInfo.links.twitter_screen_name}`}
                    >
                      Reddit
                    </a>
                    Twitter
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={`https://www.facebook.com/${coinInfo.links.facebook_username}`}
                    >
                      Facebook
                    </a>
                  </div>
                  <div>
                    <a
                      className="info_link"
                      type="button"
                      // href={coinInfo.links.official_forum_url}
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
            <div
              className="overview-convert mt-4 mb-4"
              style={{ backgroundColor: "white" }}
            >
              <div className="coin_trade text-warning">
                <h3>BUY NOW</h3>
                <div>
                  <span className="text-muted">Enter your amount: </span>
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      onChange={handleAmountChange}
                      class="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-muted fs-3">Your total: </span>
                  <span className="fs-3">
                    {`${
                      getCurrencySymbol(vsCurrency)
                        ? getCurrencySymbol(vsCurrency)
                        : vsCurrency.toUpperCase()
                    } `}
                  </span>
                  <span className="fs-3" id="spotTotal" name="spotTotal">
                    {coinInfo.current_price * amount
                      ? coinInfo.current_price * amount
                      : 0}
                  </span>
                </div>
                <Button
                  variant="outline-warning"
                  onClick={handleCreateSpotRequest}
                >
                  Buy
                </Button>
              </div>
            </div>
            <div className="overview-statistics">
              <h3>{vsCurrency.toUpperCase()} Price Statistics</h3>
              <div className="overview-statistics-list">
                <ul>
                  <li>
                    <span className="text-muted">{coinInfo.name}</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {coinInfo.current_price
                        ? coinInfo.current_price.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">24h Low / 24h High</span>
                    <span>
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {coinInfo.low_24h} /
                      {`${
                        getCurrencySymbol(vsCurrency)
                          ? getCurrencySymbol(vsCurrency)
                          : vsCurrency.toUpperCase()
                      } `}
                      {coinInfo.high_24h}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Market Cap Rank</span>
                    <span>{coinInfo.market_cap_rank}</span>
                  </li>
                  <li>
                    <span className="text-muted">Market Cap</span>
                    <span>
                      {coinInfo.market_cap
                        ? coinInfo.market_cap.toLocaleString()
                        : ""}
                    </span>
                  </li>
                  <li>
                    <span className="text-muted">Volume / Market Cap</span>
                    <span>
                      {(coinInfo.total_volume / coinInfo.market_cap).toFixed(4)}
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
              // dangerouslySetInnerHTML={{ __html: coinInfo.description.en }}
            ></p>
          </div>
        </Container>
        {/* <Container>
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
                    <td><span
                      className={`${
                        tik.trust_score === "green"
                          ? "text-success"
                          : tik.trust_score === "red"
                          ? "text-warning"
                          : "text-danger"
                      } rounded-pill`}
                      style={{ fontSize: "12px" }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                    </span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container> */}
      </section>
      <Footer />
    </>
  );
};

export default CoinInfo;
