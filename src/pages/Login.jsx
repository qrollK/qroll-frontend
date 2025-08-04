import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import API from "../api"; // Make sure you have this setup properly

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await API.post("/auth/google", {
        token: token,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");

      if (res.data.user.role === "student") {
        window.location.href = "/student";
      } else if (res.data.user.role === "teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/choose-role";
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check console for details.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-800 p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Google Login Failed")}
        />
      </div>
    </div>
  );
};

export default Login;
