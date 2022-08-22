import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";

import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import EditDepartmentForm from "./EditDepartmentForm";

export default function DepartmentsTable({ departments }) {
  const NONE = "none",
    ASC = "asc",
    DESC = "desc";

  const [sortingColumn, setSortColumn] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    axios("http://localhost:5000/department")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally((_) => {
        setLoading(true);
      });
  };

  const deleteDepUser = (id) => {
    axios.delete(`http://localhost:5000/department/${id}`).finally((_) => {
      updateData();
    });
  };

  function SortableColumn({ title, fieldName, updateSorting }) {
    const [sortingOrder, setSortingOrder] = useState(NONE);

    return (
      <th
        onClick={() => {
          switch (sortingOrder) {
            case NONE:
              updateSorting(fieldName, ASC, () => setSortingOrder(NONE));
              setSortingOrder(ASC);
              break;
            case ASC:
              updateSorting(fieldName, DESC, () => setSortingOrder(NONE));
              setSortingOrder(DESC);
              break;
            case DESC:
              updateSorting(fieldName, NONE, () => setSortingOrder(NONE));
              setSortingOrder(NONE);
              break;
            default:
              return;
          }
        }}
      >
        {title}
        {sortingColumn === fieldName ? (
          sortingOrder === ASC ? (
            <CaretUpFill />
          ) : (
            <CaretDownFill />
          )
        ) : (
          ""
        )}
      </th>
    );
  }

  const updateSorting = (fieldName, order, resetSorting) => {
    console.log(order);
    if (fieldName !== sortingColumn) {
      resetSorting();
    }
    if (order === NONE) {
      // Sort to default if all columns unselected.
      setData(
        data.sort((a, b) => {
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
    } else if (order === ASC) {
      setData(
        data.sort((a, b) => {
          if (a[fieldName] < b[fieldName]) {
            return -1;
          }
          if (a[fieldName] > b[fieldName]) {
            return 1;
          }
          return 0;
        })
      );
    } else if (order === DESC) {
      setData(
        data.sort((a, b) => {
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
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <SortableColumn
              title="#"
              fieldName="id"
              updateSorting={updateSorting}
            />
            <SortableColumn
              title="Department Name"
              fieldName="name"
              updateSorting={updateSorting}
            />
            <SortableColumn
              title="Department Head"
              fieldName="head"
              updateSorting={updateSorting}
            />
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.head}</td>
                <td>
                  <div>
                    <EditDepartmentForm
                      name={row.name}
                      id={row.id}
                      head={row.head}
                      updateData={updateData}
                    />
                  </div>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you wish to delete ${row.name} ?`
                        )
                      )
                        deleteDepUser(row.id);
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
}
