import { ProductQueries } from "@/@types/ProductQueries";
import { ReactNode, useRef } from "react";

export default function LocationInput({
  execute,
}: {
  execute(filter: ProductQueries): void;
}): ReactNode {
  const locationsInput = useRef<HTMLInputElement>(null);
  return (
    <div className="flex">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          execute({
            locations: [locationsInput.current!.value],
          });
        }}
      >
        <input
          className="bg-black-2 text-white-1 h-[6vh] w-full rounded-md px-4 outline-none"
          placeholder="Cities . . ."
        />
      </form>
    </div>
  );
}
