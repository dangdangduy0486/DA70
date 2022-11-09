import { useEffect, useState } from "react";
import axios from "axios";
import MarketsDetails from "../components/MarketsDetails";
import NavBar from "../components/NavBar";
import TrendingCoins from "../components/TrendingCoins"
import "../Css/home.css";

const Home = () => {
  const [markets, setMarkets] = useState("");
  const [vsCurrency, setVsCurrency] = useState("usd"); //setVsCurrency
  const [currentPage, setCurrentPage] = useState(1);
  // vsCurrency = 'usd'
  // currentPage = 1;

  // const handleCurrency = (data) => {
  //   console.log(data)
  // }

  const callback = (childData) => {
    setVsCurrency(vsCurrency => vsCurrency = childData)
  }
  
  const handlePreviousPage = () => {
    setCurrentPage(currentPage => currentPage - 1);
    console.log(currentPage);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1);
    console.log(currentPage);
  };
  const url = "/api/markets";
  useEffect(() => {
    axios
      .get(url, {
        params: {
          vs_currency: vsCurrency,
          page: currentPage,
        },
      })
      .then((response) => {
        setMarkets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [vsCurrency, currentPage]);

  if (!markets) return null;
  console.log(markets);
  
  var amt = 12345;
  var usd = new Intl.NumberFormat("en-US", { style: "currency", "currency":"usd" }).format(amt)
  console.log(usd)
  return (
    <>
      <NavBar currencyFr={callback} vsCurrency={vsCurrency}/>
      <hr />
      <TrendingCoins />
      <hr />
      <MarketsDetails markets={markets} symbol={vsCurrency}/>
      <hr />
      <div className="pagination d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => handlePreviousPage()}
        >
          <i className="fa-solid fa-angles-left"></i>Pre
        </button>
        <button type="button" className="btn btn-outline-secondary">
          {currentPage}
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => handleNextPage()}
        >
          <i className="fa-solid fa-angles-right"></i>Next
        </button>
      </div>
    </>
  );
};

export default Home;
