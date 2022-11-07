import { useEffect, useState } from "react";
import axios from "axios";
import MarketsDetails from "../components/MarketsDetails";
import NavBar from "../components/NavBar";

const Home = () => {
  const [markets, setMarkets] = useState(null);
  const url = "/api/markets";
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
  //   function ObjectLength(object) {
  //     var length = 0;
  //     for (var key in object) {
  //       if (object.hasOwnProperty(key)) {
  //         ++length;
  //       }
  //     }

  //     return length;
  //   }
  if (markets != null) {
    console.log(markets.length);
  }
  if (!markets) return null;
  return (
    <>
      <NavBar />
      <div>
        {markets &&
          markets.map((market) => (
            <MarketsDetails key={market.id} market={market} />
          ))}
      </div>
    </>
  );
};

export default Home;
