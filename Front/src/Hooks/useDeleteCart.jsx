import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import toast from "react-hot-toast";
import { queryKeys } from "../lib/queryKeys";

function useDeleteCart() {
  const queryClient = useQueryClient();

  const deleteCart = useMutation({
    mutationKey: ["deletecart"],
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/cart/${id}`);
    },
    onSuccess: () => {
      toast.success("Product Deleted From Your Cart");
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartCount });
    },
    onError: () => {
      toast.error("Error Deleting From Your Cart");
    },
  });

  return deleteCart;
}

export default useDeleteCart;
