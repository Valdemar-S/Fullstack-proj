import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import authHeader from "../../services/authHeader";

const EditEmployeesForm = (props) => {
  const [show, setShow] = useState(false);
  const [head, setHead] = useState("");
  const [departments, setDepartments] = useState(props.departments);
  const [departmentId, setDepartmentId] = useState(props.departments_id);
  const [date, setDate] = useState(new Date(props.date));
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (departments.length !== 0) {
      const department = departments.find((element) => {
        return +element.id === +departmentId;
      });
      if (department !== undefined && department !== null)
        setHead(department.head);
      else {
        setHead("");
      }
    } else {
      setHead("");
    }
  }, [departmentId, departments]);

  const handleSave = async () => {
    await axios.patch(
      `http://localhost:5000/employees/${props.id}`,
      {
        name: name,
        email: email,
        departments_id: departmentId,
        date: date,
      },
      { headers: authHeader() }
    );
    props.updateData();
    setShow(false);
  };

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
                type="email"
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
              value={departmentId}
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setDepartmentId(e.target.value);
              }}
            >
              <option></option>
              {departments.map((row, index) => {
                return (
                  <option value={row.id} key={index}>
                    {row.name}
                  </option>
                );
              })}
            </Form.Control>

            <Form.Label>Head of Department</Form.Label>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control value={head} disabled />
            </Form.Group>

            <Form.Label>Start date</Form.Label>
            <DatePicker
              value={date}
              selected={date}
              onChange={(d) => setDate(d)}
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
