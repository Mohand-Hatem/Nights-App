import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../config/axio';
import toast from 'react-hot-toast';
import { queryKeys } from '../lib/queryKeys';

function useDeleteMovie() {
  const queryClient = useQueryClient();
  const deleteMovie = useMutation({
    mutationKey: ["deletemovie"],
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`book/${id}`);
      return res?.data;
    },
    onSuccess: () => {
      toast.success("Movie deleted successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
    onError: () => {
      toast.error("Something went wrong while deleting the movie");
    },
  });

  return deleteMovie;
}

export default useDeleteMovie;
