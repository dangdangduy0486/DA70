import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Overview.css";

const Overview = () => {
  const [walletAmout, setWalletAmount] = useState(null);
  const [assetChoose, setAssetChoose] = useState("bitcoin");
  const [assetChoose2, setAssetChoose2] = useState("BTC");
  const assets = [
    { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
    { id: "ethereum", name: "Ethereum", symbol: "eth" },
    { id: "binancecoin", name: "BNB", symbol: "bnb" },
  ];
  const [newwallet, setnewWallet] = useState([]);
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
  console.log(walletAmout.wallet);

  var map = walletAmout.wallet.reduce(function (map, invoice) {
    var name = invoice.currencyID;
    // var type = invoice.type;
    var amount1 = invoice.amount * 1;
    var price = +amount1;
    map[name] = (map[name] || 0) + price;
    return map;
  }, {});
  var array = Object.keys(map).map(function (name, type) {
    return {
      currencyID: name,
      amount: map[name],
    };
  });

  console.log(array);
  return (
    <>
      <section className="container_overview">
        <h1>
          Wallet <span>Overview</span>
        </h1>
        <div className="bg-light container_wallet p-3">
          <div className="container_estimate">
            <h5 className="p-3">Estimated Balance</h5>
            <div className="container_amount">
              <div className="container_select">
                <div className="me-2">0.00</div>
                <div>
                  <select
                    id="assetChoose"
                    name="assetChoose"
                    value={assetChoose}
                    onChange={(e) => {
                      const selectCoin = e.target.value;
                      setAssetChoose(selectCoin);
                      console.log(e.target.symbol);
                    }}
                  >
                    {assets.map((asset) => (
                      <option value={asset.id}>
                        {asset.symbol.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>= $000.000</div>
            </div>
          </div>
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
                  </tr>
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

export default Overview;
