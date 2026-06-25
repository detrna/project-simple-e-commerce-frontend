import { Product } from "@/@types/Product";
import { Item, itemDetails } from "./Item";
import { useMemo } from "react";

export default function ProductsList({ products }: { products: Product[] }) {
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
        <Item className="w-[calc(25%-1rem)]" {...item} key={item.id} />
      )),
    [items],
  );

  return generatedItems;
}
