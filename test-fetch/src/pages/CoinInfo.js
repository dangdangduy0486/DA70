import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "../Css/CoinInfo.css";
import CurrencyInput from "../components/CurrencyInput";
import NavBar from "../components/NavBar";
import Loading from "./loading/loading";
import Button from "react-bootstrap/esm/Button";
import HistoryChart from "../components/HistoryChart";

const CoinInfo = () => {
  const [coinInfo, setCoinInfo] = useState("");
  const { coinID } = useParams("");
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("btc");
  const [currency2, setCurrency2] = useState("btc");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/exchange_rates`)
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  function numberFormat(number) {
    return number.toFixed(6);
  }
  function handleAmount1Change(amount1) {
    setAmount2(
      numberFormat((amount1 * rates[currency2].value) / rates[currency1].value)
    );
    setAmount1(amount1);
  }
  function handleCurrency1Change(currency1) {
    setAmount2(
      numberFormat((amount1 * rates[currency2].value) / rates[currency1].value)
    );
    setCurrency1(currency1);
  }
  const email = localStorage.getItem("email");
  const handleCreateOrder = () => {
    const url = `/api/user/create-order/${email}`;
    const res = 
    axios
    .post(url, {
      name: coinInfo.name,
      price: coinInfo.market_data.current_price[currency1],
      amount: amount1,
      currency: currency2,
      total: amount2,
    })
    .then(() =>{
      alert("Buy coin successfull!!!");
    })
    return res.data;
  };

  const url = "/api/coins/";
  useEffect(() => {
    axios
      .get(url, {
        params: {
          id: coinID,
        },
      })
      .then((response) => {
        setCoinInfo(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [coinID]);
  console.log(coinInfo);
  if (!coinInfo || isError || isLoading) return <Loading />;

  return (
    <>
      <NavBar />
      <section className="coininfor">
        <div className=" history-chart">
          <div className="div1">
            <HistoryChart coinID={coinID} />
          </div>
          <div className="div2">
            <div>
              <div className="coin_trade">
                <h2>Converter Coin</h2>
                <h5>From</h5>
                <CurrencyInput
                  onAmountChange={handleAmount1Change}
                  onCurrencyChange={handleCurrency1Change}
                  currencies={Object.keys(rates)}
                  amount={amount1}
                  currency={currency1}
                />
                <h5>To</h5>
                <CurrencyInput
                  onAmountChange={setAmount2}
                  onCurrencyChange={setCurrency2}
                  currencies={Object.keys(rates)}
                  amount={amount2}
                  currency={currency2}
                />
                <Button variant="outline-warning" onClick={handleCreateOrder}>
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Container fluid className="coindetail">
          <div className="">
            <div className="coindetail-title">
              <img src={coinInfo.image.small} alt={coinInfo.name} />
              <h1 className="text-2xl mb-2 capitalize font-bold">
                {coinInfo.name}
              </h1>
            </div>
            <p
              className="mt-6 text-gray-500 [&>a]:text-blue-600 [&>a]:underline"
              dangerouslySetInnerHTML={{ __html: coinInfo.description.en }}
            ></p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CoinInfo;
