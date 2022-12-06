/* eslint-disable no-sequences */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./Request.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
const Request = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);
  const [requestType, setRequestType] = useState("Spot order");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  const handleRecharge = (e) => {
    setRequestType(e.target.value);
  };

  const handleOrder = (e) => {
    setRequestType(e.target.value);
    console.log(requestType);
  };

  useEffect(() => {
    try {
      // let requestType = "Spot order";
      const url = `api/request/${id}`;
      axios
        .get(url, {
          params: {
            requestType: requestType,
          },
        })
        .then((response) => {
          setRequest(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("error");
    }
  }, [id, requestType]);

  const handleResponseApproved = async (e) => {
    setReqID(e.target.value);
    const url = `api/admin/response-wallet/${id}`;
    setStatus("approved");
    await axios
      .patch(url, {
        requestID: reqID,
        status: status,
      })
      .then(() => {
        navigate("/request");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResponseDenided = async (e) => {
    setReqID(e.target.value);
    const url = `api/admin/response_wallet/${id}`;
    setStatus("denided");
    await axios
      .patch(url, {
        requestID: reqID,
        status: status,
      })
      .then(() => {
        navigate("/request");
      })
      .catch((error) => {
        console.log("error");
      });
  };
  if (!request) return null;

  return (
    <>
      <NavBar className="mb-4" />
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="Basic radio toggle button group "
      >
        <input
          type="radio"
          className="btn-check"
          name="reqOrder"
          id="reqOrder"
          autocomplete="off"
          checked
          value="Spot order"
          onClick={handleOrder}
        />
        <label className="btn btn-outline-primary" htmlFor="reqOrder">
          Orders
        </label>

        <input
          type="radio"
          className="btn-check"
          name="reqRecharge"
          id="reqRecharge"
          autocomplete="off"
          value="recharge"
          onClick={handleRecharge}
        />
        <label className="btn btn-outline-primary" htmlFor="reqRecharge">
          Recharge
        </label>
      </div>
      <table className="table table-secondary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Currency</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            {role === "admin" ? <td>Actions</td> : null}
          </tr>
        </thead>
        <tbody>
          {request.request &&
            request.request.map((r, index) => (
              <tr>
                <td>{index}</td>
                <td>{r.userID}</td>
                <td>{r.purchaseUnit}</td>
                <td>{r.amount}</td>
                <td>{r.requestType}</td>
                <td>{r.status}</td>
                {r.status === "approved" || r.status === "denided" ? (
                  <td>
                    <button disabled>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button disabled>
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </td>
                ) : (
                  <td>
                    <button value={r._id} onClick={handleResponseApproved}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button value={r._id} onClick={handleResponseDenided}>
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Request;
