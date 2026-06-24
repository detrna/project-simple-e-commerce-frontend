import { Product } from "@/@types/Product";
import { ResponseSchema } from "@/@types/Response";
import api from "@/lib/api";
import { objectToSearchQuery } from "@/lib/objectToSearchQuery";
import { useEffect, useRef, useState } from "react";

export default function useProduct({
  dependencies,
  currentQuery,
  searchParams,
}: {
  dependencies: any;
  currentQuery: object;
  searchParams: URLSearchParams;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFetching = useRef<boolean>(false);
  const cursor = useRef<string>("");
  const hasMore = useRef<boolean>(true);

  const fetchProducts = async (): Promise<void> => {
    if (!hasMore.current || isFetching.current) return;

    try {
      setIsLoading(true);
      isFetching.current = true;

      const query = objectToSearchQuery(currentQuery);
      const res: ResponseSchema<Product[]> = await api.get(
        `/products?limit=8&cursor=${cursor.current}&${query}`,
      );

      if (res.data.length === 0) {
        hasMore.current = false;
        return;
      }

      hasMore.current = res.meta.pagination!.hasMore ? true : false;
      cursor.current = res.meta.pagination!.cursor ?? "";

      setProducts((prev) => [...prev, ...res.data]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  };

  const resetProductsList = (): void => {
    cursor.current = "";
    hasMore.current = true;
    setProducts([]);
  };

  useEffect(() => {
    resetProductsList();
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [resetProductsList]);

  useEffect(() => {
    fetchProducts();
  }, dependencies);

  return { products, productsLoading: isLoading, hasMore };
}
