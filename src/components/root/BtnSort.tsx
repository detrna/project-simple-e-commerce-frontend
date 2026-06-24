import { ReactNode } from "react";

export function BtnSort({ log }: { log(): void }): ReactNode {
  return (
    <div className="bg-black-4 fixed right-8 rounded-lg p-1 px-4">
      <div className="flex w-full cursor-pointer items-center justify-end gap-1">
        <p className="text-white-3 text-lg" onClick={() => log()}>
          SORT BY
        </p>
        <p className="text-white-3 text-[1.3rem]">⇌</p>
      </div>
    </div>
  );
}
