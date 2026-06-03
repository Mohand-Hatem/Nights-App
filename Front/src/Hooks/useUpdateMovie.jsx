import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../config/axio';
import toast from 'react-hot-toast';
import { queryKeys } from '../lib/queryKeys';

function useUpdateMovie() {
  const queryClient = useQueryClient();
  const updateMovie = useMutation({
    mutationKey: ["updatemovie"],
    mutationFn: async ({ id, newData }) => {
      const res = await axiosInstance.put(`book/${id}`, newData);
      return res?.data;
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Movie Updated Successfuly");
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error Update Movie");
    },
    onMutate: () => {
      toast.loading("Please wait, Updating movie..", { duration: 10000 });
    },
  });
  return updateMovie;
}

export default useUpdateMovie;
