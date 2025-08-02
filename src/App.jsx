import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
