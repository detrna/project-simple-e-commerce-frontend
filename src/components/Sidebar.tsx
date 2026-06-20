import { Category } from "@/@types/Category";
import { Filter } from "@/@types/Filters";
import { ReactNode } from "react";

export type SidebarProps = {
  categories: Category[];
  filters: string[];
  filterFunction(filter: Filter): void;
};

export function Sidebar(props: SidebarProps) {
  function categoryContainer(categories: Category[]): ReactNode {
    const category = categories.map((c) => (
      <div
        className="flex cursor-pointer items-center gap-3"
        key={c.name}
        onClick={() => {
          props.filterFunction({ category: c.name.toUpperCase() });
        }}
      >
        <img className="size-5" src="/globe.svg"></img>
        <p className="text-white-2 text-md">{c.name}</p>
      </div>
    ));

    return category;
  }

  function filterContainer(filters: string[]): ReactNode {
    const filter = filters.map((f) => (
      <div
        className="bg-black-5 flex cursor-pointer items-center justify-between rounded-md p-2 outline-1 outline-[#373737]"
        key={f}
      >
        <div className="flex items-center gap-3">
          <img className="size-5" src="/globe.svg"></img>
          <p className="text-white-2 text-md">{f}</p>
        </div>
        <div>
          <p className="text-white-3 text-md font-medium">❯</p>
        </div>
      </div>
    ));

    return filter;
  }

  function sidebarContainer(name: string, components: ReactNode): ReactNode {
    return (
      <div className="bg-black-4 flex flex-col gap-3 rounded-2xl px-4 py-4 outline-1 outline-[#373737]">
        <div>
          <p className="text-white-3 text-sm font-semibold">{name}</p>
        </div>
        <div className="flex flex-col gap-4">{components}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-[20vw] flex-col gap-4">
      {sidebarContainer("CATEOGRY", categoryContainer(props.categories))}
      {sidebarContainer("FILTERS", filterContainer(props.filters))}
    </div>
  );
}
