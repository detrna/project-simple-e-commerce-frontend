import { Category } from "@/@types/Category";
import { ProductQueries } from "@/@types/ProductQueries";
import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { removeQuery } from "@/lib/router/removeQuery";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function CategoryContainer({
  categories,
}: {
  categories: Category[];
}): ReactNode {
  const router = useRouter();
  const { currentQuery } = useParseSearchQuery<ProductQueries>();

  const addCategory = (newQuery: ProductQueries): void => {
    if (currentQuery.category === newQuery.category)
      return removeQuery<ProductQueries>({
        router,
        currentQuery,
        key: "category",
      });

    pushNewQuery({ router, currentQuery, newQuery });
  };

  return categories.map((c) => (
    <motion.div
      whileHover={{ backgroundColor: "var(--color-black-4)" }}
      className="flex cursor-pointer items-center gap-3 rounded-lg p-1"
      key={c.name}
      onClick={() => {
        addCategory({ category: c.name.toUpperCase() });
      }}
    >
      <img className="size-5" src="/globe.svg"></img>
      <p className="text-white-2 text-md">{c.name}</p>
    </motion.div>
  ));
}
