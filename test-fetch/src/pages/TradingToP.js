import React, { useState } from "react";
import { Tabs, Table, Input, Form, Button, Select } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { FloatButton } from "antd";
import "../Css/trading.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
const TradingToP = () => {
  const [assetChoose, setAssetChoose] = useState("bitcoin");
  const [fiatChoose, setFiatChoose] = useState("vnd");
  const [rates, setRates] = useState([]);
  const [lowRate, setLowRate] = useState([]);
  const assets = [
    { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
    { id: "ethereum", name: "Ethereum", symbol: "eth" },
    { id: "binancecoin", name: "BNB", symbol: "bnb" },
  ];
  const fiats = ["usd", "aed", "aud", "bdt", "bhd", "vnd"];
  const [searchName, setSearchName] = useState("");
  // const onFinish = (e) => {
  //   console.log(e);
  // };
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
  function calculator(num1, num2) {
    return (num1 + num2) / 2;
  }
  // console.log(rates);
  const onSubmit = async (values) => {
    const { assetChoose, fiatChoose, yourprice } = values;
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      assetChoose: "",
      fiatChoose: "",
      yourprice: "",
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
      <NavBar />
      <section className="tradingtopeople bg-light p-2">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Buy" key="1">
            <Input.Search
              placeholder="Enter name of coin"
              onSearch={(value) => {
                setSearchName(value);
              }}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            <Table
              className="table-striped-rows"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  filteredValue: [searchName],
                  onFilter: (value, record) => {
                    return String(record.name)
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  },
                },
                {
                  title: "Price",
                  dataIndex: "price",
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                },
                {
                  title: "Currency",
                  dataIndex: "currency",
                },
                {
                  title: "Action",
                  dataIndex: "action",
                },
              ]}
              dataSource={[
                {
                  key: 1,
                  name: "A name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: (
                    <button className="btn btn-primary mx-auto  ">Buy</button>
                  ),
                },
                {
                  key: 2,
                  name: "B name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 3,
                  name: "C name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 4,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 5,
                  name: "E name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 6,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 7,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
                {
                  key: 8,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Buy</button>,
                },
              ]}
            ></Table>
            <FloatButton.BackTop />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sell" key="2">
            <Input.Search
              placeholder="Enter name of coin"
              onSearch={(value) => {
                setSearchName(value);
              }}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
            <Table
              className="table-striped-rows"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  filteredValue: [searchName],
                  onFilter: (value, record) => {
                    return String(record.name)
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  },
                },
                {
                  title: "Price",
                  dataIndex: "price",
                },
                {
                  title: "Amount",
                  dataIndex: "amount",
                },
                {
                  title: "Currency",
                  dataIndex: "currency",
                },
                {
                  title: "Action",
                  dataIndex: "action",
                },
              ]}
              dataSource={[
                {
                  key: 1,
                  name: "A name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: (
                    <button className="btn btn-primary mx-auto  ">Sell</button>
                  ),
                },
                {
                  key: 2,
                  name: "B name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 3,
                  name: "C name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 4,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 5,
                  name: "E name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 6,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 7,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 8,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 9,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
                {
                  key: 10,
                  name: "D name",
                  price: 10,
                  amount: 2,
                  currency: "USD",
                  action: <button className="btn btn-primary">Sell</button>,
                },
              ]}
            ></Table>
            <FloatButton.BackTop />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Create" key="3" className="tabs_create">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="I want to Buy" key="1">
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
                          <option value={asset.id}>
                            {asset.symbol.toUpperCase()}
                          </option>
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
                    ></input>
                    {formik.errors.yourprice && (
                      <span className="error">{formik.errors.yourprice}*</span>
                    )}
                  </div>
                  <button type="submit" className="btn_post">
                    Post
                  </button>
                </form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="I want to Sell" key="2">
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
                          <option value={asset.id}>
                            {asset.symbol.toUpperCase()}
                          </option>
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
                    ></input>
                    {formik.errors.yourprice && (
                      <span className="error">{formik.errors.yourprice}*</span>
                    )}
                  </div>
                  <button type="submit" className="btn_post">
                    Post
                  </button>
                </form>
              </Tabs.TabPane>
            </Tabs>
            <FloatButton.BackTop />
          </Tabs.TabPane>
        </Tabs>
      </section>
      <Footer />
    </>
  );
};

export default TradingToP;
