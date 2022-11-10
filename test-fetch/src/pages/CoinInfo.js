import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "../Css/CoinInfo.css";
import NavBar from "../components/NavBar";

const CoinInfo = () => {
  const [coinInfo, setCoinInfo] = useState("");
  const { coinID } = useParams("");

  // const callback = (childData) => {
  //   setCoinID(coinID => coinID = childData)
  // }

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [coinID]);

  if (!coinInfo) return null;
  console.log(coinInfo);

  return (
    <>
      <NavBar />
      <Container fluid className="coindetail">
        <header className="pageinfo">
          <img src={coinInfo.image.large} alt="" />
          <h1>
            {coinInfo.name} ({coinInfo.symbol})
          </h1>
        </header>
        <div className="show-details">
          <div className="width">
            <h2>Details</h2>
            <div className="bd-black">
              <div className="show-detail">
                <h4> Market cap rank</h4>
                <span>{coinInfo.market_cap_rank}</span>
              </div>
              <div className="show-detail">
                <h4> 24h high</h4>
                <span>${coinInfo.market_data.high_24h.usd}</span>
              </div>
              <div className="show-detail">
                <h4> 24h low</h4>
                <span>${coinInfo.market_data.low_24h.usd}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CoinInfo;
