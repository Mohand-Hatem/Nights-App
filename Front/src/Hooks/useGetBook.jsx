import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import { cacheTimes } from "../lib/queryClient";
import { queryKeys } from "../lib/queryKeys";

function useGetBook(id) {
  return useQuery({
    queryKey: queryKeys.singleBook(id),
    queryFn: async () => {
      const res = await axiosInstance.get(`book/${id}`);
      return res?.data;
    },
    enabled: Boolean(id),
    ...cacheTimes.singleBook,
  });
}

export default useGetBook;
