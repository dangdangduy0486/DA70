import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Fiat.css";
const Fiat = () => {
  const [walletAmout, setWalletAmount] = useState(null);
  useEffect(() => {
    try {
      const id = localStorage.getItem("id");
      const url = `api/wallet/info/${id}`;
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
  console.log(walletAmout);
  var map = walletAmout.wallet.reduce(function (map, invoice) {
    var name = invoice.currencyID;
    var amount1 = invoice.amount * 1;
    var price = +amount1;
    map[name] = (map[name] || 0) + price;
    console.log(name);
    return map;
  }, {});
  var array = Object.keys(map).map(function (name) {
    return {
      currencyID: name,
      amount: map[name],
    };
  });
  return (
    <>
      <section className="container_fiat">
        <h1>
          Fiat and <span>Spot</span>
        </h1>
        <div className="bg-light container_spot p-3">
          <div className="container_myasset">
            <h5 className="p-3">My Assets</h5>
            <div className="myasset_details p-2">
              <div className="myasset_detail">
                <h6>Fiat and Spot</h6>
              </div>
              <div>
                <table className="w-100 text-center">
                  <tr>
                    <th>Currency</th>
                    <th>Amount</th>
                  </tr>{" "}
                  {array.map((w) => (
                    <tr>
                      <td>{w.currencyID.toUpperCase()}</td>
                      <td>{w.amount}</td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="myasset_detail">
                <h6>Funding</h6>
              </div>
              <div>
                <table className="w-100 text-center">
                  <tr>
                    <th>Currency</th>
                    <th>Amount</th>
                  </tr>{" "}
                  {array.map((w) => (
                    <tr>
                      <td>{w.currencyID.toUpperCase()}</td>
                      <td>{w.amount}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Fiat;
