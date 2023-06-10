import React from "react";
import Login from "../components/Login";
import { Routes, Route, useParams } from "react-router-dom";
import Regi from "../components/Regi";

function Authentication() {
  const { auth } = useParams();

  return (
    <div className="auth-container">
      {auth === "login" ? <Login /> : <Regi />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regi" element={<Regi />} />
      </Routes>
    </div>
  );
}

export default Authentication;
