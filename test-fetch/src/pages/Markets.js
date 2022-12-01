import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MarketsDetails from "../components/MarketsDetails";
import NavBar from "../components/NavBar";
import "../Css/markets.css";
import CurrencyDetails from "../components/CurrencyDetails";
import { FloatButton } from "antd";
import Loading from "./loading/loading";
import CarouselCoins from "../components/CarouselCoins ";
import Footer from "../components/Footer";
const Markets = () => {
  const [markets, setMarkets] = useState("");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [currentPage, setCurrentPage] = useState(1);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [vsCurrency, currentPage]);

  if (!markets) return <Loading />;
  console.log(markets);

  return (
    <>
      <NavBar />
      <section className="markets">
        <CarouselCoins />
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
        <FloatButton.BackTop />
      </section>
      <Footer />
    </>
  );
};

export default Markets;
