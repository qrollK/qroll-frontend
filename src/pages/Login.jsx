import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";


const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.post(`${backendUrl}/api/auth/google`, {
        token: credentialResponse.credential,
      });

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");

      // Redirect based on role
      if (res.data.user.role === "student") {
        window.location.href = "/student";
      } else if (res.data.user.role === "teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/choose-role";
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please try again.");
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
