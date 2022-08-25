import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEmployeesForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [validated, setValidated] = useState(false);
  const [valid, setValid] = useState(false);

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
      await axios.post("http://localhost:5000/employees", {
        name: name,
        email: email,
      });
  };
  return (
    <div>
      <Form
        onChange={updateValidity}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
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
        <Form.Select required aria-label="Default select example">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Form.Select>

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

        <Button variant={valid ? "success" : "secondary"} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default AddEmployeesForm;
