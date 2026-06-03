import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../config/axio';
import { useContext } from 'react';
import { AuthContext } from '../Context/Conex';
import { cacheTimes } from '../lib/queryClient';
import { queryKeys } from '../lib/queryKeys';

function useCartCount() {
  const { isAuth } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.cartCount,
    queryFn: async () => {
      const res = await axiosInstance.get("/cart/count");
      return res?.data?.count;
    },
    enabled: isAuth === true,
    ...cacheTimes.cartCount,
  });

  return { data, isLoading };
}

export default useCartCount;
