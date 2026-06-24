import { baseURL } from "@/@types/EnvConstants";
import Link from "next/link";

export type itemDetails = {
  id: string;
  image: string;
  name: string;
  store: string;
  address: string;
  price: number;
  star: number;
  sold: number;
  className?: string;
  placeholder?: boolean;
};

function formatSold(sold: number): string {
  const digits: string[] = sold.toString().split("");
  let text: string = "";

  if (digits.length < 4) {
    return (text = sold.toString());
  } else {
    text = digits[0];
  }

  if (digits[1] !== "0") {
    text += "." + digits[1];
  }

  if (digits.length < 7) {
    text += "k";
  } else if (digits.length < 11) {
    text += "m";
  }

  return text;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trimEnd() + "...";
}

export function Item(props: itemDetails) {
  const displayName = truncateText(props.name, 18);

  return (
    <div className="flex w-[16vw] flex-col justify-center gap-1">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl">
        <Link className="size-full" href={baseURL + "/products/" + props.id}>
          <img className="size-full" src={props.image} alt={props.name} />
        </Link>
      </div>
      <div className="flex justify-between px-3 pb-3">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col flex-wrap -space-y-0.5">
            <p className="text-white-1 text-md" title={props.name}>
              {displayName}
            </p>
            <p className="text-white-2 text-xs whitespace-nowrap">
              {props.store} • {props.address}
            </p>
          </div>
          <p className="text-white-1">${props.price}</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex w-full justify-end gap-0.5">
            <p className="text-white-1 pt-0.5 text-[1rem]">{props.star}</p>
            <p className="text-white-1 text-lg">★</p>
          </div>
          <p className="text-white-2 whitespace-nowrap">
            {formatSold(props.sold)} sold
          </p>
        </div>
      </div>
    </div>
  );
}
