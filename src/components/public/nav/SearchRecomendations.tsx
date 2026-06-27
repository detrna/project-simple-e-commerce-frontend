import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { dropdown, easeInOutTransition } from "@/lib/animation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeQuery } from "@/lib/router/removeQuery";

export const handleSearch = ({
  router,
  currentQuery,
  input,
}: {
  router: AppRouterInstance;
  currentQuery: Record<string, any>;
  input: string;
}): void => {
  if (input === "") return removeQuery({ router, currentQuery, key: "search" });

  return pushNewQuery({
    router,
    currentQuery,
    newQuery: { search: input },
  });
};

export function SearchRecomendation({
  recomendations,
}: {
  recomendations: string[];
}) {
  const router = useRouter();
  const { currentQuery } = useParseSearchQuery();

  return (
    <motion.div
      layout
      key="dropdown"
      variants={dropdown}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={easeInOutTransition}
      className="bg-black-2 border-black-5 absolute top-full left-0 -z-50 mt-4 flex w-full flex-col overflow-visible rounded-lg border px-2 py-2 shadow-2xl"
    >
      <AnimatePresence initial={false}>
        {recomendations.map((v) => (
          <motion.div
            key={v}
            layout
            variants={dropdown}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
            transition={easeInOutTransition}
          >
            <motion.div
              whileHover={{ backgroundColor: "var(--color-black-5)" }}
              className="text-white-3 -1 w-full cursor-pointer rounded-2xl px-2 py-0.5"
              onClick={() =>
                handleSearch({ router, currentQuery, input: v.toUpperCase() })
              }
            >
              {v}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
