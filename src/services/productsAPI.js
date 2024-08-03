import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch products
const fetchProducts = async ({ queryKey }) => {
  const [_, limit, skip] = queryKey;
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

// Custom hook for fetching products
const useProductList = (limit, skip) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["ProductApi", limit, skip],
    queryFn: fetchProducts,
  });

  return { data, isPending, isError };
};

export default useProductList;
