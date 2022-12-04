import React from "react";
import "../Css/Futures.css";

const Futures = () => {
  return (
    <>
      <section className="container_futures">
        <h1>
          Wallet <span>Futures</span>
        </h1>
        <div className="bg-light container_futures_detail vh-100 p-3">
          <h5 className="p-3">Estimated Balance</h5>
          <div className="container_amount">
            <div className="container_select">
              <div className="me-2">0.00USDT</div>
            </div>
            <div>= $000.000</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Futures;
