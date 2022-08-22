import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditDepartmentForm = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = async () => {
    await axios.patch(`http://localhost:5000/department/${props.id}`, {
      name: name,
      head: head,
    });
    props.updateData();
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const [name, setName] = useState(props.name);
  const [head, setHead] = useState(props.head);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="field">
              <label className="label">Name</label>
              <input
                required
                className="input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label">Head</label>
              <input
                required
                className="input"
                type="text"
                placeholder="Head"
                value={head}
                onChange={(e) => setHead(e.target.value)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditDepartmentForm;
