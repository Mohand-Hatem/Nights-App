import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../config/axio";
import toast from "react-hot-toast";

function useDeleteCart() {
  const queryClient = useQueryClient();

  const deleteCart = useMutation({
    mutationKey: ["deletecart"],
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/cart/${id}`);
    },
    onSuccess: () => {
      toast.success("Product Deleted From Your Cart");
      queryClient.invalidateQueries(["Cart"]);
    },
    onError: (error) => {
      toast.error("Error Deleting From Your Cart");
      console.log(error);
    },
  });

  return deleteCart;
}

export default useDeleteCart;
