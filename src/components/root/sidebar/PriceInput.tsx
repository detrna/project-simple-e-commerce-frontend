import { ProductQueries } from "@/@types/ProductQueries";
import { useParseSearchQuery } from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useRef } from "react";

function InputTextField({
  text,
  objectKey,
  onSubmit,
}: {
  text: string;
  objectKey: string;
  onSubmit: (filter: ProductQueries) => void;
}): ReactNode {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-4">
      <div className="w-20">
        <p className="text-white-3 text-sm">{text}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(Object.fromEntries([[objectKey, input.current?.value]]));
        }}
      >
        <input
          className="text-white-2 bg-black-3 no-spinner w-full rounded-md p-1 px-4 text-sm outline-none"
          placeholder=": "
          ref={input}
          type="number"
        />
      </form>
    </div>
  );
}

export function PriceInput(): ReactNode {
  const router = useRouter();

  const { currentQuery } = useParseSearchQuery<ProductQueries>();

  const handlePriceChange = useCallback(
    (newQuery: ProductQueries) => {
      pushNewQuery<ProductQueries>({
        router,
        currentQuery,
        newQuery,
      });
    },
    [router, currentQuery],
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <InputTextField
        objectKey="priceMin"
        text="From"
        onSubmit={handlePriceChange}
      />
      <InputTextField
        objectKey="priceMax"
        text="To"
        onSubmit={handlePriceChange}
      />
    </div>
  );
}
