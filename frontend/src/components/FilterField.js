import Form from "react-bootstrap/Form";

export default function FilterField(props) {
  return (
    <div>
      <Form.Label htmlFor="inputSearch">Search</Form.Label>
      <Form.Control
        type="text"
        id="inputSearch"
        aria-describedby="SearchHelpBlock"
        onChange={(e) => props.setSearch(e.target.value)}
      />
      <Form.Text id="SearchHelpBlock" muted>
        Find some information in the table by Name
      </Form.Text>
    </div>
  );
}
