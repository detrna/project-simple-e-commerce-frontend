import Link from "next/link";

export type itemDetails = {
  image: string;
  name: string;
  store: string;
  address: string;
  price: number;
  star: number;
  sold: number;
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

export function Item(props: itemDetails) {
  return (
    <div className="flex flex-col w-[16vw] justify-center gap-3">
      <div className="flex justify-center items-center aspect-square rounded-3xl overflow-hidden">
        <Link className="size-full" href={""}>
          <img className="size-full" src={props.image} alt={props.name} />
        </Link>
      </div>
      <div className="flex justify-between px-3">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col -space-y-0.5">
            <p className="text-white-1 text-lg">{props.name}</p>
            <p className="text-white-2 text-xs whitespace-nowrap">
              {props.store} • {props.address}
            </p>
          </div>
          <p className="text-white-1">${props.price}</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-end w-full gap-0.5">
            <p className="text-white-1 text-[1rem] pt-0.5">{props.star}</p>
            <p className="text-white-1 text-lg">★</p>
          </div>
          <p className="whitespace-nowrap text-white-2">
            {formatSold(props.sold)} sold
          </p>
        </div>
      </div>
    </div>
  );
}
