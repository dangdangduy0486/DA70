import React from "react";
import { useState } from "react";
import "../Css/Overview.css";

const Overview = () => {
  const [assetChoose, setAssetChoose] = useState("bitcoin");
  const [assetChoose2, setAssetChoose2] = useState("BTC");
  const assets = [
    { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
    { id: "ethereum", name: "Ethereum", symbol: "eth" },
    { id: "binancecoin", name: "BNB", symbol: "bnb" },
  ];

  return (
    <>
      <section className="container_overview">
        <h1>
          Wallet <span>Overview</span>
        </h1>
        <div className="bg-light container_wallet vh-100 p-3">
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
            <div className="myasset_details">
              <div className="myasset_detail">
                <div>Fiat and Spot</div>
                <div>0000.0BTC</div>
              </div>
              <div className="myasset_detail">
                <div>Funding</div>
                <div>0000.0BTC</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
