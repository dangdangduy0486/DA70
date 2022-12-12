import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import MarketsDetails from "../../components/MarketDetails/MarketsDetails";
import NavBar from "../../components/NavBar/NavBar";
import "./Markets.css";
import CurrencyDetails from "../../components/CurrencyDetails/CurrencyDetails";
import { FloatButton } from "antd";
import Loading from "../Loading/Loading";
import CarouselCoins from "../../components/CarouselCoins/CarouselCoins ";
import Footer from "../../components/Footer/Footer";
import { useGetMarketsQuery } from "../../features/markets/marketsApiSlice";
import { useRef } from "react";

const Markets = () => {
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [ order, setOrder ] = useState("market_cap_desc")
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12969);
  const [perPage, setPerPage] = useState(100);

  const callback = (childData) => {
    setVsCurrency((vsCurrency) => (vsCurrency = childData));
  };

  // const handlePreviousPage = () => {
  //   setPage((page) => page - 1);
  // };
  // const handleNextPage = () => {
  //   setPage((page) => page + 1);
  // };
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
    order: order,
    perPage: perPage,
    page: page,
  });

  //total per page
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(parseInt(val));
      inputRef.current.value = val;
    }
  };

  //pagination
  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };
  //handle loading and error
  if (!data || error || isLoading) return <Loading />;

  return (
    <>
      <NavBar />
      <section className="markets">
        <CarouselCoins />
        <CurrencyDetails currencyFr={callback} vsCurrency={vsCurrency} />
        <MarketsDetails markets={data} symbol={vsCurrency} />
        <hr />
        {/* <div className="pagination d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => handlePreviousPage()}
          >
            <i className="fa-solid fa-angles-left"></i>Pre
          </button>
          <button type="button" className="btn btn-outline-secondary">
            {page}
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => handleNextPage()}
          >
            <i className="fa-solid fa-angles-right"></i>Next
          </button>
        </div> */}

        <div className="flex items-center" id="pagination">
          <form
            className="relative flex items-center font-nunito
          mr-12
          "
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="perpage"
              className="relative flex justify-center items-center
          mr-2 font-bold
          "
            >
              per page:
            </label>
            <input
              type="number"
              name="perpage"
              min={1}
              max={250}
              ref={inputRef}
              placeholder={perPage}
              className="w-16 rounded bg-gray-200 placeholder:text-gray-100
     pl-2 required outline-0 border border-transparent 
     focus:border-cyan leading-4
     "
            />
            <button type="submit" className="ml-1 cursor-pointer">
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </button>
          </form>
          <ul className="flex items-center justify-end text-sm">
            <li className="flex items-center">
              <button
                className="outline-0 hover:text-cyan w-8"
                onClick={prev}
                type="button"
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
            </li>

            {page + 1 === TotalNumber || page === TotalNumber ? (
              <li>
                <button
                  onClick={multiStepPrev}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
                >
                  ...
                </button>
              </li>
            ) : null}

            {page - 1 !== 0 ? (
              <li>
                <button
                  onClick={prev}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {page - 1}
                </button>
              </li>
            ) : null}
            <li>
              <button
                disabled
                className="ouline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
              >
                {page}
              </button>
            </li>

            {page + 1 !== TotalNumber && page !== TotalNumber ? (
              <li>
                <button
                  onClick={next}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {page + 1}
                </button>
              </li>
            ) : null}

            {page + 1 !== TotalNumber && page !== TotalNumber ? (
              <li>
                <button
                  onClick={multiStepNext}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
                >
                  ...
                </button>
              </li>
            ) : null}

            {page !== TotalNumber ? (
              <li>
                <button
                  onClick={() => setPage(TotalNumber)}
                  className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {TotalNumber}
                </button>
              </li>
            ) : null}
            <li>
              <button
                className="outline-0 hover:text-cyan w-8"
                onClick={next}
                type="button"
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </li>
          </ul>
        </div>
        <FloatButton.BackTop />
      </section>
      <Footer />
    </>
  );
};

export default Markets;
