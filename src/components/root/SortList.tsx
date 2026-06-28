import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { removeQuery } from "@/lib/router/removeQuery";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type ListItem = {
  text: string;
  icon: string;
  active: boolean;
  value: Record<string, any>;
};

function SortListItems({
  item,
  handleSort,
}: {
  item: ListItem;
  handleSort: (item: ListItem) => void;
}): ReactNode {
  return (
    <>
      <motion.div
        initial={{ backgroundColor: item.active ? "" : "var(--color-black-1)" }}
        animate={{ backgroundColor: item.active ? "var(--color-black-1)" : "" }}
        whileHover={{
          backgroundColor: item.active
            ? "var(--color-black-1)"
            : "var(--color-black-3)",
        }}
        transition={{ duration: 0.1 }}
        className="border-black-4 flex cursor-pointer items-center justify-between border p-2"
        onClick={() => handleSort(item)}
      >
        <div className="flex items-center gap-2">
          <div>
            <img className="size-5" src={item.icon}></img>
          </div>
          <div>
            <p className="text-white-3 m-auto text-sm font-normal whitespace-nowrap">
              {item.text}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function SortList({
  expanded,
  resetExpanded,
}: {
  expanded: boolean;
  resetExpanded: () => void;
}): ReactNode {
  const [items, setItems] = useState<ListItem[]>([
    {
      text: "Price: High to Low",
      icon: "sort/trend-up.svg",
      active: false,
      value: { price: "asc" },
    },
    {
      text: "Price: Low to High",
      icon: "sort/trend-down.svg",
      active: false,
      value: { price: "desc" },
    },
    {
      text: "High Rated",
      icon: "sort/star-3.svg",
      active: false,
      value: { rating: "desc" },
    },
    {
      text: "Best Selling",
      icon: "sort/fire.svg",
      active: false,
      value: { sold: "desc" },
    },
  ]);

  const router = useRouter();
  const { currentQuery } = useParseSearchQuery();

  const handleClick = (item: ListItem) => {
    setItems((prev) =>
      prev.map((v) =>
        v.text === item.text
          ? { ...v, active: v.active ? false : true }
          : { ...v, active: false },
      ),
    );
    resetExpanded();
  };

  const checkRemoval = (item: ListItem): boolean => {
    return Object.entries(currentQuery).some(
      ([k, v]) =>
        k === Object.keys(item.value)[0] &&
        v === Object.entries(item.value)[0][1],
    );
  };

  const resetSortQuery = () => {
    items.forEach((item) => {
      delete currentQuery[Object.keys(item.value)[0]];
    });
  };

  const handleSort = (item: ListItem): void => {
    if (checkRemoval(item))
      return removeQuery({
        router,
        currentQuery,
        key: Object.keys(item.value)[0],
      });

    resetSortQuery();

    pushNewQuery({ router, currentQuery, newQuery: item.value });
  };

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="bg-black-2 border-black-4 fixed mt-12.5 ml-5 flex w-[15vw] flex-col overflow-hidden rounded-xl border shadow-md"
        >
          {items.map((item) => (
            <div onClick={() => handleClick(item)} key={item.text}>
              <SortListItems item={item} handleSort={handleSort} />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
