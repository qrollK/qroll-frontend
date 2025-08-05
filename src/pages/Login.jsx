import { jwtDecode } from "jwt-decode";

const handleSuccess = async (credentialResponse) => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log("Loaded Backend URL:", import.meta.env.VITE_BACKEND_URL);

    const token = credentialResponse.credential;

    // ✅ Decode token to get user info
    const decoded = jwtDecode(token);
    const userInfo = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };

    const res = await axios.post(`${backendUrl}/api/auth/google`, {
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

export default Login;
