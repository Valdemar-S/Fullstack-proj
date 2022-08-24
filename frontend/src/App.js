import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import EmployeesPage from "./components/EmployeesPage";
import DepartmentsPage from "./components/DepartmentsPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/DepartmentsPage" element={<DepartmentsPage />} />
          <Route path="/EmployeesPage" element={<EmployeesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
