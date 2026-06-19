import { Item, itemDetails } from "@/components/Item";
import { Sidebar } from "@/components/Sidebar";

const itemPlaceholder: itemDetails = {
  image: "/item.jpg",
  store: "Store name",
  name: "Name",
  price: 10000,
  address: "Address",
  star: 5.0,
  sold: 5000,
};

export default function Home() {
  return (
    <div className="flex gap-8 p-8">
      <div className="fixed w-64 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col gap-4 w-full ml-80">
        <div className="flex w-full justify-end items-center gap-1 cursor-pointer">
          <p className="text-white-3 text-lg">SORT BY</p>
          <p className="text-white-3 text-[1.3rem]">⇌</p>
        </div>

        <div className="grid grid-cols-4 w-full gap-y-8">
          <Item {...itemPlaceholder}></Item>
          <Item {...itemPlaceholder}></Item>
          <Item {...itemPlaceholder}></Item>
          <Item {...itemPlaceholder}></Item>
          <Item {...itemPlaceholder}></Item>
        </div>
      </div>
    </div>
  );
}
