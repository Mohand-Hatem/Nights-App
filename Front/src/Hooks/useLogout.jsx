import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axio';
import toast from 'react-hot-toast';
import { queryKeys } from '../lib/queryKeys';

function useLogout() {
  const homeNavi = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const res = await axiosInstance.post("/user/logout");
      return res?.data;
    },
    onSuccess: () => {
      toast.success("User Logged Out");
      toast.loading("Redirecting...", { duration: 1000 });

      queryClient.setQueryData(queryKeys.profile, null);
      queryClient.removeQueries({ queryKey: queryKeys.profile });
      queryClient.removeQueries({ queryKey: queryKeys.cart });
      queryClient.removeQueries({ queryKey: queryKeys.cartCount });

      setTimeout(() => {
        homeNavi("/");
      }, 1000);
    },
    onError: (error) => {
      console.error("❌ Logout Error:", error.response?.data || error.message);
      toast.error("Logout Failed");
    },
  });
}

export default useLogout;
