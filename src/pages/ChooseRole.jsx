import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/active`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSessions(data.sessions || []);
      } catch (err) {
        setMessage("❌ Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleMarkAttendance = async (sessionId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/attendance/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Attendance marked successfully!");
      } else {
        setMessage(data.message || "❌ Failed to mark attendance.");
      }
    } catch (err) {
      setMessage("❌ Error marking attendance.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🎓 Student Dashboard</h1>

      {message && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No active sessions available right now.</p>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div key={session._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold">{session.title}</h2>
              <p>{session.date} • {session.time}</p>
              <button
                onClick={() => handleMarkAttendance(session._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Mark Attendance
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
