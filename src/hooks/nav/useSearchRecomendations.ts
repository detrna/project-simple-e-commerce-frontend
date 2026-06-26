import { ResponseSchema } from "@/@types/Response";
import api from "@/lib/api";
import { useState } from "react";

export function useSearchRecomendations() {
  const [searchRecomendations, setSearchRecomendations] = useState<string[]>(
    [],
  );

  const handleSearchInput = async (input: string): Promise<void> => {
    const query = `input=${input}`;

    try {
      const res: ResponseSchema<string[]> = await api.get(
        `/products/search?${query}`,
      );

      setSearchRecomendations(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return { searchRecomendations, handleSearchInput };
}
