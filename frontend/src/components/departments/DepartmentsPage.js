import AddDepartmentForm from "./AddDepartmentForm";
import DepartmentsTable from "./DepartmentsTable";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    updateDepartments();
  }, []);

  const updateDepartments = () => {
    axios("http://localhost:5000/department").then((res) => {
      setDepartments(res.data);
      setLoading(true);
    });
  };

  return (
    <div>
      <h2>Departments page</h2>
      <AddDepartmentForm updateDepartments={updateDepartments} />
      {loading && (
        <DepartmentsTable
          updateDepartments={updateDepartments}
          departments={departments}
        />
      )}
    </div>
  );
}
