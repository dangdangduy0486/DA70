import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/signup.css";

const Signup = () => {
  //

  function Valiue(options) {
    var selectorRules = {};
    //ham thuc hien validate
    function validate(inputElement, rule) {
      var errorMessage =
        inputElement.parentElement.querySelector(".form-message");
      var error;
      //lay ra cac rules cua selector (console.log ra check)
      var rules = selectorRules[rule.selector];
      //lap qua tung rule va kiem tra
      //neu co loi thi dung viec kiem tra
      for (var i = 0; i < rules.length; i++) {
        error = rules[i](inputElement.value);
        if (error) break;
      }
      if (error) {
        errorMessage.innerText = error;
        inputElement.parentElement.classList.add("invalid");
      } else {
        errorMessage.innerText = "";
        inputElement.parentElement.classList.remove("invalid");
      }
      return !error;
    }
    //get element of form
    var formValue = document.querySelector(options.form);
    if (formValue) {
      formValue.onsubmit = function (e) {
        e.preventDefault();

        var isFormValid = true;

        options.rulues.forEach(function (rule) {
          var inputElement = formValue.querySelector(rule.selector);
          var isValid = validate(inputElement, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });

        if (isFormValid) {
          if (typeof options.onSubmit === "function") {
            var formInput = formValue.querySelectorAll("[name]");
            var formVa = Array.from(formInput).reduce(function (values, input) {
              values[input.name] = input.value;
              return values;
            }, {});
            options.onSubmit(formVa);
          }
        }
      };

      //lap qua rules va excute
      options.rulues.forEach(function (rule) {
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } else {
          selectorRules[rule.selector] = [rule.test];
        }
        var inputElement = formValue.querySelector(rule.selector);
        if (inputElement) {
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };
          inputElement.oninput = function () {
            var errorMessage =
              inputElement.parentElement.querySelector(".form-message");
            errorMessage.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
          };
        }
      });
      console.log(selectorRules);
    }
  }
  Valiue.isRequired = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        return value.trim()
          ? undefined
          : message || "Please enter your information!";
      },
    };
  };
  Valiue.isEmail = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value)
          ? undefined
          : message || "Please enter your email";
      },
    };
  };
  Valiue.minLength = function (selector, min, message) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min
          ? undefined
          : message || ` Password must have more than ${min} characters.  `;
      },
    };
  };
  Valiue.checkPassword = function (selector, getPassword, message) {
    return {
      selector: selector,
      test: function (value) {
        return value === getPassword()
          ? undefined
          : message || "Value not same";
      },
    };
  };
  Valiue({
    form: "#form_signup",
    rulues: [
      Valiue.isRequired("#fullname", "Nhap ten di"),
      Valiue.isRequired("#email"),
      Valiue.isEmail("#email"),
      Valiue.isRequired("#password"),
      Valiue.minLength("#password", 8),
      Valiue.isRequired("#password_confi"),
      Valiue.checkPassword(
        "#password_confi",
        function () {
          return document.querySelector("#password").value;
        },
        "Mat khau khong chinh xac"
      ),
    ],
    onSubmit: function (data) {
      console.log(data);
      //call api
    },
  });

  return (
    <section className="main">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <form method="POST" className="form" id="form_signup">
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
                ></input>
                <span className="form-message"></span>
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
                ></input>
                <span className="form-message"></span>
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
                ></input>
                <span className="form-message"></span>
              </div>
              <div className="form-group">
                <label htmlFor="password_confi" className="form-lable">
                  Reenter your password
                </label>
                <input
                  id="password_confi"
                  name="password_confi"
                  type="password"
                  placeholder="Re-enter your password"
                  className="form-control"
                ></input>
                <span className="form-message "></span>
              </div>
              <button className="form-submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
