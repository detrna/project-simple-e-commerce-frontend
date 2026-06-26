import { Product } from "@/@types/Product";
import { Item } from "./Item";
import { useMemo } from "react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function ProductsList({ products }: { products: Product[] }) {
  const items = useMemo(() => {
    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: "/item.jpg",
        store: product.store!.name,
        address: product.store!.address,
        price: product.variants[0].price,
        star: 5,
        sold: 5000,
      };
    });
  }, [products]);

  let generatedItems = useMemo(
    () =>
      items.map((item) => (
        <motion.div variants={itemVariants} key={item.id}>
          <Item className="w-[calc(25%-1rem)]" {...item} />
        </motion.div>
      )),
    [items],
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-16 flex w-full flex-wrap justify-between gap-y-8"
    >
      {generatedItems}
    </motion.div>
  );
}
