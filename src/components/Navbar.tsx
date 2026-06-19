export function Navbar() {
  return (
    <div className="flex gap-12 h-[8vh] items-center px-4 bg-black-1">
      <div className="flex w-[14vw] justify-center">
        <h1 className="text-[1.2rem] font-normal text-white-1 cursor-pointer">
          Simple E-Commerce
        </h1>
      </div>
      <div className="flex-1 bg-black-2 py-1 px-4 rounded-md">
        <input
          className="w-full bg-black-2 opacity-35 text-white-1 outline-none"
          placeholder="Search here . . ."
        ></input>
      </div>
      <div className="size-8 flex items-center cursor-pointer">
        <img src={"/ShoppingCartSimple.svg"} />
      </div>
      <div className="h-full flex items-center gap-4 items-center">
        <p className="font-normal text-white-1 text-[1.2rem]">Username</p>
        <img className="size-8 cursor-pointer" src={"/avatar.svg"}></img>
      </div>
    </div>
  );
}
