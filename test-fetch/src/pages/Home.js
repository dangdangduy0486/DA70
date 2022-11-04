import { useEffect, useState } from "react";
import axios from "axios";
import MarketsDetails from "../components/MarketsDetails"

const Home = () => {
  const [markets, setMarkets] = useState(null);
  const url =
    "/api/markets";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setMarkets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(markets);

  if (!markets) return null;
  return (
    <>
      {/* <div className="card">
        <div className="top">
          <img src={markets[0].image} alt="" />
        </div>
        <div>
          <h5>{markets[0].name}</h5>
          <p>${markets[0].current_price.toLocaleString()}</p>
        </div>

        {markets[0].price_change_percentage_24h < 0 ? (
          <span className="red">
            {markets[0].price_change_percentage_24h.toFixed(2)}%
          </span>
        ) : (
          <span className="green">
            {markets[0].price_change_percentage_24h.toFixed(2)}%
          </span>
        )}
      </div> */}
      <div>
        {markets &&
          markets.map((market) => (
            <MarketsDetails key={market.id} market={market}  />
          ))}
      </div>
    </>
  );
};

export default Home;
