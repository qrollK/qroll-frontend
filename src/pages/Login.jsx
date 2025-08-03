import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        { token: credentialResponse.credential }
      );

      const { token, user, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (!role || role === null) {
        window.location.href = "/choose-role";
      } else if (role === "student") {
        window.location.href = "/student";
      } else if (role === "teacher") {
        window.location.href = "/teacher";
      } else {
        alert("Unknown role. Contact support.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check console.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-xl mb-4 font-semibold">Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Login Failed")}
        />
      </div>
    </div>
  );
};

export default Login;
