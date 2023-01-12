import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../Loading/Loading";
import { useGetCoinsExchangeRatesQuery } from "../../features/coins/coinsApiSlice";
import "./Funding.css";
import useAuth from "../../hooks/useAuth";
import { useGetCurrenciesQuery } from "../../features/coins/coinsApiSlice";
import { useFundingMutation } from "../../features/user/userApiSlice";
import { toast } from "react-toastify";

const Funding = () => {
  const [walletChoose, setWalletChoose] = useState("Fiat and spot");
  const [currencyID, setCurrencyID] = useState("");
  const [creditcard, setCreditcard] = useState("");
  const [amount, setAmount] = useState(null);
  const walletOption = ["Fiat and spot", "Futures", "funding"];

  const ListCreditCard = [
    {
      img: "https://th.bing.com/th/id/OIP.CSv0D_Pv2hzbhGo6UWoLAgHaHa?pid=ImgDet&rs=1",
      value: "Mastercard",
    },
    {
      img: "https://th.bing.com/th/id/R.882554502a910b08926783672406e254?rik=HcKdX2aH%2bJNPTw&pid=ImgRaw&r=0",
      value: "Visa",
    },
    {
      img: "https://th.bing.com/th/id/OIP.eFntJMWiAigLvftXw6GfCwHaBz?pid=ImgDet&rs=1",
      value: "Paypal",
    },
    {
      img: "https://th.bing.com/th/id/R.93432c12cb348bdefdcc27d465fac524?rik=LhggmvPksBkFkA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f04%2fJCB_logo_logotype_emblem_Japan_Credit_Bureau.png&ehk=Q0%2f%2fhZsj0IOI9CRwjKhtQ%2bPCmN0Dgyiqi5VNsI67lvM%3d&risl=&pid=ImgRaw&r=0",
      value: "JCB",
    },
    {
      img: "https://th.bing.com/th/id/OIP.TRozxgHH_1RL9eF0qWKjhgHaEK?pid=ImgDet&rs=1",
      value: "Discover",
    },
    {
      img: "https://th.bing.com/th/id/R.3758ada9405b3b649042694be1d5c722?rik=uowZUfQou%2b8Y5A&riu=http%3a%2f%2fconsumersresearch.org%2fwp-content%2fuploads%2f2019%2f01%2fApple-Pay-Logo-1024x575.png&ehk=W%2fXP3fsdQkodaz609oIZuBFjZMa8TRoThrmdxt0QXNA%3d&risl=&pid=ImgRaw&r=0",
      value: "Apple Pay",
    },
    {
      img: "https://th.bing.com/th/id/R.db677e961692420fce98af43e153e94b?rik=RDJLHiVWUNzncA&pid=ImgRaw&r=0",
      value: "Amazon Pay",
    },
    {
      img: "https://th.bing.com/th/id/OIP.PApyUw088G70rGvpDdoweAHaFj?pid=ImgDet&rs=1",
      value: "Diners Club International",
    },
    {
      img: "https://th.bing.com/th/id/OIP.mVgf3EOygbiEBEh3rtsQJgHaDF?pid=ImgDet&rs=1",
      value: "Stripe",
    },
    {
      img: "https://th.bing.com/th/id/R.759a4f4627d9dbfb40e1da9611d99a7b?rik=DgYa3bCtitbtiQ&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f5%2fAmerican-Express-Logo-Background-PNG-Image.png&ehk=IYCXdLfKX5pjY6avB2J%2friAF%2fN1WWkDLXqQPXDzHyZ8%3d&risl=&pid=ImgRaw&r=0",
      value: "American Express",
    },
  ];

  const { email } = useAuth();

  // const [funding] = useFundingMutation();

  const { data, error, isLoading } = useGetCurrenciesQuery();
  if (!data || error || isLoading) return null;

  function isFiat(value) {
    return (
      value.category === "Fiat Currencies" ||
      value.category === "Suggested Currencies"
    );
  }

  var filtered = data.filter(isFiat);

  const handleOnChange = (event) => {
    setAmount(event.target.value);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    console.log(currencyID);
    console.log(creditcard);
    console.log(amount);
    console.log(email);
    // await funding({ email });
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .post(
        `api/user/request/funding`,
        // `api/user/request/${email}/funding`,
        {
          firstUnit: currencyID,
          senderAddress: "Credit Card",
          amount: amount,
          recieverAddress: email,
        },
        opts
      )
      .then((response) => {
        toast.success(response.data.message);
        // console.log("success");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <NavBar />
      <section className="container_charge">
        <div className="container_chargeform">
          <h4 className="text-center pe-1">FUNDING</h4>
          <form className="form_charge" onSubmit={() => HandleSubmit()}>
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
              <select
                id="currency"
                name="currency"
                onChange={(e) => {
                  const selectCurrency = e.target.value;
                  setCurrencyID(selectCurrency);
                }}
              >
                <option selected>---</option>
                {filtered.map((unit) => (
                  <option value={unit.symbol}>{unit.name}</option>
                ))}
              </select>
            </div>
            <div className="group-img-credit">
              {ListCreditCard.map((card, index) => (
                // <span class="form-check form-check-inline">
                //   <input
                //     class="form-check-input"
                //     type="radio"
                //     name="inlineRadioOptions"
                //     id={index}
                //     key={index}
                //     value={card.value}
                //     onClick={(e) => {
                //       const selectCard = e.target.value;
                //       setCreditcard(selectCard);
                //     }}
                //   />
                //   <img src={card.img} alt="" className="img-credit" />
                // </span>
                <span className="img-contain" key={index}>
                  <label className="label_img">
                    <input type="radio" name="creditCard" value={card.value} />
                    <img
                      name="creditCardImg"
                      src={card.img}
                      alt={card.value}
                      value={card.value}
                      className="img-credit"
                      // onClick={(e) => {
                      // const selectCard = e.target.value;
                      // setCreditcard(selectCard);
                      // console.log(selectCard);
                      // }}
                    />
                  </label>
                </span>
              ))}
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
                onClick={HandleSubmit}
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

export default Funding;
