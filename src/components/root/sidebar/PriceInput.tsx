import { ProductQueries } from "@/@types/ProductQueries";
import useParseSearchQuery from "@/hooks/root/useParseSearchQuery";
import { pushNewQuery } from "@/lib/router/pushNewQuery";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useRef } from "react";

function InputTextField({
  text,
  objectKey,
  router,
}: {
  text: string;
  objectKey: string;
  router: AppRouterInstance;
}): ReactNode {
  const input = useRef<HTMLInputElement>(null);

  const { currentQuery } = useParseSearchQuery<ProductQueries>();

  return (
    <div className="flex items-center gap-8">
      <div className="w-28">
        <p className="text-white-3">{text}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pushNewQuery({
            router,
            currentQuery,
            newQuery: Object.fromEntries([[objectKey, input.current?.value]]),
          });
        }}
      >
        <input
          className="text-white-2 bg-black-4 no-spinner w-full rounded-md p-1 px-4 outline-none"
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

  return (
    <div className="flex flex-col items-center gap-4">
      <InputTextField objectKey="priceMin" text="From" router={router} />
      <InputTextField objectKey="priceMax" text="To" router={router} />
    </div>
  );
}
