import { ReactNode } from "react";

export function SidebarContainer({
  header,
  component,
}: {
  header: string;
  component: ReactNode;
}): ReactNode {
  return (
    <div className="bg-black-2 border-black-5 z-10 flex flex-col gap-3 rounded-lg border px-4 py-4">
      <div>
        <p className="text-white-3 text-sm font-semibold">{header}</p>
      </div>
      <div className="flex flex-col gap-4">{component}</div>
    </div>
  );
}
