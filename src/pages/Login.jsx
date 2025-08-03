import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/google", {
        credential: credentialResponse.credential,
      });

      // Save token to localStorage or context
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      window.location.href = "/dashboard"; // or navigate in React
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
