import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MarketsDetails from "../../components/MarketDetails/MarketsDetails";
import NavBar from "../../components/NavBar/NavBar";
import "./Markets.css";
import CurrencyDetails from "../../components/CurrencyDetails/CurrencyDetails";
import { FloatButton } from "antd";
import Loading from "../Loading/Loading";
import CarouselCoins from "../../components/CarouselCoins/CarouselCoins ";
import Footer from "../../components/Footer/Footer";
import { useGetMarketsQuery } from "../../features/markets/marketsApiSlice";

const Markets = () => {
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
  // const url = "/api/markets";
  // const token = localStorage.getItem("token");
  // const opts = {
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  // };
  // useEffect(() => {
  //   axios
  //     .get(
  //       url,
  //       {
  //         params: {
  //           vs_currency: vsCurrency,
  //           page: currentPage,
  //         },
  //       },
  //       opts
  //     )
  //     .then((response) => {
  //       setMarkets(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [vsCurrency, currentPage]);
  const { data, error, isLoading } = useGetMarketsQuery({
    vs_currency: vsCurrency,
    page: currentPage,
  });

  if (!data || error || isLoading) return <Loading />;

  return (
    <>
      <NavBar />
      <section className="markets">
        <CarouselCoins />
        <CurrencyDetails currencyFr={callback} vsCurrency={vsCurrency} />
        <MarketsDetails markets={data} symbol={vsCurrency} />
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
