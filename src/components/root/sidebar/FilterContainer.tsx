import { ReactNode } from "react";
import { FilterBox } from "./FilterBox";

export function FilterContainer({ filters }: { filters: string[] }): ReactNode {
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
