"use client";

import { useSearchRecomendations } from "@/hooks/nav/useSearchRecomendations";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { handleSearch, SearchRecomendation } from "./SearchRecomendations";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";

export function Navbar() {
  const router = useRouter();

  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const { currentQuery } = useParseSearchQuery();
  const { searchRecomendations, handleSearchInput } = useSearchRecomendations();

  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "/") return;
    if (searchFocus) return;

    handleSearchInput(e.key);

    setSearchFocus(true);

    searchInputRef.current?.focus();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchFocus]);

  return (
    <div className="bg-black-1 flex h-[7.5vh] items-center gap-12 px-4">
      <div className="flex w-[14vw] justify-center">
        <Link href={"/"}>
          <h1 className="text-white-1 cursor-pointer text-[1.2rem] font-normal whitespace-nowrap">
            Simple E-Commerce
          </h1>
        </Link>
      </div>
      <div className="bg-black-2 relative min-w-0 flex-1 rounded-md px-4 py-1">
        <div className="flex w-full flex-col">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchInputRef.current?.blur();
              handleSearch({
                router,
                currentQuery,
                input: searchInputRef.current?.value.toUpperCase() ?? "",
              });
            }}
          >
            <input
              onKeyDown={(e) => {
                if (e.key === "/") e.preventDefault();
              }}
              onClick={() => setSearchFocus(searchFocus ? false : true)}
              onBlur={() => setSearchFocus(false)}
              onChange={(e) => handleSearchInput(e.target.value)}
              ref={searchInputRef}
              className="bg-black-2 text-white-1 w-full opacity-35 outline-none"
              pattern="[a-zA-Z]+"
              placeholder="Search here . . ."
            ></input>
          </form>
        </div>
        <AnimatePresence>
          {searchFocus && searchRecomendations.length !== 0 && (
            <SearchRecomendation recomendations={searchRecomendations} />
          )}
        </AnimatePresence>
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
