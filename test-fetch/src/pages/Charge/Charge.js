import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Charge.css";
const Charge = () => {
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
                    ></input>
                  </div>
                  <button
                    className="form-submit btn btn-outline-light btn-lg px-5"
                    type="submit"
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
