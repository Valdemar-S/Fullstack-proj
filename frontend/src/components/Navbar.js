import Button from "react-bootstrap/Button";
const Navbar = () => {
  return (
    <div>
      <h4>Navigation</h4>
      <Button href="/DepartmentsPage">Departments</Button>
      <Button href="/EmployeesPage">Employees</Button>
    </div>
  );
};

export default Navbar;
