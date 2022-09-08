import EmployeesTable from "./EmployeesTable";
import AddEmployeesForm from "./AddEmployeesForm";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
const EmployeesPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(0);
  const [employees, setEmployees] = useState();

  useEffect(() => {
    updateEmployees();
    updateDepartments();
  }, []);

  const updateEmployees = () => {
    axios("http://localhost:5000/employees").then((res) => {
      setEmployees(res.data);
      setLoading((s) => s + 1);
    });
  };

  const dataComponents = (
    <Fragment>
      <AddEmployeesForm
        departments={departments}
        updateEmployees={updateEmployees}
      />
      <EmployeesTable
        departments={departments}
        employees={employees}
        updateEmployees={updateEmployees}
      />
    </Fragment>
  );

  const updateDepartments = () => {
    axios("http://localhost:5000/department").then((res) => {
      setDepartments(res.data);
      setLoading((b) => b + 1);
    });
  };

  return (
    <div>
      <h2>Employees Page</h2>
      {loading >= 2 && dataComponents}
    </div>
  );
};
export default EmployeesPage;
