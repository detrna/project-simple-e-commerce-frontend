import { itemDetails } from "../Item";

export const itemPlaceholder: itemDetails = {
  id: "id",
  image: "/item.jpg",
  store: "Store name",
  name: "Name",
  price: 10000,
  address: "Address",
  star: 5.0,
  sold: 5000,
};

export const itemsPlaceholder: itemDetails[] = Array.from(
  { length: 4 },
  () => ({
    ...itemPlaceholder,
  }),
);

// const placeholder = items.length % 4;

// if (placeholder !== 0) {
//   for (let i = 4; i > placeholder; i--) {
//     const itemPlaceholders: itemDetails = {
//       ...itemPlaceholder,
//       placeholder: true,
//     };

//     generatedItems.push(
//       <Item
//         className="w-[calc(25%-1rem)] mx-2"
//         key={i + items.length}
//         {...itemPlaceholders}
//       />,
//     );
//   }
// }
