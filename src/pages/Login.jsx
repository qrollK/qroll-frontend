import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        console.error("VITE_BACKEND_URL is not defined.");
        alert("Backend URL is not configured.");
        return;
      }

      console.log("Backend URL:", backendUrl);
      console.log("Credential Response:", credentialResponse);

      const res = await axios.post(`${backendUrl}/api/auth/google`, {
        token: credentialResponse.credential,
      }, {
        withCredentials: true, // Optional: needed only if you use cookies
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      if (user.role === "student") {
        window.location.href = "/student-dashboard";
      } else if (user.role === "teacher") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/choose-role";
      }

    } catch (error) {
      console.error("Login failed:", error.response || error.message || error);
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
