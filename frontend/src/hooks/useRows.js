import { useMemo } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useRows() {
  /* useEffect(() => {
    (async function () {
      const response = await axios.get(url);
    })();
  }, [url]);
  */
  const rows = useMemo(
    () => [
      {
        id: 12,
        department_name: "Use Name",
        department_head: "User Head",
      },
      {
        id: 17,
        department_name: "Name",
        department_head: "Head",
      },
      {
        id: 19,
        department_name: "person",
        department_head: "human",
      },
      {
        id: 34,
        department_name: "testName",
        department_head: "testHead",
      },
    ],
    []
  );

  return rows;
}
