import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function LoginPage() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info using access_token
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
          token: tokenResponse.access_token,
          userInfo: userInfo.data,
        });

        localStorage.setItem("token", res.data.token);

        if (!res.data.user.role) {
          navigate("/choose-role");
        } else if (res.data.user.role === "student") {
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
    flow: "implicit", // important for getting access_token
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
