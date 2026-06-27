import { Product } from "@/@types/Product";
import { ResponseSchema } from "@/@types/Response";
import api from "@/lib/api";
import { useState } from "react";

export function useSearchRecomendations() {
  const [searchRecomendations, setSearchRecomendations] = useState<string[]>(
    [],
  );

  const handleSearchInput = async (input: string): Promise<void> => {
    try {
      if (input === "") return setSearchRecomendations([]);
      input = input.replace(/[^a-zA-Z]/g, "");

      const res: ResponseSchema<Product[]> = await api.get(
        `/products/search/${input}`,
      );

      const productNames = res.data.map((product) =>
        product.name.toLowerCase(),
      );

      setSearchRecomendations(productNames);
    } catch (e) {
      console.error(e);
    }
  };

  return { searchRecomendations, handleSearchInput };
}
