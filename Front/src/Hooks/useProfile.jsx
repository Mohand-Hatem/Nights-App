import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axio";
import adminImg from "../assets/images/one.jpg";
import adminImge from "../assets/images/two.jpg";
import femaleImg from "../assets/images/female.jpg";

export default function useProfile() {
  return useQuery({
    queryKey: ["profile"],
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
      } else {
        throw new Error("Unauthorized");
      }
    },
    staleTime: 0,
    cacheTime: 0,
  });
}
