"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="bg-black-1 flex h-[7.5vh] items-center gap-12 px-4">
      <div className="flex w-[14vw] justify-center">
        <Link href={"/"}>
          <h1 className="text-white-1 cursor-pointer text-[1.2rem] font-normal whitespace-nowrap">
            Simple E-Commerce
          </h1>
        </Link>
      </div>
      <div className="bg-black-2 flex-1 rounded-md px-4 py-1">
        <input
          className="bg-black-2 text-white-1 w-full opacity-35 outline-none"
          placeholder="Search here . . ."
        ></input>
      </div>
      <motion.div
        whileHover={{ backgroundColor: "var(--color-black-3)" }}
        className="flex cursor-pointer items-center rounded-lg px-2"
      >
        <img className="aspect-square w-8" src={"/ShoppingCartSimple.svg"} />
      </motion.div>
      <div className="flex h-full items-center gap-4">
        <p className="text-white-1 text-[1.2rem] font-normal">Username</p>
        <img className="size-8 cursor-pointer" src={"/avatar.svg"}></img>
      </div>
    </div>
  );
}
