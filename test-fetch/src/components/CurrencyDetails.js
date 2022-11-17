import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/currencyDetails.css";

const CurrencyDetails = (props) => {
  const [currencies, setCurrencies] = useState(null);

  const handleSelectCurrency = (value) => {
    console.log(value.symbol);
    props.currencyFr(value.symbol);
  };

  const url = "/api/currency";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCurrencies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!currencies) return null;
  console.log(currencies);

  return (
    // <div id="currencyDetails">
    //   <button
    //     type="button"
    //     className="btn btn-primary"
    //     data-bs-toggle="modal"
    //     data-bs-target="#exampleModal"
    //     id="currencyDetails"
    //   >
    //     {props.vsCurrency.toUpperCase()}
    //   </button>
    //   <div
    //     className="modal fade"
    //     id="exampleModal"
    //     tabIndex="-1"
    //     aria-labelledby="exampleModalLabel"
    //     aria-hidden="true"
    //   >
    //     <div className="modal-dialog">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h5 className="modal-title" id="exampleModalLabel">
    //             Change currency
    //           </h5>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //           ></button>
    //         </div>
    //         <div className="modal-body">
    //           <div className="container">
    //             <div className="row">
    //               {currencies &&
    //                 currencies.map((currency) => (
    //                   <div
    //                     className="col"
    //                     onClick={() => handleSelectCurrency(currency)}
    //                     value={currency}
    //                     style={{ cursor: "pointer" }}
    //                     key={currency._id}
    //                   >
    //                     {currency.symbol.toUpperCase()}
    //                   </div>
    //                 ))}
    //             </div>
    //           </div>
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             data-bs-dismiss="modal"
    //           >
    //             Close
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div id="currencyDetails">
      {currencies &&
        currencies.map((currency) => (
          <div
            className="currency_item"
            onClick={() => handleSelectCurrency(currency)}
            style={{ cursor: "pointer" }}
          >
            {currency.symbol.toUpperCase()}
          </div>
        ))}
    </div>
  );
};

export default CurrencyDetails;
