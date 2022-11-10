import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Css/trendingCoins.css";

const TrendingCoins = () => {
  const [trendCoins, setTrendingCoins] = useState(null);
  const url = "api/trending";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTrendingCoins(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!trendCoins) return null;
  console.log(trendCoins.coins);
  //hello

  return (
    <>
      <div className="container trend">
        {/* <div className="row">
          {trendCoins.coins &&
            trendCoins.coins.map((trendCoin) => (
              <div className="col trendcoin">
                <img src={trendCoin.item.thumb} alt="" />
                {trendCoin.item.name} - {trendCoin.item.symbol}
                <div>{trendCoin.item.price_btc.toFixed(4)}</div>
              </div>
            ))}
        </div> */}
        <div className="cover_mid cover-gird">
          {trendCoins.coins &&
            trendCoins.coins.map((coin) => (
              <div className="girds">
                <div className="gird_top">
                  <img src={coin.item.thumb} alt="coin" />
                  <div className="gird_first-head">
                    <h2>{coin.item.name}</h2>
                  </div>
                  <div
                    className={`${
                      coin.item.market_cap_rank < 50
                        ? "text-success"
                        : "text-danger"
                    }  "gird_first-head"`}
                  >
                    <p>
                      Rank-{Math.round(coin.item.market_cap_rank)}
                    </p>
                  </div>
                </div>
                <div className="gird_mid">
                  <h1>
                    {coin.item.price_btc.toFixed(8)}
                  </h1>
                  <Link className="move" to={`/coins/${coin.item.id}`}>
                    <FontAwesomeIcon icon={faCircleRight} />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TrendingCoins;
