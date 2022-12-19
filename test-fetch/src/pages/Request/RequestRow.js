import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestRow = ({ vs_currency, ids }) => {
  console.log(vs_currency);
  console.log(ids);
  const [coinInfo, setCoinInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=${ids}`
      )
      .then((response) => {
        setCoinInfo(response.data);
      });
  }, []);

  console.log(coinInfo);
  return (
    <>
      {coinInfo.map((c) => (
        <>
          <td>
            <img src={c.image} alt="" width="50px" className="me-3"/>
            <span>{c.name}</span>
          </td>
          <td>
            <p>{c.current_price}</p>
            <p>{vs_currency.toUpperCase()}</p>
          </td>
        </>
      ))}
    </>
  );
};

export default RequestRow;
