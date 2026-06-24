// hooks/useCategories.ts
import { useState, useEffect } from "react";
import { Category } from "@/@types/Category";
import { ResponseSchema } from "@/@types/Response";
import api from "@/lib/api";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        setLoading(true);
        const response: ResponseSchema<Category[]> =
          await api.get("/categories");
        setCategories(response.data);
      } catch (e) {
        console.error("Failed to fetch categories:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, categoriesLoading: loading };
}
