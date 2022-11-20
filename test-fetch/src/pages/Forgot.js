import React from "react";
import "../Css/forgot.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const Forgot = () => {
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
    onSubmit: (values) => {
      console.log(values);
    },
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
                  {formik.errors.email && (
                    <span className="error">{formik.errors.email}*</span>
                  )}
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