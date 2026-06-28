import { useState } from "react";
import { BtnSort } from "./BtnSort";
import { SortList } from "./SortList";

export function SortField() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const resetExpanded = (): void => setExpanded(false);

  return (
    <>
      <BtnSort
        onClick={() => {
          setExpanded((prev) => (prev ? false : true));
        }}
      ></BtnSort>

      <SortList expanded={expanded} resetExpanded={resetExpanded} />
    </>
  );
}
