import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function DeleteDepartmentModalWindow(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEmployeesUser = () => {
    axios.delete(`http://localhost:5000/employees/${props.id}`).finally((_) => {
      updateData();
    });
  };

  const updateData = () => {
    axios("http://localhost:5000/employees")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally((_) => {
        setLoading(true);
      });
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete(new)
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
        <Modal.Body>И зачем тебе его удалять?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(deleteEmployeesUser, handleClose)}
          >
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
