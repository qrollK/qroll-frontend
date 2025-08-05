import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      console.log("Loaded Backend URL:", backendUrl);

      const token = credentialResponse.credential;

      // ✅ Decode token to get user info
      const decoded = jwtDecode(token);
      const userInfo = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };

      const res = await axios.post(`${backendUrl}/auth/google`, {
        token,
        userInfo,
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
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Qroll</h1>
        <p className="text-gray-300">Sign in to continue to your dashboard</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              alert("Google Sign In failed. Try again.");
            }}
            useOneTap
          />
        </div>
        <p className="text-sm text-gray-500">Your data is safe and secure.</p>
      </div>
    </div>
  );
};

export default Login;
