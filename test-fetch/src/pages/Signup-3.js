import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/signup.css";

const Signup = () => {
  const history = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  const errorValues = {
    nameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
  };
  const [formValues, setFormValues] = useState({ initialValues });
  const [formErrors, setFormErrors] = useState({ errorValues });

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    isRequired([e.target.name]);
  };

  const url = "api/user/signup";

  const signUpRequest = async () => {
    const res = await axios
      .post(url, {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      })
      .catch((error) => {
        console.log(error);
      });
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log(isValid);

    if (isValid) {
      signUpRequest().then(() => history("/login"));
    }
    resetState();
  };
  const isRequired = (selector, message) => {
    return {
      selector: selector,
      test: function (value) {
        return value.trim()
          ? undefined
          : message || "Please enter your information!";
      },
    };
  };
  //Validation
  const validateForm = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let repeatPasswordError = "";

    if (!formValues.name) {
      nameError = "Enter your name";
    }

    if (!formValues.email) {
      emailError = "Enter your email";
    }

    if (!formValues.repeatPassword) {
      repeatPasswordError = "Enter your password";
    }

    if (!formValues.password) {
      passwordError = "Enter your password";
    }

    if (formValues.password !== formValues.repeatPassword) {
      repeatPasswordError = "Enter your password";
    }

    if (nameError || emailError || passwordError || repeatPasswordError) {
      setFormErrors({
        nameError,
        emailError,
        passwordError,
        repeatPasswordError,
      });
      return false;
    }
    return true;
  };

  const resetState = () => {
    setFormValues({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <>
      <section
        className="vh-100% bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          value={formValues.name || ""}
                          name="name"
                        />

                        <label className="form-label" htmlFor="form3Example1cg">
                          Your Name
                        </label>
                        <span className="text-danger">
                          {formErrors.nameError ? formErrors.nameError : ""}
                        </span>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          value={formValues.email || ""}
                          name="email"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>
                      <span className="text-danger">
                        {formErrors.emailError ? formErrors.emailError : ""}
                      </span>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          value={formValues.password || ""}
                          name="password"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>
                      <span className="text-danger">
                        {formErrors.passwordError
                          ? formErrors.passwordError
                          : ""}
                      </span>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          onChange={handleChange}
                          value={formValues.repeatPassword || ""}
                          name="repeatPassword"
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example4cdg"
                        >
                          Repeat your password
                        </label>
                      </div>
                      <span className="text-danger">
                        {formErrors.repeatPasswordError
                          ? formErrors.repeatPasswordError
                          : ""}
                      </span>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?
                        <a href="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
