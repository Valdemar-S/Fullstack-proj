import { useTable, useSortBy } from "react-table";
//import useRows from "../hooks/useRows";

import { Link } from "react-router-dom";

import axios from "axios";

export default function DepUserList({ columns, data }) {
  //const data = useRows();
  const table = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  const deleteDepUser = async (id) => {
    await axios.delete(`http://localhost:5000/department/${id}`);

    //getDepUsers();
  };

  return (
    <div className="container">
      <Link to="/add" className="button is-primary mt-2">
        Add New
      </Link>
      <input
        type="text"
        id="myInput"
        onKeyUp={function myFunction() {
          var input, filter, table, tr, td, i, txtValue;
          input = document.getElementById("myInput");
          filter = input.value.toUpperCase();
          table = document.getElementById("myTable");
          tr = table.getElementsByTagName("tr");
          for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            }
          }
        }}
        placeholder="Search for names.."
        title="Type in a name"
      />

      {/* Apply the table props */}
      <table {...getTableProps()} id="myTable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Aplicamos las propiedades de ordenación a cada columna
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                  <td>
                    <Link to={`/edit/${row.id}`}>Edit</Link>
                  </td>
                  <td>
                    <button
                      className="delete-button"
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
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
