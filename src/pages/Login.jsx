import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const backendURL = 'https://qroll-backend-production.up.railway.app';

  const handleGoogleLogin = () => {
    window.location.href = `${backendURL}/api/auth/google`;
  };

  // Handle redirect from Google OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    if (token && user) {
      // Save user and token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        if (parsedUser?.role === 'student') {
          navigate('/student');
        } else if (parsedUser?.role === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/choose-role');
        }
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Login with Google</h1>
          <p className="text-gray-400 mt-2">Welcome back! Sign in to continue.</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="bg-white text-black px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Sign in as krish
        </button>

        <footer className="text-sm text-gray-500">
          “Smart attendance starts here.” ✨
        </footer>
      </div>
    </div>
  );
};

export default Login;
