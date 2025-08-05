import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/set-role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local user object
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Redirect based on role
      if (role === "student") {
        navigate("/student/dashboard");
      } else if (role === "teacher") {
        navigate("/teacher/dashboard");
      }
    } catch (err) {
      console.error("Failed to set role:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Role</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRoleSelect("student")}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
          >
            I’m a Student
          </button>
          <button
            onClick={() => handleRoleSelect("teacher")}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
          >
            I’m a Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
