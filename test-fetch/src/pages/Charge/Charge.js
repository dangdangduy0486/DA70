import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import "./Charge.css";

const Charge = () => {
  const [walletChoose, setWalletChoose] = useState("Fiat and spot");
  const [currency, setCurrency] = useState([]);
  const [currencyID, setCurrencyId] = useState("vnd");
  const [amount, setAmount] = useState(null);
  const walletOption = ["Fiat and spot", "Futures", "Funding"];
  const currencyOption = ["USD", "VND", "YPN", "EUR"];

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/exchange_rates`)
      .then((response) => {
        setCurrency(response.data.rates);
      });
  }, []);
  console.log(currency);
  const handleOnChange = (event) => {
    setAmount(event.target.value);
  };
  const id = localStorage.getItem("id");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `api/wallet/request/${id}`;
      await axios
        .post(url, {
          requestType: "recharge",
          purchaseUnit: currencyID,
          sellUnit: "a",
          amount: amount,
          sender: "VCB",
          walletType: walletChoose,
        })
        .then(() => {
          console.log("success~");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <NavBar />
      {/* <section className="container_charge vh-100% gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <form
                  className="form bg-dark text-center "
                  id="form_signup"
                  // onSubmit={formik.handleSubmit}
                  onSubmit={() => handleSubmit()}
                >
                  <h3 className="heading text-center">Charge Money</h3>
                  <p className="infor">Welcome to DBcoin</p>
                  <div className="form-group">
                    <label htmlFor="money" className="form-lable">
                      Your money
                    </label>
                    <input
                      id="money"
                      name="money"
                      type="number"
                      placeholder="Enter your money"
                      className="form-control"
                      onChange={handleOnChange}
                    ></input>
                  </div>
                  <button
                    className="form-submit btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Charge
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="container_charge">
        <div className="container_chargeform">
          <h4 className="text-center pe-1">Deposit</h4>
          <form className="form_charge" onSubmit={() => handleSubmit()}>
            <div className="chargeform_group">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={handleOnChange}
              ></input>
            </div>
            <div className="chargeform_group">
              <label htmlFor="amount">Your amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter your amount"
                onChange={handleOnChange}
              ></input>
            </div>
            <div className="chargeform_group">
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency">
                <option>USD</option>
              </select>
            </div>
            <div className="chargeform_group">
              <label htmlFor="wallet_option">Wallet</label>
              <select
                id="wallet_option"
                name="wallet_option"
                value={walletChoose}
                onChange={(e) => {
                  const selectWallet = e.target.value;
                  setWalletChoose(selectWallet);
                }}
              >
                {walletOption.map((w) => (
                  <option value={w}>{w}</option>
                ))}
              </select>
            </div>
            <div className="chargeform_group">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn_recharge"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Charge;
