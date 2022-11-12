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
     <section className="main">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <form onSubmit={handleSubmit} className="form" id="form_signup">
                <h3 className="heading text-center">Sign up</h3>
                <p className="infor">Welcome to DBcoin</p>
                <div className="spacer"></div>
                <div className="form-group">
                  <label htmlFor="fullname" className="form-lable">
                    Your name
                  </label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Enter your fullname"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.name || ""}
                  ></input>
                  <span className="text-danger">
                    {formErrors.nameError ? formErrors.nameError : ""}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-lable">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.email || ""}
                  ></input>
                  <span className="text-danger">
                    {formErrors.emailError ? formErrors.emailError : ""}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-lable">
                    Your password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.password || ""}
                  ></input>
                  <span className="text-danger">
                    {formErrors.passwordError ? formErrors.passwordError : ""}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password_confi" className="form-lable">
                    Renter your password
                  </label>
                  <input
                    id="password_confi"
                    name="password_confi"
                    type="password"
                    placeholder="Re-enter your password"
                    className="form-control"
                    onChange={handleChange}
                    value={formValues.repeatPassword || ""}
                  ></input>
                  <span className="text-danger">
                    {formErrors.repeatPasswordError
                      ? formErrors.repeatPasswordError
                      : ""}
                  </span>
                </div>
                <button className="form-submit" type="submit">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
