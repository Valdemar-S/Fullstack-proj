import useColumns from "../hooks/useColumns";
import { useEffect } from "react";
import DepUsersList from "../components/DepartmentUserList";
import { useState } from "react";
import axios from "axios";

export default function DepartmentsPage() {
  const columns = useColumns();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios("http://localhost:5000/department")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally((_) => {
        setLoading(true);
      });
  }, []);

  return loading && <DepUsersList data={data} columns={columns} />;
}
