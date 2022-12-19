/* eslint-disable no-sequences */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";

import NavBar from "../../components/NavBar/NavBar";
import useAuth from "../../hooks/useAuth";
import RequestRow from "./RequestRow";
import "./Request.css";
const Request = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [reqID, setReqID] = useState(null);
  const [reqType, setReqType] = useState("spot");
  const [requestType, setRequestType] = useState("Spot order");
  const { email, role } = useAuth();

  const handleRecharge = (e) => {
    setRequestType(e.target.value);
    req();
  };

  const handleOrder = (e) => {
    setRequestType(e.target.value);
    req();
  };

  const handleResponseApproved = async (e) => {
    setReqID(e.target.value);
    const url = `api/admin/response/${email}/${reqType}`;
    setStatus("approved");
    await axios
      .patch(url, {
        requestID: reqID,
        status: status,
      })
      .then(() => {
        req();
        navigate("/request");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResponseDenided = async (e) => {
    setReqID(e.target.value);
    const url = `api/admin/response/${email}/${reqType}`;
    setStatus("denided");
    await axios
      .patch(url, {
        requestID: reqID,
        status: status,
      })
      .then(() => {
        req();
        navigate("/request");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const req = () => {
    const url = `api/user/request/${email}/${reqType}`;
    axios
      .get(url)
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(request);

  useEffect(() => {
    try {
      req();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!request) return null;

  return (
    <>
      <NavBar className="mb-4" />
      {/* <div
        className="btn-group mt-5"
        role="group"
        aria-label="Basic radio toggle button group "
      >
        <input
          type="radio"
          className="btn-check"
          name="reqOrder"
          id="reqOrder"
          autoComplete="off"
          checked
          value="Spot order"
          onClick={handleOrder}
        />
        <label className="btn btn-outline-primary" htmlFor="reqOrder">
          Request
        </label>

        <input
          type="radio"
          className="btn-check"
          name="reqRecharge"
          id="reqRecharge"
          autoComplete="off"
          value="recharge"
          onClick={handleRecharge}
        />
        <label className="btn btn-outline-primary" htmlFor="reqRecharge">
          Funding
        </label>
      </div> */}
      <section className="request mt-5">
        <Tabs
          defaultActiveKey="1"
          tabPosition="inline"
          className="request"
          // onChange={handleTabClick}
        >
          <Tabs.TabPane tab="Overview" key="1">
            {/* <Overview /> */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Fiat and Spot" key="2" id="fiatspot">
            {/* <Fiat /> */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Futures" key="3">
            {/* <Futures /> */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Funding" key="4">
            {/* <Funding /> */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Transaction History" key="5">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      </section>
      <table className="table table-secondary">
        <thead>
          <tr>
            <th scope="col">Cryptocurrencies</th>
            <th scope="col">Price</th>
            <th scope="col">Address</th>
            <th scope="col">Currency</th>
            <th scope="col">Amount</th>
            <th scope="col">Total</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            {role === "admin" ? <td>Actions</td> : null}
          </tr>
        </thead>
        <tbody>
          {request.request &&
            request.request.map((r, index) => (
              <>
                <tr>
                  <RequestRow
                    key={r._id}
                    vs_currency={r.secondUnit}
                    ids={r.firstUnit}
                  />
                  <td>{r.senderAddress}</td>
                  <td>{r.secondUnit.toUpperCase()}</td>
                  <td>{r.amount}</td>
                  <td>{r.total}</td>
                  <td>{r.requestType}</td>
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
                      // style={{color: `${
                      //   r.status === "approved"
                      //     ? "success"
                      //     : r.status === "pending"
                      //     ? "text-success"
                      //     : "text-success"
                      // } `}}
                    >
                      <FontAwesomeIcon icon={faCircle} className="me-2" />
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </td>
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
                      {/* <button value={r._id} onClick={handleResponseApproved}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button value={r._id} onClick={handleResponseDenided}>
                      <FontAwesomeIcon icon={faX} />
                    </button> */}

                      {/* <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        value={r._id}
                        onClick={handleResponseApproved}
                      >
                        Button
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        value={r._id}
                        onClick={handleResponseDenided}
                      >
                        Button
                      </button>
                    </div> */}
                      <div
                        className="btn-group mt-5"
                        role="group"
                        aria-label="Basic radio toggle button group "
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="aprroved"
                          id="aprroved"
                          autoComplete="off"
                          value={r._id}
                          onClick={handleResponseApproved}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="aprroved"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="denided"
                          id="denided"
                          autoComplete="off"
                          value={r._id}
                          onClick={handleResponseDenided}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="denided"
                        >
                          <FontAwesomeIcon icon={faX} />
                        </label>
                      </div>
                    </td>
                  )}
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Request;
