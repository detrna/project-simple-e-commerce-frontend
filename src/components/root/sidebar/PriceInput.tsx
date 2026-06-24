import { ProductQueries } from "@/@types/ProductQueries";
import React, { ReactNode, useRef } from "react";

function InputTextField({
  objectKey,
  execute,
}: {
  objectKey: string;
  execute: (filter: ProductQueries) => void;
}): ReactNode {
  const input = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        execute(Object.fromEntries([[objectKey, input.current!.value]]));
      }}
    >
      <input
        className="text-white-2 bg-black-4 no-spinner w-full rounded-md p-1 px-4 outline-none"
        placeholder=": "
        ref={input}
        type="number"
      ></input>
    </form>
  );
}

export function PriceInput({
  execute,
}: {
  execute(filter: ProductQueries): void;
}): ReactNode {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between gap-8">
        <div className="w-24">
          <p className="text-white-3">From</p>
          <InputTextField objectKey="priceMin" execute={execute} />
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="w-24">
          <p className="text-white-3">To</p>
          <InputTextField objectKey="priceMax" execute={execute} />
        </div>
      </div>
    </div>
  );
}
