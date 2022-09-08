import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEmployeesForm = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [head, setHead] = useState("");
  const [departmentId, setDepartmentId] = useState(0);
  const [validated, setValidated] = useState(false);
  const [valid, setValid] = useState(false);
  const [departments, setDepartments] = useState(props.departments);

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

  const updateValidity = (event) => {
    const form = event.currentTarget;
    setValid(form.checkValidity() !== false);
  };

  const handleSubmit = async (event) => {
    updateValidity(event);
    if (!valid) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (valid)
      await axios
        .post("http://localhost:5000/employees", {
          name: name,
          email: email,
          date: startDate,
          departments_id: departmentId,
        })
        .then(() => props.updateEmployees());
  };
  return (
    <div>
      <Form onChange={updateValidity} noValidate validated={validated}>
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
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />

        <Button
          variant={valid ? "success" : "secondary"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default AddEmployeesForm;
