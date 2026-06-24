import { ProductQueries } from "@/@types/ProductQueries";
import { FilterContext } from "@/app/page";
import { ReactNode, useContext, useRef } from "react";

function AddedLocation({
  text,
  execute,
}: {
  text: string;
  execute: (newQuery: ProductQueries) => void;
}): ReactNode {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-black-5 text-white-2 text-md flex w-full items-center justify-between rounded-md px-4 py-2 font-medium">
        <p>{text}</p>
        <p
          onClick={() => execute({ locations: text })}
          className="scale-x-[1.3] cursor-pointer text-xs font-semibold"
        >
          X
        </p>
      </div>
    </div>
  );
}

export default function LocationInput(): ReactNode {
  const locationsInput = useRef<HTMLInputElement>(null);

  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("FilterContext not found");
  }

  const locations = context.currentQuery.locations;
  const locationsArray = Array.isArray(locations) ? locations : [locations];
  const execute = context.filterTrigger;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            execute({
              locations: locationsInput.current!.value,
            });
          }}
        >
          <input
            ref={locationsInput}
            className="bg-black-2 text-white-1 h-[6vh] w-full rounded-md px-4 outline-none"
            placeholder="Cities . . ."
          />
        </form>
      </div>
      {locationsArray.length !== 0 &&
        locationsArray.map((location, i) => {
          if (location === "" || !location) return;
          return (
            <AddedLocation
              key={i}
              text={location!}
              execute={execute}
            ></AddedLocation>
          );
        })}
    </div>
  );
}
