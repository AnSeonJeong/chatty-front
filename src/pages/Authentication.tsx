import React from "react";
import Login from "../components/Login";
import { Routes, Route, useParams } from "react-router-dom";
import Regi from "../components/Regi";
import FindAccount from "../components/FindAccount";

function Authentication() {
  const { auth } = useParams();

  const Render = () => {
    if (auth === "login") return <Login />;
    else if (auth === "regi") return <Regi />;
    else if (auth === "findAccount") return <FindAccount />;
    else return null;
  };

  return (
    <div className="auth-container">
      <Render />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regi" element={<Regi />} />
        <Route path="/findAccount" element={<FindAccount />} />
      </Routes>
    </div>
  );
}

export default Authentication;
