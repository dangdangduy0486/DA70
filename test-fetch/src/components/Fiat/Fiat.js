import axios from "axios";
import React, { useEffect, useState } from "react";
import getCurrencySymbol from "currency-symbols";

import "./Fiat.css";
import { useGetUserWalletQuery } from "../../features/user/userApiSlice";
import Loading from "../../pages/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const Fiat = () => {
  const { email } = useAuth();
  const { data, error, isLoading } = useGetUserWalletQuery({ email });

  if (!data || error || isLoading) return <Loading />;

  function isFiat(value) {
    return value.type === "Fiat Currencies";
  }
  let fiatList = data.wallet.filter(isFiat);
  
  var map = fiatList.reduce(function (map, invoice) {
    var name = invoice.currencyID;
    var amount1 = invoice.amount * 1;
    var price = +amount1;
    map[name] = (map[name] || 0) + price;
    console.log(name);
    return map;
  }, {});
  var array = Object.keys(map).map(function (name) {
    return {
      currencyID: name,
      amount: map[name],
    };
  });

  function isCrypto(value) {
    return value.type === "Cryptocurrencies";
  }
  let cryptoList = data.wallet.filter(isCrypto);

  return (
    <>
      <section className="container_fiat">
        <h1>
          Fiat and <span>Spot</span>
        </h1>
        <div className="bg-light container_spot p-3">
          <div className="container_myasset">
            <h5 className="p-3">My Assets</h5>
            <div className="myasset_details p-2">
              <div className="myasset_detail">
                <h2>Fiat</h2>
              </div>
              <div className="container-fluid">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {array.map((w, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{w.currencyID.toUpperCase()}</td>
                        <td>
                          <span className="text-muted">{`${
                            getCurrencySymbol(w.currencyID)
                              ? getCurrencySymbol(w.currencyID)
                              : w.currencyID.toUpperCase()
                          } `}</span>
                          <span>
                            {w.amount ? w.amount.toLocaleString() : "?"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="myasset_detail">
                <h2>Spot</h2>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoList.map((w, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{w.currencyID.toUpperCase()}</td>
                        <td>
                          <span className="text-muted">{`${
                            getCurrencySymbol(w.currencyID)
                              ? getCurrencySymbol(w.currencyID)
                              : w.currencyID.toUpperCase()
                          } `}</span>
                          <span>
                            {w.amount ? w.amount.toLocaleString() : "?"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Fiat;
