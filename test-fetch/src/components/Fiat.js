import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Css/Fiat.css";
const Fiat = () => {
  const [walletAmout, setWalletAmount] = useState(null);
  useEffect(() => {
    try {
      const id = localStorage.getItem("id");
      const url = `api/wallet/get_wallet/${id}`;
      axios
        .get(url)
        .then((response) => {
          setWalletAmount(response.data);
        })
        .catch((error) => {
          console.log("errorrr");
        });
    } catch (error) {
      console.log("error");
    }
  }, []);
  if (!walletAmout) return null;

  return (
    <>
      <section className="container_fiat">
        <h1>
          Fiat and <span>Spot</span>
        </h1>
        <div className="bg-light container_spot vh-100 p-3">
          {walletAmout.wallet &&
            walletAmout.wallet.map((w) => (
              <ul style={{ listStyleType: "disc" }}>
                <li>{w.currencyID}</li>
                <li>{w.amount}</li>
                <li>{w.status}</li>
              </ul>
            ))}
        </div>
      </section>
    </>
  );
};

export default Fiat;
