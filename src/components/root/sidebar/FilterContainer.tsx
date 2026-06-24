import { ReactNode } from "react";
import { ProductQueries } from "@/@types/ProductQueries";
import FilterBox from "./FilterBox";

export default function FilterContainer({
  filters,
  execute,
}: {
  filters: string[];
  execute: (filter: ProductQueries) => void;
}): ReactNode {
  return (
    <>
      {filters.map((k, i) => (
        <div className="flex flex-col" key={i}>
          <FilterBox text={k} execute={execute}></FilterBox>
        </div>
      ))}
    </>
  );
}
