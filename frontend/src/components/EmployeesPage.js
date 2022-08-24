import EmployeesTable from "./EmployeesTable";
import AddEmployeesForm from "./AddEmployeesForm";
import Navbar from "./Navbar";
const EmployeesPage = () => {
  return (
    <div>
      <Navbar />
      <h2>EmployeesPage</h2>
      <AddEmployeesForm />
      <EmployeesTable />
    </div>
  );
};
export default EmployeesPage;
