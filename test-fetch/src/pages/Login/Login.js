import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// import * as Request from "../../utils/request";
import Loading from "../loading/loading";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [Resdata, setResData] = useState(null);
  const url = "api/auth/login";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await axios
        .post(url, { email, password }, opts)
        .catch((err) => {
          if (err && err.response) console.log("Error", err);
        });
      setResData(res.data);
      navigate("/", { state: { data: Resdata } });
    } catch (error) {
      console.log("Error...");
      setIsError(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter your email"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter "
        ),
    }),
    onSubmit,
  });
  if (isError) {
    return <Loading />;
  }
  return (
    <>
      <section className="vh-100% gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
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
                  <div className="card-body p-3 text-center">
                    <div className="mb-md-3 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your email and password!
                      </p>

                      <div className="form-outline form-white mb-4">
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

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="password" className="form-lable">
                          Your password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className="form-control"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        ></input>
                        {formik.errors.password && (
                          <span className="error">
                            {formik.errors.password}*
                          </span>
                        )}
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <Link className="text-white-50" to="/forgot">
                          Forgot password?
                        </Link>
                      </p>

                      <button
                        className="form-submit btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg"></i>
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="mb-0">
                        Don't have an account?
                        <Link to="/signup" className="text-white-50 fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
