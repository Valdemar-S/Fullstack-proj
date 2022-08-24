import AddDepartmentForm from "./AddDepartmentForm";
import DepartmentsTable from "./DepartmentsTable";
import Navbar from "./Navbar";
export default function DepartmentsPage(props) {
  return (
    <div>
      <Navbar />
      <h2>Departments page</h2>
      <AddDepartmentForm />

      <DepartmentsTable />
    </div>
  );
}
