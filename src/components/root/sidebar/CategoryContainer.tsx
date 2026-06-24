import { Category } from "@/@types/Category";
import { ProductQueries } from "@/@types/ProductQueries";
import { FilterContext } from "@/app/page";
import { ReactNode, useContext } from "react";

export default function CategoryContainer({
  categories,
}: {
  categories: Category[];
}): ReactNode {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("FilterContext not found");
  }

  const execute = context.filterTrigger;

  return categories.map((c) => (
    <div
      className="flex cursor-pointer items-center gap-3"
      key={c.name}
      onClick={() => {
        execute({ category: c.name.toUpperCase() });
      }}
    >
      <img className="size-5" src="/globe.svg"></img>
      <p className="text-white-2 text-md">{c.name}</p>
    </div>
  ));
}
