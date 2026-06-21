"use client";

import { Category } from "@/@types/Category";
import { Filter } from "@/@types/Filters";
import React, { ReactNode, useRef, useState } from "react";

export type SidebarProps = {
  categories: Category[];
  filters: string[];
  filterFunction(filter: Filter): void;
};

type FilterObject = {
  price?: Price;
  location: Location;
};

type Price = {
  literal: "Price";
  priceMax?: number;
  priceMin?: number;
  expanded: boolean;
};

type Location = {
  literal: "Location";
  cities?: string[];
  expanded: boolean;
};

const filtered: FilterObject = {
  price: {
    literal: "Price",
    priceMax: 10000,
    priceMin: 1000,
    expanded: false,
  },
  location: { literal: "Location", expanded: false },
};

function PriceSlider({
  priceMinInput,
  priceMaxInput,
  filterFunction,
}: {
  priceMinInput: React.RefObject<HTMLInputElement>;
  priceMaxInput: React.RefObject<HTMLInputElement>;
  filterFunction(filter: Filter): void;
}): ReactNode {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between gap-8">
        <div className="w-24">
          <p className="text-white-3">From</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterFunction({
              priceMin: priceMinInput.current?.value,
            });
          }}
        >
          <input
            className="text-white-2 bg-black-4 no-spinner w-full rounded-md p-1 px-4 outline-none"
            placeholder=": "
            ref={priceMinInput}
            type="number"
          ></input>
        </form>
      </div>
      <div className="flex items-center gap-8">
        <div className="w-24">
          <p className="text-white-3">To</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            filterFunction({
              priceMax: priceMaxInput.current?.value,
            });
          }}
        >
          <input
            className="text-white-2 bg-black-4 no-spinner w-full rounded-md p-1 px-4 outline-none"
            placeholder=": "
            ref={priceMaxInput}
            type="number"
          ></input>
        </form>
      </div>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  const [filterss, setFilters] = useState<FilterObject>(filtered);
  const priceMinInput = useRef<HTMLInputElement>(null);
  const priceMaxInput = useRef<HTMLInputElement>(null);

  function categoryContainer(categories: Category[]): ReactNode {
    const category = categories.map((c) => (
      <div
        className="flex cursor-pointer items-center gap-3"
        key={c.name}
        onClick={() => {
          props.filterFunction({ category: c.name.toUpperCase() });
        }}
      >
        <img className="size-5" src="/globe.svg"></img>
        <p className="text-white-2 text-md">{c.name}</p>
      </div>
    ));

    return category;
  }

  function expand(key: string) {
    const test = Object.fromEntries(
      Object.entries(filterss).map(([k, v]) => {
        if (k === key) {
          return [k, { ...v, expanded: v.expanded ? false : true }];
        }
        return [k, v];
      }),
    );

    setFilters((prev) => {
      return { ...prev, ...test };
    });
  }

  function priceExpanded(filters: FilterObject): ReactNode {
    const filterContainer = Object.entries(filters).map(([k, v]) => {
      return (
        <div className="flex flex-col" key={k}>
          <div
            className={
              `bg-black-5 z-10 flex cursor-pointer items-center justify-between p-2 outline-1 outline-[#373737] ` +
              (v.expanded ? `rounded-tl-md rounded-tr-md` : `rounded-md`)
            }
            key={k}
            onClick={() => expand(k)}
          >
            <div className="flex items-center gap-3">
              <img className="size-5" src="/globe.svg"></img>
              <p className="text-white-2 text-md">{v.literal}</p>
            </div>
            <div>
              <p className="text-white-3 text-md font-medium">❯</p>
            </div>
          </div>

          {v.expanded && (
            <div className="bg-black-3 z-0 rounded-br-xl rounded-bl-xl p-4 outline-1 outline-[#373737]">
              {ShowFilterOption(v.literal)}
            </div>
          )}
        </div>
      );
    });
    return filterContainer;
  }

  function ShowFilterOption(key: string): ReactNode {
    let element: ReactNode = <></>;
    switch (key.toLowerCase()) {
      case "price":
        element = (
          <PriceSlider
            priceMinInput={priceMinInput as any}
            priceMaxInput={priceMaxInput as any}
            filterFunction={props.filterFunction}
          />
        );
        break;
      case "location":
        element = <LocationList />;
        break;
    }
    return element;
  }

  function LocationList(): ReactNode {
    return (
      <div className="flex">
        <input
          className="bg-black-2 text-white-1 h-[6vh] w-full rounded-md px-4 outline-none"
          placeholder="Cities . . ."
        />
      </div>
    );
  }

  function sidebarContainer(name: string, components: ReactNode): ReactNode {
    return (
      <div className="bg-black-4 flex flex-col gap-3 rounded-2xl px-4 py-4 outline-1 outline-[#373737]">
        <div>
          <p className="text-white-3 text-sm font-semibold">{name}</p>
        </div>
        <div className="flex flex-col gap-4">{components}</div>
      </div>
    );
  }

  function log() {
    console.log(filterss);
  }

  return (
    <div className="flex h-full w-[20vw] flex-col gap-4">
      <button onClick={() => log()}>LOGGG</button>
      {sidebarContainer("CATEOGRY", categoryContainer(props.categories))}
      {sidebarContainer("FILTERS", priceExpanded(filterss))}
    </div>
  );
}
