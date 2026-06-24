import { ReactNode, useState } from "react";
import LocationInput from "./LocationInput";
import { PriceInput } from "./PriceInput";
import { ProductQueries } from "@/@types/ProductQueries";

function showExpanded(
  key: string,
  execute: (filter: ProductQueries) => void,
): ReactNode {
  let element: ReactNode = <></>;
  switch (key.toLowerCase()) {
    case "price":
      element = <PriceInput execute={execute} />;
      break;
    case "locations":
      element = <LocationInput execute={execute} />;
      break;
  }
  return element;
}

export default function FilterBox({
  text,
  execute,
}: {
  text: string;
  execute: (filter: ProductQueries) => void;
}): ReactNode {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <>
      <div
        className={
          `bg-black-5 z-10 flex cursor-pointer items-center justify-between p-2 outline-1 outline-[#373737] ` +
          (expanded ? `rounded-tl-md rounded-tr-md` : `rounded-md`)
        }
        onClick={() => {
          setExpanded(expanded ? false : true);
        }}
      >
        <div className="flex items-center gap-3">
          <img className="size-5" src="/globe.svg"></img>
          <p className="text-white-2 text-md">{text}</p>
        </div>
        <div>
          <p className="text-white-3 text-md font-medium">❯</p>
        </div>
      </div>
      {expanded && (
        <div className="bg-black-3 z-0 rounded-br-xl rounded-bl-xl p-4 outline-1 outline-[#373737]">
          {showExpanded(text, execute)}
        </div>
      )}
    </>
  );
}
