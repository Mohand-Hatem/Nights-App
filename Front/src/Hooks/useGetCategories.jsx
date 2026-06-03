import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import { cacheTimes } from "../lib/queryClient";
import { queryKeys } from "../lib/queryKeys";

function useGetCategories() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      const res = await axiosInstance.get("/category");
      return res?.data?.data;
    },
    ...cacheTimes.categories,
  });

  return { data, isLoading };
}

export default useGetCategories;
