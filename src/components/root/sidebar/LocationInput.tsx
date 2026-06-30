import { ProductQueries } from "@/@types/ProductQueries";
import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { removeQuery } from "@/lib/router/removeQuery";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode, useMemo, useRef } from "react";

function AddedLocation({
  text,
  removeLocation,
}: {
  text: string;
  removeLocation: (location: string) => void;
}): ReactNode {
  return (
    <motion.div
      layout
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      className="flex items-center gap-8"
    >
      <motion.div
        layout
        className="bg-black-4 text-white-2 text-md flex w-full items-center justify-between gap-2 rounded-md px-4 py-2 font-medium"
      >
        <p className="m-auto">{text}</p>
        <p
          onClick={() => removeLocation(text)}
          className="m-auto scale-x-[1.3] cursor-pointer text-xs font-semibold"
        >
          X
        </p>
      </motion.div>
    </motion.div>
  );
}

export function LocationInput(): ReactNode {
  const router = useRouter();
  const locationsInput = useRef<HTMLInputElement>(null);

  const { currentQuery } = useParseSearchQuery<ProductQueries>();

  const locations = currentQuery.locations ?? [];
  const locationsArray = useMemo(
    () => (Array.isArray(locations) ? locations : [locations]),
    [locations],
  );

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
            className="bg-black-3 text-white-1 h-[6vh] w-full rounded-md px-4 outline-none"
            placeholder="Cities . . ."
          />
        </form>
      </div>
      <div className="flex justify-start gap-4 overflow-x-auto pb-2">
        <AnimatePresence>
          {locationsArray.length !== 0 &&
            locationsArray.map((location) => {
              if (location === "" || !location) return;
              return (
                <AddedLocation
                  key={location}
                  text={location!}
                  removeLocation={removeLocation}
                ></AddedLocation>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}
