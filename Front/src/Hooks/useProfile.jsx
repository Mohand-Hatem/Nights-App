import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import adminImg from "../assets/images/one.jpg";
import adminImge from "../assets/images/two.jpg";
import femaleImg from "../assets/images/female.jpg";
import { cacheTimes } from "../lib/queryClient";
import { queryKeys } from "../lib/queryKeys";

export default function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      const res = await axiosInstance.get("/user/me");
      if (res?.data?.message === "success") {
        const user = res?.data?.signdUser;

        let userImage = null;
        if (user.role === "admin") {
          if (user.gender === "female") {
            userImage = femaleImg;
          } else {
            const arr = [adminImg, adminImge];
            userImage = arr[Math.floor(Math.random() * arr.length)];
          }
        }

        return {
          username: user.username,
          email: user.email,
          role: user.role,
          gender: user.gender,
          userImage,
        };
      }
      throw new Error("Unauthorized");
    },
    retry: false,
    refetchOnWindowFocus: true,
    ...cacheTimes.profile,
  });
}
