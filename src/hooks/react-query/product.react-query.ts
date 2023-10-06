import { API_URL } from "config/constant";
import { useQuery } from "react-query";

export const useSearchProducts = (value: string) => {
  const { data, isLoading, error } = useQuery(
    ["search/products", value],
    async () => {
      debugger;
      if (value.length > 0) {
        const response = await fetch(
          `${API_URL}/api/products/search/?searchTerm=${value}`
        );
        const products = await response.json();
        return products;
      }
    }
  );
  return { data, isLoading, error };
};
