import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import { cacheTimes } from "../lib/queryClient";
import { queryKeys } from "../lib/queryKeys";

function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: async () => {
      const res = await axiosInstance.get("/cart");
      return res?.data?.cart?.items || [];
    },
    ...cacheTimes.cart,
  });
}

export default useCart;
