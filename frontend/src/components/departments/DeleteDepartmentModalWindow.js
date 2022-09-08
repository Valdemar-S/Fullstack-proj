import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function DeleteDepartmentModalWindow(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteDepartment = () => {
    axios
      .delete(`http://localhost:5000/department/${props.id}`)
      .finally((_) => {
        props.updateDepartments();
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
          <Modal.Title>Delete department</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to delete {props.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteDepartment}>
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
export default DeleteDepartmentModalWindow;
