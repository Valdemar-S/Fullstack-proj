import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function DeleteEmployeesModalWindow(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEmployeesUser = () => {
    axios.delete(`http://localhost:5000/employees/${props.id}`).finally((_) => {
      props.updateEmployees();
      handleClose();
    });
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to delete {props.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteEmployeesUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteEmployeesModalWindow;
