import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../config/axio";
import toast from "react-hot-toast";

function useAddCart() {
  const queryClient = useQueryClient();
  const addToCart = useMutation({
    mutationKey: ["addcart"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/cart", values);
    },
    onSuccess: (data) => {
      console.log("Added:", data);
      toast.success("Product Added To Your Cart");
      queryClient.invalidateQueries(["Cart"]);
      queryClient.invalidateQueries(["Count"]);
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong while adding to cart ❌");
    },
  });
  return addToCart;
}

export default useAddCart;
