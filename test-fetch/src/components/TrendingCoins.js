import axios from "axios";
import { useState, useEffect } from "react";
const TrendingCoins = () => {
  const [trendCoins, setTrendingCoins] = useState(null);
  const url = "api/trending";//3000/api/trending // api

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
  console.log(trendCoins.coins)

  return (
    <>
      <div className="container">
        <div className="row">
          {
            trendCoins.coins &&
                trendCoins.coins.map((trendCoin) => (
                    <div className="col">
                        <img src={trendCoin.item.thumb} alt="" />
                        {trendCoin.item.name} - {trendCoin.item.symbol} 
                        <div>{trendCoin.item.price_btc.toFixed(4)}</div>
                    </div>
                ))
          }
        </div>
      </div>
    </>
  );
};

export default TrendingCoins;
