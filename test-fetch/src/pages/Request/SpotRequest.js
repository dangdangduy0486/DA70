import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import RequestRow from "./SpotRequestRow";
import { toast } from "react-toastify";

const SpotRequest = () => {
  const navigate = useNavigate();
  const [spotRequest, setSpotRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);
  // const [requestType, setRequestType] = useState("Spot order");
  const { email, role } = useAuth();

  // const handleRecharge = (e) => {
  //   setRequestType(e.target.value);
  //   req();
  // };

  // const handleOrder = (e) => {
  //   setRequestType(e.target.value);
  //   req();
  // };

  const handleResponseApproved = async (value) => {
    await setReqID(value._id);
    await setStatus("approved");
    const url = `api/admin/response/${email}/spot`;

    await axios
      .patch(url, {
        requestID: reqID,
        status: status,
      })
      .then((response) => {
        window.location.reload(false);
        req();
        navigate("/request");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleResponseDenided = async (value) => {
    await setReqID(value._id);
    await setStatus("rejected");
    const url = `api/admin/response/${email}/spot`;

    await axios
      .patch(url, {
        requestID: reqID,
        status: status,
      })
      .then((response) => {
        window.location.reload(false);
        req();
        navigate("/request");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const req = () => {
    const url = `api/user/request/${email}/spot`;
    axios
      .get(url)
      .then((response) => {
        setSpotRequest(response.data.request);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  useEffect(() => {
    try {
      req();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!spotRequest) return null;
  console.log(spotRequest.length);
  return (
    <>
      <div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Cryptocurrencies</th>
              <th scope="col">Price</th>
              <th scope="col">Address</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              {role === "admin" ? <td>Actions</td> : null}
            </tr>
          </thead>
          <tbody>
            {spotRequest.length <= 0 ? (
              <tr style={{ textAlign: "center" }}>Empty</tr>
            ) : (
              spotRequest &&
              spotRequest.map((r, index) => (
                <>
                  <tr>
                    <RequestRow
                      key={r._id}
                      vs_currency={r.secondUnit}
                      ids={r.firstUnit}
                    />
                    <td>{r.senderAddress}</td>
                    <td>{r.amount}</td>
                    <td>{r.total.toLocaleString()}</td>
                    <td>
                      <span>{r.type}</span>
                    </td>
                    <td>
                      <span
                        className={`${
                          r.status === "approved"
                            ? "text-success"
                            : r.status === "pending"
                            ? "text-warning"
                            : "text-danger"
                        } rounded-pill`}
                        style={{ fontSize: "12px" }}
                      >
                        <FontAwesomeIcon icon={faCircle} className="me-2" />
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </td>
                    {r.status === "approved" || r.status === "rejected" ? (
                      <td></td>
                    ) : (
                      <td className="request-action">
                        <span
                          className="text-success me-3"
                          id="approved-check"
                          onClick={() => handleResponseApproved(r)}
                          key={r._id}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className="text-danger"
                          id="denided-check"
                          onClick={() => handleResponseDenided(r)}
                          key={r._id}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </span>
                      </td>
                    )}
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SpotRequest;
