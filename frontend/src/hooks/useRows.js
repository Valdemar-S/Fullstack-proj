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
        name: "Use Name",
        head: "User Head",
      },
      {
        id: 17,
        name: "Name",
        head: "Head",
      },
      {
        id: 19,
        name: "person",
        head: "human",
      },
      {
        id: 34,
        name: "testName",
        dhead: "testHead",
      },
    ],
    []
  );

  return rows;
}
