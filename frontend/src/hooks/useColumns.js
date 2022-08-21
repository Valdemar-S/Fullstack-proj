import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Department Name",
        accessor: "department_name"
      },
      {
        Header: "Department Name",
        accessor: "department_head"
      }
    ],
    []
  );

  return columns;
}
