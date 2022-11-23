import React from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
const RequestReceipt = () => {
  return (
    <>
      <div className="bao">
        <Table striped className="mb-0" bordered hover variant="light">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Request</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
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
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default RequestReceipt;
