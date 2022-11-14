import { useEffect, useState } from "react";
import axios from "axios";
import MarketsDetails from "../components/MarketsDetails";
import NavBar from "../components/NavBar";
import "../Css/home.css";
import CurrencyDetails from "../components/CurrencyDetails";
import Loading from "./loading/loading";

const Home = () => {
  const [markets, setMarkets] = useState("");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [currentPage, setCurrentPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const callback = (childData) => {
    setVsCurrency((vsCurrency) => (vsCurrency = childData));
  };

  const handlePreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
    console.log(currentPage);
  };
  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [isLoading, vsCurrency, currentPage]);
  console.log(isLoading);
  if (!markets) return null;
  console.log(markets);
  if (isLoading === true || isError) {
    return <Loading />;
  }
  return (
    <>
      <NavBar />
      <hr />
      <CurrencyDetails currencyFr={callback} vsCurrency={vsCurrency} />
      <MarketsDetails markets={markets} symbol={vsCurrency} />
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
