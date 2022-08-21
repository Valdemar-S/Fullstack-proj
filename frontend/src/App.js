import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DepartmentsPage from "./components/DepartmentsPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DepartmentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
