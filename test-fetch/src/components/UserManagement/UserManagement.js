import React from "react";
import { useState } from "react";
import { Button, Modal, Input } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UserManagement = () => {
  const [show, setShow] = useState(false);
  const handleAdd = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div className="shadow-lg p-3 bg-body ">
        <div class="row ">
          <div className="col-8 text-center">
            <h2>User List</h2>
          </div>
          <div className="col-4">
            <Button variant="primary" onClick={handleAdd}>
              Add New Student
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name </th>
                  <th>Email</th>
                  <th>Role </th>
                  <th>Money </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Minh Bao</td>
                  <td>minhbao11b#gmail.com</td>
                  <td>member</td>
                  <td>5000btc</td>
                  <td>
                    <a
                      href="#"
                      class="view"
                      title="View"
                      data-toggle="tooltip"
                      style={{ color: "#10ab80" }}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a href="#" class="edit" title="Edit" data-toggle="tooltip">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                    <a
                      href="#"
                      class="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="btn ms-2"
                        variant="outline-warning"
                        type="button"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
      </div>
      <div className="modalbox">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter Name"
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  id="role"
                  placeholder="Enter Role"
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="number"
                  class="form-control"
                  id="money"
                  placeholder="Enter Money"
                />
              </div>
              <button type="submit" class="btn btn-success mt-1 ">
                Add New User
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default UserManagement;
