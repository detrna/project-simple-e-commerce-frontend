import { ProductQueries } from "@/@types/ProductQueries";
import useParseSearchQuery from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { removeQuery } from "@/lib/router/removeQuery";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";

function AddedLocation({
  text,
  removeLocation,
}: {
  text: string;
  removeLocation: (location: string) => void;
}): ReactNode {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="bg-black-5 text-white-2 text-md flex w-full items-center justify-between rounded-md px-4 py-2 font-medium">
        <p>{text}</p>
        <p
          onClick={() => removeLocation(text)}
          className="scale-x-[1.3] cursor-pointer text-xs font-semibold"
        >
          X
        </p>
      </div>
    </div>
  );
}

export default function LocationInput(): ReactNode {
  const router = useRouter();
  const locationsInput = useRef<HTMLInputElement>(null);

  const { currentQuery } = useParseSearchQuery<ProductQueries>();

  const locations = currentQuery.locations ?? [];
  const locationsArray = Array.isArray(locations) ? locations : [locations];

  const addLocation = (location: string): void => {
    if (locationsArray.some((l) => l === location)) return;

    const newLocation = [...locationsArray, location];

    pushNewQuery({
      router,
      currentQuery,
      newQuery: { locations: newLocation },
    });
  };

  const removeLocation = (location: string): void => {
    const filteredLocations = locationsArray.filter((l) => l !== location);

    if (filteredLocations.length === 0)
      return removeQuery({
        router,
        currentQuery,
        key: "locations",
      });

    pushNewQuery({
      router,
      currentQuery,
      newQuery: { locations: filteredLocations },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addLocation(locationsInput.current!.value);
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
              removeLocation={removeLocation}
            ></AddedLocation>
          );
        })}
    </div>
  );
}
