import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    const backendURL = 'https://qroll-backend-production.up.railway.app';
    window.location.href = `${backendURL}/api/auth/google`;
  };

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
