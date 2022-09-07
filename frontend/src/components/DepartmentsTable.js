import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FilterField from "./FilterField";
import { useEffect } from "react";
import axios from "axios";
import SortableColumn from "./common/SortableColumn";
import React from "react";
import EditDepartmentForm from "./EditDepartmentForm";
import DeleteDepartmentModalWindow from "./DeleteDepartmentModalWindow";

export default function DepartmentsTable(props) {
  const [sortingColumn, setSortColumn] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(props.departments);
  const [resetFuncs, setResetFuncs] = useState([]);

  useEffect(() => {
    setData(props.departments);
  }, [props.departments]);

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
            />
            <SortableColumn
              title="Department Name"
              fieldName="name"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <SortableColumn
              title="Department Head"
              fieldName="head"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((dep) =>
              dep.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.head}</td>
                  <td>
                    <div>
                      <EditDepartmentForm
                        name={row.name}
                        id={row.id}
                        head={row.head}
                        updateData={props.updateDepartments}
                      />
                    </div>
                  </td>
                  <td>
                    <DeleteDepartmentModalWindow
                      updateDepartments={props.updateDepartments}
                      id={row.id}
                      name={row.id}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
