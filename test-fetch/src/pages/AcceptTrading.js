import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../Css/AcceptTrading.css";
const AcceptTrading = () => {
  return (
    <>
      <NavBar />
      <section className="container_accepttrading">
        <h3 className="text-center p-3">
          Sell <span>USDT</span>
        </h3>
        <form className="container_formaccept">
          <div className="container_form">
            <h5 className="text-center">Confirm transaction information</h5>
            <div className="infor_transaction">
              <div className="name_transaction">
                <div>Name :</div>
                <div>Minh Bao</div>
              </div>
              <div className="price_transasction">
                <div>Price :</div>
                <div>10.000</div>
              </div>
              <div className="currency_transasction">
                <div>Currency</div>
                <div>USDT</div>
              </div>
              <div className="amount_transasction">
                <div>Amount</div>
                <div>10</div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default AcceptTrading;
