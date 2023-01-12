import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import moment from "moment/moment";

import getCurrencySymbol from "currency-symbols";

const P2PSell = () => {
  const [p2pData, setP2PData] = useState([]);
  const { email } = useAuth();

  const handleClientRequest = async (value) => {
    console.log(value);
    const url = `api/user/request-p2p/${email}/client-request`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    await axios
      .post(
        url,
        {
          requestType: "p2pReq",
          type: "sell",
          firstUnit: value.firstUnit,
          secondUnit: value.secondUnit,
          amount: value.amount,
          total: value.total,
          recieverAddress: value.senderAddress,
          senderAddress: email,
          requestOf: value._id,
        },
        opts
      )
      .then((response) => {
        // window.location.reload(false);
        // req();
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const req = () => {
    const url = `api/user/request-p2p/${email}/sell`;
    const token = localStorage.getItem("token");

    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .get(url, opts)
      .then((response) => {
        setP2PData(response.data.request);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    req();
  }, []);

  if (!p2pData) return null;
  // console.log(p2pData);
  return (
    <>
      <table className="table table-dark table-hover w-100 h-100">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sender</th>
            <th scope="col">Unit</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {p2pData &&
            p2pData.map((value, index) => (
              <tr key={value._id}>
                <th>{index + 1}</th>
                <td>{value.senderAddress}</td>
                <td>
                  {value.amount}-{value.firstUnit}
                </td>
                <td>
                  <span className="text-muted">{`${
                    getCurrencySymbol(value.secondUnit)
                      ? getCurrencySymbol(value.secondUnit)
                      : value.secondUnit
                  } `}</span>
                  <span>
                    {value.total ? value.total.toLocaleString() : "?"}
                  </span>
                </td>
                <td>
                  <span
                    className={`${
                      value.status === "approved"
                        ? "text-success"
                        : value.status === "pending"
                        ? "text-warning"
                        : "text-danger"
                    } rounded-pill`}
                    style={{ fontSize: "12px" }}
                  >
                    <FontAwesomeIcon icon={faCircle} className="me-2" />
                    {value.status.charAt(0).toUpperCase() +
                      value.status.slice(1)}
                  </span>
                </td>
                <td>{moment(value.date).fromNow()}</td>
                <td>
                  <span
                    className="text-success me-3"
                    id="approved-check"
                    onClick={() => handleClientRequest(value)}
                    key={value._id}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default P2PSell;
