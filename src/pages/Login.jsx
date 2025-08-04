import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function LoginPage() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        // Get user info from Google using access token
        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
          {
            token: access_token,
            userInfo: userInfoRes.data,
          }
        );

        localStorage.setItem("token", res.data.token);
        const user = res.data.user;

        if (!user.role) {
          navigate("/choose-role");
        } else if (user.role === "student") {
          navigate("/student");
        } else {
          navigate("/teacher");
        }
      } catch (err) {
        console.error("Login error", err);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to Qroll</h1>
          <p className="text-sm text-gray-400">Login to continue</p>
          <button
            onClick={() => login()}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
