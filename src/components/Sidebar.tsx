import { ReactNode } from "react";

function category(name: string): ReactNode {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <img className="size-5" src="/globe.svg"></img>
      <p className="text-white-2 text-md">{name}</p>
    </div>
  );
}

function filter(name: string): ReactNode {
  return (
    <div className="flex justify-between items-center bg-black-5 outline-1 outline-[#373737] rounded-md p-2 cursor-pointer">
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
    <div className="flex flex-col gap-3 px-4 py-4 bg-black-4 outline-1 outline-[#373737] rounded-2xl">
      <div>
        <p className="text-white-3 font-semibold text-sm">{name}</p>
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
    <div className="flex flex-col h-full w-[20vw] gap-4">
      {sidebarBox("CATEOGRY", category("Category-1"))}
      {sidebarBox("FILTERS", filter("Filter-1"))}
    </div>
  );
}
