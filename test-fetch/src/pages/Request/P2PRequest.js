import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import getCurrencySymbol from "currency-symbols";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const P2PRequest = () => {
  const navigate = useNavigate();
  const [p2pRequest, setP2PRequest] = useState([]);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);
  // const [reqType, setReqType] = useState("spot");
  const { email, role } = useAuth();

  //   const handleResponseApproved = async (value) => {
  //     setReqID(value._id);
  //     setStatus("approved");
  //     const url = `api/admin/response/${email}/p2p`;

  //     await axios
  //       .patch(url, {
  //         requestID: reqID,
  //         status: status,
  //       })
  //       .then((response) => {
  //         window.location.reload(false);
  //         req();
  //         navigate("/request");
  //         toast.success(response.data.message);
  //       })
  //       .catch((error) => {
  //         toast.error(error.data.message);
  //       });
  //   };

  //   const handleResponseDenided = async (value) => {
  //     setReqID(value._id);
  //     setStatus("rejected");
  //     const url = `api/admin/response/${email}/p2p`;

  //     await axios
  //       .patch(url, {
  //         requestID: reqID,
  //         status: status,
  //       })
  //       .then((response) => {
  //         window.location.reload(false);
  //         req();
  //         navigate("/request");
  //         toast.success(response.data.message);
  //       })
  //       .catch((error) => {
  //         toast.error(error.data.message);
  //       });
  //   };

  const req = () => {
    const url = `api/user/request/${email}/p2p`;
    axios
      .get(url)
      .then((response) => {
        setP2PRequest(response.data.request);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };
  console.log(p2pRequest);

  useEffect(() => {
    try {
      req();
    } catch (error) {
      toast.error(error.data.message);
    }
  }, []);

  return (
    <>
      <div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">
            Default switch checkbox input
          </label>
        </div>
        <table class="table table-dark table-hover funding-request-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Method</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {p2pRequest.length <= 0 ? (
              <tr>
                <td>Empty</td>
              </tr>
            ) : (
              p2pRequest &&
              p2pRequest.map((rs, index) => (
                <tr key={rs._id}>
                  <th>{index + 1}</th>
                  <td>{rs.senderAddress}</td>
                  <td>{rs.recieverAddress ? rs.recieverAddress : "?"}</td>
                  <td>{rs.type.toUpperCase()}</td>
                  <td>
                    <span className="text-muted">{`${
                      getCurrencySymbol(rs.firstUnit)
                        ? getCurrencySymbol(rs.firstUnit)
                        : rs.firstUnit
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default P2PRequest;
