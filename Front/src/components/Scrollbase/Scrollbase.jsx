import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Scrollbase() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default Scrollbase;
