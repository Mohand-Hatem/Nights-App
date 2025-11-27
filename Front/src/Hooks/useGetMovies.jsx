import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../config/axio";

function useGetMovies() {
  let { data, isLoading, isError } = useQuery({
    queryKey: ["Books"],
    queryFn: async () => {
      const res = await axiosInstance.get("book");
      return res?.data?.AllBooks;
    },
    staleTime: 1000 * 60 * 2, // 2 دقائق
    cacheTime: 1000 * 60 * 5, // 5 دقائق
  });
  return { data, isLoading, isError };
}

export default useGetMovies;
