import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ChooseRole from "./pages/ChooseRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<AdminDashboard />} />
        <Route path="/choose-role" element={<ChooseRole />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
