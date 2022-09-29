import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import EmployeesPage from "./components/employees/EmployeesPage";
import DepartmentsPage from "./components/departments/DepartmentsPage";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/DepartmentsPage" element={<DepartmentsPage />} />
          <Route path="/EmployeesPage" element={<EmployeesPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
