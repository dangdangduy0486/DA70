import React, { useState } from "react";
import axios from "axios";

import NavBar from "../../components/NavBar/NavBar";
import "./Charge.css";
const Charge = () => {
  const [currencyID, setCurrencyId] = useState("usd");
  const [amount, setAmount] = useState(null);

  const handleOnChange = (event) => {
    setAmount(event.target.value);
  };
  const id = localStorage.getItem("id");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `api/wallet/recharge_request/${id}`;
      await axios
        .post(url, {
          requestType: "recharge",
          purchaseUnit: currencyID,
          sellUnit: "a",
          amount: amount,
          sender: "VCB",
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
      <section className="container_charge vh-100% gradient-custom">
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
      </section>
    </>
  );
};

export default Charge;
