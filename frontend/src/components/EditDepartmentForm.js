import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditDepartmentForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateDepartmentUser = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/department/${id}`, {
      name: name,
      head: head,
    });
    navigate("/");
  };

  useEffect(() => {
    getDepUserById();
  }, []);

  const getDepUserById = async () => {
    const response = await axios.get(`http://localhost:5000/department/${id}`);
    setName(response.data.name);
    setHead(response.data.head);
  };

  return (
    <div>
      <form onSubmit={updateDepartmentUser}>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
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
            <Button type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default EditDepartmentForm;
