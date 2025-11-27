import { createContext, useEffect, useState } from "react";
import useProfile from "../Hooks/useProfile";

export const AuthContext = createContext();

function Conex({ children }) {
  const { data: user, isLoading, isError } = useProfile();

  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isLoading) return; // لسه بنجيب البيانات

    if (user) {
      setIsAuth(true);
      setIsAdmin(user.role === "admin");
      setIsMale(user.gender !== "female");
      setUserImage(user.userImage);
      setUserInfo(user.username);
    } else {
      setIsAuth(false);
      setIsAdmin(false);
      setIsMale(false);
      setUserImage(null);
      setUserInfo(null);
    }
  }, [user, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isAdmin,
        isMale,
        userImage,
        userInfo,
        isLoading,
        isError,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default Conex;
