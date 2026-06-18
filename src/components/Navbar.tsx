export function Navbar() {
  return (
    <div className="flex gap-12 h-[8vh] items-center px-4">
      <div className="flex w-[12vw] justify-center">
        <h1 className="text-3x1 font-bold">Simple E-Commerce</h1>
      </div>
      <div className="flex-1">
        <input className="w-full" placeholder="Search here ..."></input>
      </div>
      <div className="size-8 flex items-center">
        <img src={"/ShoppingCartSimple.svg"} />
      </div>
      <div className="flex gap-6 items-center">
        <p>Prabu</p>
        <img className="size-10" src={"/avatar.svg"}></img>
      </div>
    </div>
  );
}
