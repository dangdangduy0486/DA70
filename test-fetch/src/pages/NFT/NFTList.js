import axios from "axios";
import React, { useEffect, useState } from "react";
import NFT from "./NFT";

const NFTList = () => {
  const [nftList, setNftList] = useState([]);

  const titles = ["#", "NFT", "Price", "Price Change", "24h Volume"];

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/nfts/list?per_page=10&page=1")
      .then((response) => {
        setNftList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(nftList);
  return (
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
  );
};

export default NFTList;
