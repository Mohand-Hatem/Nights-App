import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axiosInstance from "../config/axio";

export default function useGoogleAuth(setIsAuth) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nav = useNavigate();
  const queryClient = useQueryClient();

  const loginWithGoogle = async (credential) => {
    if (!credential) {
      toast.error("Google Authentication failed!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const decoded = jwtDecode(credential);
      console.log("decoded credential:", decoded);

      const email = decoded?.email;
      const name = decoded?.name;
      const googleId = decoded?.sub;

      if (!email || !googleId) {
        toast.error("Google did not return a valid email or ID");
        return;
      }

      const res = await axiosInstance.post("/user/google-login", {
        idToken: credential,
      });

      toast.success("Login Successful!");

      queryClient.invalidateQueries(["Count"]);
      queryClient.invalidateQueries(["Cart"]);

      toast.loading("Redirecting...", { duration: 2000 });

      setTimeout(() => {
        if (setIsAuth) setIsAuth(true);
        nav("/home");
      }, 2000);
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Google Login Failed. Please try again.";

      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginWithGoogle };
}
