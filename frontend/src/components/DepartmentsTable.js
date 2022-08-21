import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function DepartmentsTable({ departments }) {
  const [sortColumns, setSortColumns] = useState([]);
  const NONE = "none",
    ASC = "asc",
    DESC = "desc";

  const [data, setData] = useState([]);

  function SortableColumn({ title, fieldName, updateSorting }) {
    const [sortingOrder, setSortingOrder] = useState(NONE);
    const icon = "none";

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
          }
        }}
      >
        {title}
        {icon}
      </th>
    );
  }

  const updateSorting = (fieldName, order) => {
    if (sortColumns.length === 1 && order === NONE) {
      // Sort to default if all columns unselected
      setData(data.sort((a, b) => a.id > b.id));
      setSortColumns([]);
    }

    setSortColumns((s) => s.filter((column) => column.fieldName !== fieldName)); // Remove column prev result

    if (order !== NONE) {
      setSortColumns((s) => {
        s.push({ fieldName, order });
        return s;
      }); // Add new column sort state

      // sorting
      /*
    setData(data => {
      return data.sort((a,b => {
        let result = true;
        sortColumns.forEach(element => {
          result = result && (a[element] > b[element])
        });
        
      })) 
    });
    */
    }

    return (
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <SortableColumn
                title="Department Name"
                fieldName="department_name"
                updateSorting={updateSorting}
              />
              <SortableColumn
                title="Department Head"
                fieldName="department_head"
                updateSorting={updateSorting}
              />
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>HR</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>QA</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };
}
