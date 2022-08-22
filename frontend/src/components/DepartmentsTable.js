import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FilterField from "./FilterField";
import { useEffect } from "react";
import axios from "axios";

import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import EditDepartmentForm from "./EditDepartmentForm";

export default function DepartmentsTable({ departments }) {
  const NONE = "none",
    ASC = "asc",
    DESC = "desc";

  const [sortingColumn, setSortColumn] = useState("");
  const [search, setSearch] = useState("");
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
          console.log("sorting order in column:" + sortingOrder);
          switch (sortingOrder) {
            case NONE:
              updateSorting(fieldName, ASC, () => setSortingOrder(ASC));
              console.log("we set sorting asc");
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
        {sortingColumn}
      </th>
    );
  }

  const updateSorting = (fieldName, order, resetSorting) => {
    console.log("sortingColumn:" + sortingColumn);
    if (fieldName !== sortingColumn) {
      resetSorting();
      console.log("we RESETED sorting");
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
      console.log("we handled NONE sorting");
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
      console.log("we handled ASC sorting");
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
      console.log("we handled DESC sorting");
    }
    setSortColumn(fieldName);
  };
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
          {console.log(data)}
          {data
            .filter((dep) =>
              dep.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((row, index) => {
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
