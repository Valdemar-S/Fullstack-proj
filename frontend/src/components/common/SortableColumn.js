import { useState, useEffect } from "react";

import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

export default function SortableColumn({
  title,
  fieldName,
  updateSorting,
  setResetSortOrderFunc,
  removeResetSortOrderFunc,
}) {
  const [sortingOrder, setSortingOrder] = useState(0);

  useEffect(() => {
    setResetSortOrderFunc({
      fieldName: fieldName,
      resetFunc: () => setSortingOrder(0),
    });
    return () => {
      removeResetSortOrderFunc();
    };
  }, []);

  return (
    <th
      style={{ cursor: "pointer" }}
      onClick={() => {
        switch (sortingOrder) {
          case 0: // First click
            updateSorting(fieldName, 1);
            setSortingOrder(1);
            break;
          case 1: // ASC
            updateSorting(fieldName, 2);
            setSortingOrder(2);
            break;
          case 2: // DESC
            updateSorting(fieldName, 1);
            setSortingOrder(1);
            break;
          default:
            return;
        }
      }}
    >
      {title}
      {sortingOrder > 0 ? (
        sortingOrder === 1 ? (
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
