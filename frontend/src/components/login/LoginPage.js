import { useState, useEffect } from "react";
import { login } from "../../services/auth.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    login(email, password);
  };

  return (
    <div>
      <h2>Login page</h2>
      <Form>
        <Form.Control
          required
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          required
          type="password"
          value={password}
          placeholder="Enter password(employee name)"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
