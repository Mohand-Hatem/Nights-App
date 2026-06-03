import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axio";
import { AuthContext } from "../../Context/Conex";

function AdminProfile() {
  const { userImage } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosInstance("user/me");
      return res.data;
    },
  });

  return (
    <div className="flex h-130 items-center justify-center rounded-xl p-4 sm:p-8">
      <div className="theme-card w-full max-w-sm border-accent/30 p-6 transition-all duration-300 hover:border-accent sm:max-w-md md:max-w-lg lg:max-w-2xl sm:p-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:space-x-6 sm:text-left">
          <div className="relative mb-6 sm:mb-0">
            <img
              src={userImage}
              alt="Admin Avatar"
              className="h-28 w-28 rounded-full border-4 border-accent object-cover shadow-lg sm:h-32 sm:w-32"
            />
          </div>

          <div className="flex flex-col items-center justify-center sm:items-start">
            <h2 className="text-2xl font-bold text-foreground">
              {data?.signdUser.username}
            </h2>
            <p className="theme-muted break-all">{data?.signdUser.email}</p>
            <div className="mt-2 h-1 w-16 rounded-full bg-accent sm:mt-3"></div>
          </div>
        </div>

        <div className="my-8 border-t border-border"></div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-muted">Role:</span>
            <span className="font-semibold text-accent">{data?.signdUser?.role}</span>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-muted">Member Since:</span>
            <span className="font-semibold text-foreground">Jan 2024</span>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-muted">Status:</span>
            <span className="font-semibold text-green-500">Active</span>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-muted">Last Login:</span>
            <span className="font-semibold text-foreground">Nov 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
