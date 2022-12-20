import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import getCurrencySymbol from "currency-symbols";

import useAuth from "../../hooks/useAuth";

const FundingRequest = () => {
  const [fundingRequest, setFundingRequest] = useState([]);

  const { email } = useAuth();

  useEffect(() => {
    axios
      .get(`api/user/request/${email}/funding`)
      .then((response) => {
        setFundingRequest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);
  console.log(fundingRequest.request);

  return (
    <>
      <div>
        <table class="table table-dark table-hover funding-request-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Address</th>
              <th scope="col">From</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {fundingRequest.request &&
              fundingRequest.request.map((rs, index) => (
                <tr key={rs._id}>
                  <th>{index + 1}</th>
                  <td>{rs.senderAddress}</td>
                  <td>{rs.recieverAddress ? rs.recieverAddress : "?"}</td>
                  <td>
                    <span className="text-muted">{`${
                      getCurrencySymbol(rs.firstUnit)
                        ? getCurrencySymbol(rs.firstUnit)
                        : "?"
                    } `}</span>
                    <span>{rs.amount ? rs.amount.toLocaleString() : "?"}</span>
                  </td>
                  <td>
                    <span
                      className={`${
                        rs.status === "approved"
                          ? "text-success"
                          : rs.status === "pending"
                          ? "text-warning"
                          : "text-danger"
                      } rounded-pill`}
                      style={{ fontSize: "12px" }}
                    >
                      <FontAwesomeIcon icon={faCircle} className="me-2" />
                      {rs.status.charAt(0).toUpperCase() + rs.status.slice(1)}
                    </span>
                  </td>
                  <td className="request-action">
                    <span className="text-success me-3" id="approved-check">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className="text-danger" id="denided-check">
                      <FontAwesomeIcon icon={faX} />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FundingRequest;
