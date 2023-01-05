import React, { useState } from "react";
import { Tabs, Table, Input, Form, Button, Select } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { FloatButton } from "antd";
import "./TradingToP.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const TradingToP = () => {
  const history = useNavigate();
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

  //
  useEffect(() => {
    const url = `api/request/${id}`;
    axios
      .get(url, {
        params: {
          requestType: "P2P",
        },
      })
      .then((response) => {
        setP2PRequest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  var arr = [];
  const onChange = (key) => {
    if (key === "1") {
      p2pRequest.request.map((a) => {
        if (a.orderType === "buy") {
          arr.push(a);
        }
        setE(arr);
        console.log(arr);
      });
    }
    if (key === "2") {
      p2pRequest.request.map((a) => {
        if (a.orderType === "sell") {
          let arr = [];
          arr.push(a);
          setE(arr);
        }
      });
    }
  };
  //

  // console.log(rates);
  const onSubmit = async (values) => {
    console.log(values);
    const { methodChoose, assetChoose, fiatChoose, yourprice, youramount } =
      values;
    // const res = async () => {
    // await
    axios
      .post(`api/user/request-p2p/${email}`, {
        type: methodChoose,
        firstUnit: assetChoose,
        secondUnit: fiatChoose,
        total: yourprice * youramount,
        amount: youramount,
        senderAddress: email,
      })
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
      <NavBar />
      <section className="tradingtopeople bg-light p-2">
        <Tabs defaultActiveKey="1" onChange={onChange}>
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
            {/* <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="I want to Buy" key="buy"> */}
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
                <label htmlFor="methodChoose">Method</label>
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
                    <option value={methodOption}>
                      {methodOption.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn_post">
                Post
              </button>
            </form>
            {/* </Tabs.TabPane>
              <Tabs.TabPane tab="I want to Sell" key="sell">
                <form className="p-3 form_buy" onSubmit={formik.handleSubmit}>
                  <h2 id="methodChoose" name="methodChoose">
                    Sell
                  </h2>
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
                      required
                    ></input>
                    {formik.errors.yourprice && (
                      <span className="error">{formik.errors.yourprice}*</span>
                    )}
                  </div>
                  <button type="submit" className="btn_post">
                    Post
                  </button>
                </form> */}
            {/* </Tabs.TabPane> */}
            {/* </Tabs> */}
            {/* <FloatButton.BackTop /> */}
          </Tabs.TabPane>
        </Tabs>
      </section>
      <div>
        <table className="table-dark w-100">
          <thead>
            <tr>
              <th scope="col">Sender</th>
              <th scope="col">Fiat</th>
              <th scope="col">Sell</th>
              <th scope="col">Amount</th>
              <th scope="col">Statue</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {p2pRequest.request &&
              p2pRequest.request.map((p) => (
                <tr>
                  <td>{p.sender}</td>
                  <td>{p.purchaseUnit}</td>
                  <td>{p.sellUnit}</td>
                  <td>{p.amount}</td>
                  <td>{p.status}</td>
                  <td>{p.orderType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default TradingToP;
