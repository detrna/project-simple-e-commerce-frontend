import { ReactNode } from "react";

export default function SidebarContainer({
  header,
  component,
}: {
  header: string;
  component: ReactNode;
}): ReactNode {
  return (
    <div className="bg-black-4 flex flex-col gap-3 rounded-2xl px-4 py-4 outline-1 outline-[#373737]">
      <div>
        <p className="text-white-3 text-sm font-semibold">{header}</p>
      </div>
      <div className="flex flex-col gap-4">{component}</div>
    </div>
  );
}
