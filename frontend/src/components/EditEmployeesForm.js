import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

const EditEmployeesForm = (props) => {
  const [show, setShow] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [type, setType] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  const handleSave = async () => {
    await axios.patch(`http://localhost:5000/employees/${props.id}`, {
      name: name,
      email: email,
      startDate: startDate,
      departments_id: type,
    });
    props.updateData();
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                placeholder="Full name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter full name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Department</Form.Label>
            <Form.Control
              required
              aria-label="Default select example"
              as="select"
              value={type}
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setType(e.target.value);
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>

            <Form.Label>Head of Department</Form.Label>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control disabled placeholder="{head is here}" />
              <Form.Control.Feedback type="invalid">
                Please enter email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Start date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
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

export default EditEmployeesForm;
