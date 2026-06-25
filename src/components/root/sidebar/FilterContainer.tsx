import { ReactNode, useContext } from "react";
import { ProductQueries } from "@/@types/ProductQueries";
import FilterBox from "./FilterBox";

export default function FilterContainer({
  filters,
}: {
  filters: string[];
}): ReactNode {
  return (
    <>
      {filters.map((k, i) => (
        <div className="flex flex-col" key={i}>
          <FilterBox text={k}></FilterBox>
        </div>
      ))}
    </>
  );
}
