import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import SortableColumn from "./common/SortableColumn";
import React from "react";
import EditEmployeesForm from "./EditEmployeesForm";
import FilterField from "./FilterField";

const EmpoyeesTable = () => {
  const [data, setData] = useState([]);
  const [setLoading] = useState(false);
  const [resetFuncs, setResetFuncs] = useState([]);
  const [sortingColumn, setSortColumn] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    axios("http://localhost:5000/employees")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally((_) => {
        setLoading(true);
      });
  };

  const deleteEmployeesUser = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`).finally((_) => {
      updateData();
    });
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
              fieldName="department"
              updateSorting={updateSorting}
              setResetSortOrderFunc={addFunc}
              removeResetSortOrderFunc={removeFunc}
            />
            <SortableColumn
              title="Head of Department"
              fieldName="head"
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
            .map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.departments_id}</td>
                  <td>{row.date}</td>
                  <td>{row.head}</td>
                  <div>
                    <EditEmployeesForm
                      name={row.name}
                      id={row.id}
                      head={row.head}
                      email={row.email}
                      updateData={updateData}
                    />
                  </div>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you wish to delete ${row.name} ?`
                          )
                        )
                          deleteEmployeesUser(row.id);
                      }}
                    >
                      Delete
                    </Button>
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