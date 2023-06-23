import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      alert("환영합니다!");
      setSearchParams("");
    }
  }, []);

  return <div></div>;
}

export default Main;
