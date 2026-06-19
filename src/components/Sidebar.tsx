import { ReactNode } from "react";

function category(name: string): ReactNode {
  return (
    <div className="flex cursor-pointer items-center gap-3">
      <img className="size-5" src="/globe.svg"></img>
      <p className="text-white-2 text-md">{name}</p>
    </div>
  );
}

function filter(name: string): ReactNode {
  return (
    <div className="bg-black-5 flex cursor-pointer items-center justify-between rounded-md p-2 outline-1 outline-[#373737]">
      <div className="flex items-center gap-3">
        <img className="size-5" src="/globe.svg"></img>
        <p className="text-white-2 text-md">{name}</p>
      </div>
      <div>
        <p className="text-white-3 text-md font-medium">❯</p>
      </div>
    </div>
  );
}

function sidebarBox(name: string, components: ReactNode): ReactNode {
  return (
    <div className="bg-black-4 flex flex-col gap-3 rounded-2xl px-4 py-4 outline-1 outline-[#373737]">
      <div>
        <p className="text-white-3 text-sm font-semibold">{name}</p>
      </div>
      <div className="flex flex-col gap-4">
        {components}
        {components}
        {components}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-full w-[20vw] flex-col gap-4">
      {sidebarBox("CATEOGRY", category("Category-1"))}
      {sidebarBox("FILTERS", filter("Filter-1"))}
    </div>
  );
}
