import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../config/axio";
import toast from "react-hot-toast";

function useDeleteMovie() {
  const queryClient = useQueryClient();
  const deleteMovie = useMutation({
    mutationKey: ["deletemovie"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`book/${id}`);
      console.log(res?.data);
    },
    onSuccess: (data) => {
      toast.success("Product Deleted From Your Cart");
      queryClient.invalidateQueries(["book"]);
      queryClient.invalidateQueries(["Cart"]);
    },
    onError: (error) => {
      console.error("Error Deleting Movie:", error);
      toast.error("Something went wrong while Deleting Movie");
    },
  });

  return deleteMovie;
}

export default useDeleteMovie;
