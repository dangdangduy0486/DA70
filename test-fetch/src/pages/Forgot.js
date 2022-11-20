import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/forgot.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Forgot = () => {
  const history = useNavigate();
  const url = "api/user/forgot-password";

  const onSubmit = async (values) => {
    const { email } = values;
    try {
      await axios
        .post(url, { email })
        .then(() => history("/login"))
        .catch((err) => {
          if (err && err.response) console.log("Error", err);
        });
    } catch (error) {
      console.log("Error...");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter your email"
        ),
    }),
    onSubmit,
  });

  return (
    <section className="vh-100% gradient-custom">
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
                onSubmit={formik.handleSubmit}
              >
                <h3 className="heading text-center">Forgot password</h3>
                <p className="infor">Welcome to DBcoin</p>
                <div className="form-group">
                  <label htmlFor="email" className="form-lable">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  ></input>
                </div>
                <button
                  className="form-submit btn btn-outline-light btn-lg px-5"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
