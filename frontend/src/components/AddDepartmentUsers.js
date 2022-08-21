import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepUser = () => {
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const navigate = useNavigate();
  const btn = document.getElementById("btn");

  const saveDepUser = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/department`, {
      name: name,
      head: head,
    });
    navigate("/");
  };
  const buttonChange = () => {
    if (name != "" && head != "") {
      btn.style.backgroundColor = "#4CAF50";
    } else {
      btn.style.backgroundColor = "gray";
    }
  };
  return (
    <div on onChange={buttonChange}>
      <form onSubmit={saveDepUser} required>
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
          <button id="btn" className="button is-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepUser;
