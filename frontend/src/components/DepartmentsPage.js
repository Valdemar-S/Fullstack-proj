import AddDepartmentForm from "./AddDepartmentForm";
import DepartmentsTable from "./DepartmentsTable";
import EditDepartmentForm from "./EditDepartmentForm";
import { useState } from "react";

export default function DepartmentsPage(props) {
  return (
    <div>
      <AddDepartmentForm />

      <DepartmentsTable />
    </div>
  );
}
