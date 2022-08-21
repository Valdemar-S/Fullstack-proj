import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDepUser = () => {
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateDepUser = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/department/${id}`, {
      department_name: name,
      department_head: head,
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
      <form onSubmit={updateDepUser}>
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

        <div className="field">
          <button className="button is-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditDepUser;
