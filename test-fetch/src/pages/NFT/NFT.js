import axios from "axios";
import { useEffect, useState } from "react";

const NFT = ({ id, index }) => {
  const [nftInfo, setNftInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/nfts/${id}`)
      .then((response) => {
        setNftInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  if (!nftInfo) return null;
  return (
    // <></>
    <tr>
      <td className="text-muted">{index}</td>
      <td>
        <img
          src={nftInfo.image.small}
          alt=""
          className="img-fluid me-4"
          style={{ width: "3%" }}
        />
        <span>{nftInfo.name}</span>
      </td>

      <td>
        <p>{nftInfo.floor_price.native_currency}</p>
      </td>

      <td
        className={
          nftInfo.floor_price_in_usd_24h_percentage_change > 0
            ? "text-success"
            : "text-danger"
        }
      >
        {/* {nftInfo.floor_price_in_usd_24h_percentage_change.toLocaleString()} */}
        {nftInfo.floor_price_in_usd_24h_percentage_change.toFixed(2)}%
      </td>
      <td>{nftInfo.market_cap.native_currency}</td>
      <td>{nftInfo.volume_24h.native_currency}</td>
      <td>{nftInfo.number_of_unique_addresses}</td>
      <td
        className={
          nftInfo.number_of_unique_addresses_24h_percentage_change > 0
            ? "text-success"
            : "text-danger"
        }
      >
        {nftInfo.number_of_unique_addresses_24h_percentage_change.toFixed(2)}%
      </td>
    </tr>
  );
};

export default NFT;
