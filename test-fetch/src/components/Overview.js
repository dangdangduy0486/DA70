import React from "react";
import "../Css/Overview.css";
const Overview = () => {
  return (
    <>
      <section className="container_overview">
        <h1>
          Wallet <span>Overview</span>
        </h1>
        <div className="bg-light container_wallet vh-100 p-3">
          <div className="container_estimate">
            <h5>Estimated Balance</h5>
            <div className="container_amount">
              <div className="container_select">
                <div className="me-2">0.0UDS</div>
                <div>
                  <select>
                    <option value="hi">hi</option>
                  </select>
                </div>
              </div>
              <div>$000.000</div>
            </div>
          </div>
          <div className="container_myasset">
            <h5 className="text-center">My Assets</h5>
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
