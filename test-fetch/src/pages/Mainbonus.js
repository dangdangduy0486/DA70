import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../Css/Mainbonus.css";
import Loading from "./loading/loading";
const Mainbonus = () => {
  const [trendCoins, setTrendingCoins] = useState(null);
  const url = "api/trending";
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTrendingCoins(res.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);
  if (!trendCoins || isError) return <Loading />;
  // var arrayTrend = [];
  // for (var i = 0; i < 4; i++) {
  //   arrayTrend.push(trendCoins[i]);
  // }
  // console.log(arrayTrend);
  // if (!arrayTrend || isError) return <Loading />;
  return (
    <>
      <div className="cover">
        <div className="cover_top">
          <h1>Future of</h1>
          <h1>The World</h1>
          <p>
            Making money is art and working is art and good business is the best
            art.
          </p>
          <Link className="regis-button" to="/signup">
            Register Now
          </Link>
        </div>
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
                    <p>Rank-{Math.round(coin.item.market_cap_rank)}</p>
                  </div>
                </div>
                <div className="gird_mid">
                  <h1>{coin.item.price_btc.toFixed(8)}</h1>
                  <Link className="move" to={`/coins/${coin.item.id}`}>
                    <FontAwesomeIcon icon={faCircleRight} />
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="cover_bottom">
          <div className="container_bottom">
            <div className="bottom_left"></div>
            <div className="bottom_right">
              <h5>Big results require big ambitions.</h5>
              <h2>Cryptocurrency</h2>
              <p>
                Each success only buys an admission ticket to a more difficult
                problem.
              </p>
              <button>Details</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainbonus;
