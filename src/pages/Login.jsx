import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post("http://localhost:5000/auth/google", {
        token: idToken,
        role,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/student-dashboard");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Qroll Login</h1>
      <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-4 mb-4">
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </div>
  );
}
