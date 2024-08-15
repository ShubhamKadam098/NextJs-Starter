"use client";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const useIsMobileScreen = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 1024);
    }, 150);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return isMobile;
};

export default useIsMobileScreen;
