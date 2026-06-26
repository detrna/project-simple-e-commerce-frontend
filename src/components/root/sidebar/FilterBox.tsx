import { ReactNode, useState } from "react";
import { LocationInput } from "./LocationInput";
import { PriceInput } from "./PriceInput";
import { AnimatePresence, motion } from "motion/react";

function showExpanded(key: string): ReactNode {
  let element: ReactNode = <></>;
  switch (key.toLowerCase()) {
    case "price":
      element = <PriceInput />;
      break;
    case "locations":
      element = <LocationInput />;
      break;
  }
  return element;
}

export function FilterBox({ text }: { text: string }): ReactNode {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <motion.div>
      <motion.div
        className={`bg-black-3 border-black-5 z-10 flex cursor-pointer items-center justify-between border p-2 pr-3 ${
          expanded ? `rounded-tl-md rounded-tr-md` : `rounded-md`
        }`}
        onClick={() => {
          setExpanded(expanded ? false : true);
        }}
      >
        <div className="flex items-center gap-3">
          <img className="size-5" src="/globe.svg"></img>
          <p className="text-white-2 text-md">{text}</p>
        </div>
        <div
          className={`transition-all duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
        >
          <p className={`text-white-3 text-md font-medium`}>❯</p>
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-black-2 border-black-5 z-0 rounded-br-xl rounded-bl-xl border p-4">
              {showExpanded(text)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
