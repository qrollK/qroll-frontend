import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
        token: credentialResponse.credential,
      });

      const { token, user, isNewUser } = res.data;

      // Save token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect logic
      if (isNewUser || !user.role) {
        navigate("/choose-role");
      } else if (user.role === "student") {
        navigate("/student/dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-xl mb-4">Login with Google</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Login Failed")} />
      </div>
    </div>
  );
};

export default Login;
