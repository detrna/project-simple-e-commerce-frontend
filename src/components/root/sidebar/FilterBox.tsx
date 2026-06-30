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
    <div>
      <motion.div
        animate={{
          borderBottomLeftRadius: expanded ? "0px" : "6px",
          borderBottomRightRadius: expanded ? "0px" : "6px",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
          transition: expanded
            ? { delay: 0, duration: 0.1 }
            : { delay: 0.2, duration: 0.1 },
        }}
        whileHover={{ backgroundColor: "var(--color-black-4)" }}
        className={`bg-sidebar-accent border-border } z-10 flex cursor-pointer items-center justify-between border p-2 pr-3`}
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-sidebar border-border z-0 rounded-br-xl rounded-bl-xl border p-4">
              {showExpanded(text)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
