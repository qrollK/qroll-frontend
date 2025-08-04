import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      console.log("Backend URL:", backendUrl);
      console.log("Credential Response:", credentialResponse);

      const res = await axios.post(`${backendUrl}/api/auth/google`, {
        token: credentialResponse.credential,
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
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-800 p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Login Failed")}
        />
      </div>
    </div>
  );
};

export default Login;
