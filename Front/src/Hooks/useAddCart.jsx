import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../config/axio';
import toast from 'react-hot-toast';
import { queryKeys } from '../lib/queryKeys';

function useAddCart() {
  const queryClient = useQueryClient();
  const addToCart = useMutation({
    mutationKey: ["addcart"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/cart", values);
    },
    onSuccess: () => {
      toast.success("Product Added To Your Cart");
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartCount });
    },
    onError: () => {
      toast.error("Something went wrong while adding to cart ❌");
    },
  });
  return addToCart;
}

export default useAddCart;
