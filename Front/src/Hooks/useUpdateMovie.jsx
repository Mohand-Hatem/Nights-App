import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../config/axio";
import useGetMovies from "./useGetMovies";
import toast from "react-hot-toast";

function useUpdateMovie() {
  const queryClient = useQueryClient();
  const updateMovie = useMutation({
    mutationKey: ["updatemovie"],
    mutationFn: async ({ id, newData }) => {
      const res = axiosInstance.put(`book/${id}`, newData);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Movie Updated Successfuly");
      queryClient.invalidateQueries(["Books"]);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Error Update Movie");
      console.log(error);
    },
    onMutate: () => {
      toast.loading("Please wait, Updating movie..", { duration: 10000 });
    },
  });
  return updateMovie;
}

export default useUpdateMovie;
