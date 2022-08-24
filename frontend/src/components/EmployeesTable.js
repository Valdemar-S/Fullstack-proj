import Table from "react-bootstrap/Table";
const EmpoyeesTable = () => {
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <td>Full name</td>
            <td>Email</td>
            <td>Department</td>
            <td>Head of Department</td>
            <td>Start date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};
export default EmpoyeesTable;
