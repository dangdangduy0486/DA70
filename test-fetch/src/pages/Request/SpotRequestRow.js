import React, { useEffect, useState } from "react";
import axios from "axios";
import getCurrencySymbol from "currency-symbols";

const RequestRow = ({ vs_currency, ids }) => {
  // console.log(vs_currency);
  // console.log(ids);
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

  // console.log(coinInfo);
  return (
    <>
      {coinInfo.map((c) => (
        <>
          <td>
            <img src={c.image} alt="" width="30px" className="me-3" />
            <span>{c.name}</span>
          </td>
          <td>
            <td>
              <span className="text-muted">{`${
                getCurrencySymbol(vs_currency)
                  ? getCurrencySymbol(vs_currency)
                  : "?"
              } `}</span>
              <span>
                {c.current_price ? c.current_price.toLocaleString() : "?"}
              </span>
            </td>
          </td>
        </>
      ))}
    </>
  );
};

export default RequestRow;
