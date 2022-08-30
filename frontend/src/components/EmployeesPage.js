import EmployeesTable from "./EmployeesTable";
import AddEmployeesForm from "./AddEmployeesForm";
import Navbar from "./Navbar";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
const EmployeesPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    updateData();
  }, []);

  const dataComponents = (
    <Fragment>
      <AddEmployeesForm departments={departments} />
      <EmployeesTable departments={departments} />
    </Fragment>
  );

  const updateData = () => {
    axios("http://localhost:5000/department").then((res) => {
      setDepartments(res.data);
      setLoading(true);
    });
  };

  return (
    <div>
      <Navbar />
      <h2>Employees Page</h2>
      {loading && dataComponents}
    </div>
  );
};
export default EmployeesPage;
