import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SortableColumn from "../common/SortableColumn";
import React from "react";
import EditEmployeesForm from "./EditEmployeesForm";
import FilterField from "../common/FilterField";
import DeleteEmployeesModalWindow from "./DeleteEmployeesModalWindow";

const EmpoyeesTable = (props) => {
  const [data, setData] = useState(props.employees);
  const [resetFuncs, setResetFuncs] = useState([]);
  const [sortingColumn, setSortColumn] = useState("");
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState(props.departments);

  useEffect(() => {
    let employeesWithDepartments = props.employees.map((empl) => {
      empl.dep_head = getDepartmentHeadById(empl.departments_id);
      empl.dep_name = getDepartmentNameById(empl.departments_id);
      return empl;
    });
    setData(employeesWithDepartments);
  }, [props.employees]);

  const getDepartmentNameById = (departmentId) => {
    if (departments.length !== 0) {
      const department = departments.find((element) => {
        return +element.id === +departmentId;
      });
      if (department !== undefined && department !== null)
        return department.name;
    } else {
      return "";
    }
  };

  const getDepartmentHeadById = (departmentId) => {
    if (departments.length !== 0) {
      const department = departments.find((element) => {
        return +element.id === +departmentId;
      });
      if (department !== undefined && department !== null)
        return department.head;
    } else {
      return "";
    }
  };

  const updateSorting = (fieldName, order) => {
    if (fieldName !== sortingColumn) {
      resetFuncs.forEach((el) => {
        if (el.fieldName !== fieldName) el.resetFunc();
      });
    }
    if (order === 0) {
      setData((data) =>
        [...data].sort((a, b) => {
          if (a["id"] < b["id"]) {
            return -1;
          }
          if (a["id"] > b["id"]) {
            return 1;
          }
          return 0;
        })
      );
      setSortColumn("");
      return;
    } else if (order === 1) {
      setData((data) =>
        [...data].sort((a, b) => {
          if (a[fieldName] < b[fieldName]) {
            return -1;
          }
          if (a[fieldName] > b[fieldName]) {
            return 1;
          }
          return 0;
        })
      );
    } else if (order === 2) {
      setData((data) =>
        [...data].sort((a, b) => {
          if (a[fieldName] > b[fieldName]) {
            return -1;
          }
          if (a[fieldName] < b[fieldName]) {
            return 1;
          }
          return 0;
        })
      );
    }
    setSortColumn(fieldName);
  };

  function addFunc(val) {
    setResetFuncs((s) => {
      return [...s, val];
    });
  }

  function removeFunc(fieldName) {
    setResetFuncs((s) => {
      return s.filter((el) => el.fieldName !== fieldName);
    });
  }

  return (
    <div>
      <FilterField setSearch={setSearch} />
      <Table striped bordered>
        <thead>
          <tr>
            <SortableColumn
              title="#"
              fieldName="id"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
              isDefault={true}
            />
            <SortableColumn
              title="Full name"
              fieldName="name"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <SortableColumn
              title="Email"
              fieldName="email"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <SortableColumn
              title="Department"
              fieldName="dep_name"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <SortableColumn
              title="Head of Department"
              fieldName="dep_head"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <SortableColumn
              title="Start date"
              fieldName="date"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <td colSpan="2">Actions</td>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((emp) =>
              emp.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.dep_name}</td>
                  <td>{row.dep_head}</td>
                  <td>{new Date(row.date).toLocaleDateString("bg-BG")}</td>
                  <td>
                    <EditEmployeesForm
                      name={row.name}
                      id={row.id}
                      head={row.head}
                      email={row.email}
                      updateData={props.updateEmployees}
                      departments={departments}
                      date={row.date}
                      departments_id={row.departments_id}
                    />
                  </td>
                  <td>
                    <DeleteEmployeesModalWindow
                      id={row.id}
                      name={row.name}
                      updateEmployees={props.updateEmployees}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
export default EmpoyeesTable;
