import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../config/axio';
import { cacheTimes } from '../lib/queryClient';
import { queryKeys } from '../lib/queryKeys';

function useGetMovies() {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.books,
    queryFn: async () => {
      const res = await axiosInstance.get("book");
      return res?.data?.AllBooks;
    },
    ...cacheTimes.books,
  });
  return { data, isLoading, isError };
}

export default useGetMovies;
