import Button from "react-bootstrap/Button";
const Navbar = () => {
  return (
    <div>
      <h4>Navigation</h4>
      <Button href="/">Home</Button>
      <Button href="/DepartmentsPage">Departments page</Button>
      <Button href="/EmployeesPage">Employees page</Button>
    </div>
  );
};

export default Navbar;
