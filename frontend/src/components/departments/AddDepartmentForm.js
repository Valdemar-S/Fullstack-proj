import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

export default function AddDepartmentForm() {
  const [name, setName] = useState("");
  const [head, setHead] = useState("");

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
      await axios.post("http://localhost:5000/department", {
        name: name,
        head: head,
      });
  };

  return (
    <Form onChange={updateValidity} noValidate validated={validated}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Department Name</Form.Label>
        <Form.Control
          required
          type="text"
          value={name}
          placeholder="Enter department name"
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter department name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHead">
        <Form.Label>Department Head</Form.Label>
        <Form.Control
          required
          type="text"
          value={head}
          placeholder="Development, QA, DevOps, Marketing, etc."
          onChange={(e) => setHead(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter department head.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant={valid ? "success" : "secondary"} onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
