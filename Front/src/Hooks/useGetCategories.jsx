import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../config/axio";

function useGetCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/category");
      return res?.data?.data;
    },
  });

  return { data, isLoading };
}

export default useGetCategories;
