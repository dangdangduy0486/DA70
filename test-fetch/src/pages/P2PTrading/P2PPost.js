import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";

const P2PPost = () => {
  const { email } = useAuth();
  const [p2pRequest, setP2PRequest] = useState([]);
  const [e, setE] = useState([]);
  const [assetChoose, setAssetChoose] = useState("bitcoin");
  const [fiatChoose, setFiatChoose] = useState("usd");
  const [rates, setRates] = useState([]);
  const [lowRate, setLowRate] = useState([]);
  const [methodChoose, setMethodChoose] = useState("");

  const assets = [
    { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
    { id: "ethereum", name: "Ethereum", symbol: "eth" },
    { id: "binancecoin", name: "BNB", symbol: "bnb" },
  ];
  const fiats = ["usd", "aed", "aud", "bdt", "bhd", "vnd"];
  const methodOptions = ["buy", "sell"];
  const [searchName, setSearchName] = useState("");

  const id = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${assetChoose}`)
      .then((response) => {
        setLowRate(response.data.market_data.low_24h);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [assetChoose, fiatChoose]);
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: assetChoose,
          vs_currencies: fiatChoose,
        },
      })
      .then((response) => {
        setRates(response.data[assetChoose]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [assetChoose, fiatChoose]);

  // console.log(rates);
  const onSubmit = async (values) => {
    console.log(values);
    const { methodChoose, assetChoose, fiatChoose, yourprice, youramount } =
      values;
    // const res = async () => {
    // await
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .post(
        `api/user/request-p2p/${email}`,
        {
          type: methodChoose,
          firstUnit: assetChoose,
          secondUnit: fiatChoose,
          total: yourprice * youramount,
          amount: youramount,
          senderAddress: email,
        },
        opts
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    // };
    // return res.data;
  };
  const formik = useFormik({
    initialValues: {
      methodChoose: "buy",
      assetChoose: "bitcoin",
      fiatChoose: "usd",
      yourprice: "",
      youramount: "",
    },
    validationSchema: Yup.object({
      yourprice: Yup.number()
        .min(lowRate[fiatChoose], "Your price must higher")
        .max(rates[fiatChoose], "Your price must lower"),
    }),
    onSubmit,
  });

  return (
    <>
      <form className="p-3 form_buy" onSubmit={formik.handleSubmit}>
        <h4 className="ads_title">
          Post your <br></br>
          <span>advertisement</span>
        </h4>
        <div className="container_swap">
          <div className="form_buy_swap">
            <label htmlFor="assetChoose">Asset</label>
            <select
              id="assetChoose"
              name="assetChoose"
              value={formik.values.assetChoose}
              onChange={(e) => {
                const selectCoin = e.target.value;
                setAssetChoose(selectCoin);
                formik.setFieldValue("assetChoose", e.target.value);
              }}
            >
              {assets.map((asset) => (
                <option value={asset.id}>{asset.symbol.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div className="form_buy_swap">
            <label htmlFor="fiatChoose">with Fiat</label>
            <select
              id="fiatChoose"
              name="fiatChoose"
              value={formik.values.fiatChoose}
              // value={fiatChoose}
              onChange={(e) => {
                const selectCoin = e.target.value;
                setFiatChoose(selectCoin);
                formik.setFieldValue("fiatChoose", e.target.value);
              }}
            >
              {fiats.map((fiat) => (
                <option value={fiat}>{fiat.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="container_swap">
          <div className="form_buy_text">
            <h6>Lowest Price</h6>
            <p className="text-center">{lowRate[fiatChoose]}</p>
          </div>
          <div className="form_buy_text">
            <h6>Highest Price</h6>
            <p className="text-center">{rates[fiatChoose]}</p>
          </div>
        </div>

        <div className="input_price">
          <label htmlFor="yourprice">Enter your price</label>
          <input
            type="number"
            id="yourprice"
            name="yourprice"
            placeholder="Enter your price"
            value={formik.values.yourprice}
            onChange={formik.handleChange}
            required
          ></input>
          {formik.errors.yourprice && (
            <span className="error">{formik.errors.yourprice}*</span>
          )}
        </div>
        <div className="input_price">
          <label htmlFor="yourprice">Enter your amount</label>
          <input
            type="number"
            id="youramount"
            name="youramount"
            placeholder="Enter your amount"
            value={formik.values.youramount}
            onChange={formik.handleChange}
            required
          ></input>
        </div>
        <div className="form_buy_swap">
          <label htmlFor="methodChoose">You want to</label>
          <select
            id="methodChoose"
            name="methodChoose"
            value={formik.values.methodChoose}
            onChange={(e) => {
              const selectOption = e.target.value;
              setMethodChoose(selectOption);
              formik.setFieldValue("methodChoose", e.target.value);
            }}
          >
            {methodOptions.map((methodOption) => (
              <option value={methodOption}>{methodOption.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="form_buy_swap">
          <p>{formik.values.yourprice * formik.values.youramount}</p>
        </div>

        <button type="submit" className="btn_post">
          Post
        </button>
      </form>
    </>
  );
};

export default P2PPost;
