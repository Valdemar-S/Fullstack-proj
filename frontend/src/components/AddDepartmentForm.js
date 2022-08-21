import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddDepartmentForm() {
  return (
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Department Name</Form.Label>
          <Form.Control required type="text" placeholder="Enter department name" />
          <Form.Control.Feedback type="invalid">
              Please enter department name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHead">
          <Form.Label>Department Head</Form.Label>
          <Form.Control required type="text" placeholder="Development, QA, DevOps, Marketing, etc." />
          <Form.Control.Feedback type="invalid">
              Please enter department head.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  );
}
