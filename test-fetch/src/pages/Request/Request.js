import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./Request.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const Request = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);

  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  useEffect(() => {
    try {
      const url = `api/user/get_request/${id}`;
      axios
        .get(url)
        .then((response) => {
          setRequest(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("error");
    }
  }, []);
  const handleResponseApproved = useCallback(
    (requestID) => () => {
      const url = `api/admin/response_wallet/${id}`;
      setStatus("approved");
      setReqID(requestID);
      console.log(reqID);
      axios
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
    },
    []
  );
  const handleResponseDenided = useCallback(
    (requestID) => () => {
      const url = `api/admin/response_wallet/${id}`;
      setStatus("denided");
      setReqID(requestID);
      console.log(reqID);
      axios
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
    },
    []
  );
  if (!request) return null;

  return (
    <>
      <table class="table table-secondary">
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
                {/* {role === "admin" ? (
                  <>
                    {r.status === "approved" || r.status === "denided" ? (
                      <td>
                        <button disabled>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button disabled>
                          <FontAwesomeIcon icon={faX} />
                        </button>
                      </td>
                    ) : ( */}
                <td>
                  {role === "admin" ||
                  r.status === "approved" ||
                  r.status === "denided" ? (
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
                      <button onClick={handleResponseApproved(r._id)}>
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button onClick={handleResponseDenided(r._id)}>
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </td>
                  )}
                </td>
                {/* )}
                  </>
                ) : null} */}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Request;
