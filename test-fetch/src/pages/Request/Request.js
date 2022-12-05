import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./Request.css";
const Request = () => {
  const [request, setRequest] = useState(null);

  const role = localStorage.getItem("role");
  useEffect(() => {
    try {
      const id = localStorage.getItem("id");
      const url = `api/user/get_request/${id}`;
      axios
        .get(url)
        .then((response) => {
          setRequest(response.data);
        })
        .catch((error) => {
          console.log("errorrr");
        });
    } catch (error) {
      console.log("error");
    }
  }, []);
  if (!request) return null;
  console.log(request);

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
                {role === "admin" ? (
                  <td>
                    {r.status === "approved" ? (
                      <>
                        <FontAwesomeIcon icon={faCheck} disabled />
                        <FontAwesomeIcon icon={faX} disabled />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCheck} />
                        <FontAwesomeIcon icon={faX} />
                      </>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Request;
