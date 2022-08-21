import AddDepartmentForm from "./AddDepartmentForm";
import DepartmentsTable from './DepartmentsTable';
import { useState } from "react";

export default function DepartmentsPage(props) {
  return (
    <div>
      <AddDepartmentForm />

      <DepartmentsTable />
    </div>
  );
}
