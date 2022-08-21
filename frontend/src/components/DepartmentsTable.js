import { useState } from "react";
import Table from "react-bootstrap/Table";

import { useEffect } from "react";
import axios from "axios";

import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

export default function DepartmentsTable({ departments }) {
  const NONE = "none",
    ASC = "asc",
    DESC = "desc";

  const [sortingColumn, setSortColumn] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/department")
      .then((res) => {
        
        setData(res.data);
        console.log(data)
      })
      .catch((err) => console.log(err))
      .finally((_) => {
        setLoading(true);
      });
  }, []);

  function SortableColumn({ title, fieldName, updateSorting }) {
    const [sortingOrder, setSortingOrder] = useState(NONE);

    return (
      <th
        onClick={() => {
          switch (sortingOrder) {
            case NONE:
              setSortingOrder(ASC);
              // update icon
              updateSorting(fieldName, ASC);
              break;
            case ASC:
              setSortingOrder(DESC);

              updateSorting(fieldName, DESC);
              break;
            case DESC:
              setSortingOrder(NONE);

              updateSorting(fieldName, NONE);
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

  const updateSorting = (fieldName, order) => {
    if (order === NONE) {
      // Sort to default if all columns unselected.
      setData(data.sort((a, b) => a.id > b.id));
      setSortColumn("");
    } else if (order === ASC) {
      setData(data.sort((a, b) => a[fieldName] > b[fieldName]));
    } else if (order === DESC) {
      setData(data.sort((a, b) => a[fieldName] < b[fieldName]));
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
              return <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.head}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>;
            })}
        </tbody>
      </Table>
    </div>
  );
}
