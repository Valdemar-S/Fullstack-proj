import Table from "react-bootstrap/Table";

export default function DepartmentsTable({departments}) {
  
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Department Head</th>
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
}
