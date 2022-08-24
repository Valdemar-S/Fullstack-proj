import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

const AddEmployeesForm = () => {
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
            placeholder="Enter department name"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter full name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHead">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            value={head}
            placeholder="Development, QA, DevOps, Marketing, etc."
            onChange={(e) => setHead(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter email.
          </Form.Control.Feedback>
        </Form.Group>

        <div class="form-group">
          <label for="exampleFormControlSelect1">Example select</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <Button variant={valid ? "success" : "secondary"} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default AddEmployeesForm;
