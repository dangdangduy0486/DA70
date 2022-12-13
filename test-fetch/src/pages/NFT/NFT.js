import axios from "axios";
import { useEffect, useState } from "react";

const NFT = ({ id, index }) => {
  const [nftInfo, setNftInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/nfts/${id}`)
      // .get(`https://api.coingecko.com/api/v3/nfts/cryptocoven`)
      .then((response) => {
        setNftInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log(nftInfo);
  return (
    <tr>
      <td className="text-muted">{index}</td>
      <td>
        <img
          src={nftInfo.image}
          alt=""
          className="img-fluid me-4"
          style={{ width: "3%" }}
        />
        <span>{nftInfo.name}</span>
        <span className="ms-3 text-muted">{nftInfo.symbol}</span>
      </td>

      <td>
        <p>{nftInfo.floor_price}</p>
      </td>

      <td className={nftInfo.volume_24h > 0 ? "text-success" : "text-danger"}>
        {nftInfo.volume_24h}
      </td>

      <td>
        {nftInfo.floor_price_in_usd_24h_percentage_change.toLocaleString()}
        {nftInfo.floor_price_in_usd_24h_percentage_change}
      </td>
      <td>{nftInfo.number_of_unique_addresses}</td>
      <td>{nftInfo.number_of_unique_addresses_24h_percentage_change}</td>
    </tr>
  );
};

export default NFT;
