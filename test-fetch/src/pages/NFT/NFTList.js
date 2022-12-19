import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import NFT from "./NFT";

const NFTList = () => {
  const [nftList, setNftList] = useState([]);

  const titles = [
    "#",
    "NFT",
    "Floor Price",
    "24h",
    "Market Cap",
    "24h Volume",
    "Owners",
    "24h Owners",
  ];

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/nfts/list?per_page=100&page=1")
      .then((response) => {
        setNftList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!nftList) return <Loading />;
  return (
    <>
      <NavBar />
      <div>
        <table className="table table-dark mt-4 table-hover">
          <thead>
            <tr>
              {titles.map((title, i) => (
                <td key={i}>{title}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {filteredCoins.map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index + 1} />
          ))} */}
            {nftList.map((nft, index) => (
              <NFT key={nft.id} id={nft.id} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NFTList;
