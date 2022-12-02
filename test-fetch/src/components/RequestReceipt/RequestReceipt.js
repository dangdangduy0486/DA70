import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
const RequestReceipt = () => {
  const [requestOrder, setRequestOrder] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const url = `/api/user/get-order/${email}`;
    const token = localStorage.getItem("token");
    const opts = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    axios
      .get(url, opts)
      .then((response) => {
        setRequestOrder(response.data.order);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!requestOrder) return null;
  return (
    <>
      <div className="bao">
        <Table striped className="mb-0" bordered hover variant="light">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                />
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                />
              </td>
            </tr> */}
            {/* <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                  //   onClick={handleAccept}
                />
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                  //   onClick={handleReject}
                />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                />
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                />
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="btn ms-2"
                  variant="outline-warning"
                  type="button"
                />
              </td>
            </tr> */}
            {requestOrder &&
              requestOrder.map((order, index) => (
                <tr>
                  <td key={index}>{index}</td>
                  <td>{order.name}</td>
                  <td>{order.price}</td>
                  {/* <td>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="btn ms-2"
                    variant="outline-warning"
                    type="button"
                  />
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className="btn ms-2"
                    variant="outline-warning"
                    type="button"
                  />
                </td> */}
                  <td>{order.amount}</td>
                  <td>{order.currency}</td>
                  <td>{order.total}</td>
                  <td>
                    <p
                      className={`${
                        order.status !== "PENDING"
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      {order.status}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RequestReceipt;
