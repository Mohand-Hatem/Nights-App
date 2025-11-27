import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import { useContext } from "react";
import { AuthContext } from "../Context/Conex";

function useCartCount() {
  const { isAuth } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["Count"],
    queryFn: isAuth
      ? async () => {
          const res = await axiosInstance.get("/cart/count");
          return res?.data?.count;
        }
      : {},
  });
  return { data, isLoading };
}

export default useCartCount;
