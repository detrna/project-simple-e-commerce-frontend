import { Product } from "@/@types/Product";
import { Item, itemDetails } from "./Item";

export default function ProductsList({ products }: { products: Product[] }) {
  const items: itemDetails[] = products.map((product) => {
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

  let generatedItems = items.map((item) => (
    <Item className="w-[calc(25%-1rem)]" {...item} key={item.id} />
  ));

  return generatedItems;
}
