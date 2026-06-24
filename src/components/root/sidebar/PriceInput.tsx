import { ProductQueries } from "@/@types/ProductQueries";
import { FilterContext } from "@/app/page";
import React, { ReactNode, useContext, useRef } from "react";

function InputTextField({
  text,
  objectKey,
}: {
  text: string;
  objectKey: string;
}): ReactNode {
  const input = useRef<HTMLInputElement>(null);

  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("FilterContext not found");
  }

  const execute = context.filterTrigger;

  return (
    <div className="flex items-center gap-8">
      <div className="w-28">
        <p className="text-white-3">{text}</p>
      </div>
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
        />
      </form>
    </div>
  );
}

export function PriceInput(): ReactNode {
  return (
    <div className="flex flex-col items-center gap-4">
      <InputTextField objectKey="priceMin" text="From" />
      <InputTextField objectKey="priceMax" text="To" />
    </div>
  );
}
