import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddDepUser from "./components/AddDepartmentUsers";
import EditDepUser from "./components/EditDepartmentUsers";
import DepartmentsPage from "./pages/DepartmentsPage";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Routes>
              <Route path="/" element={<DepartmentsPage />} />
              <Route path="/add" element={<AddDepUser />} />
              <Route path="/edit/:id" element={<EditDepUser />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
