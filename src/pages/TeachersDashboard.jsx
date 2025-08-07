import { useState, useEffect } from 'react';
import API from '../api';

export default function TeachersDashboard() {
  const [title, setTitle] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [sessions, setSessions] = useState([]);

  const createSession = async () => {
    try {
      const res = await API.post('/session/create', {
        title,
        location: { lat, lng },
        expiresAt,
      });
      alert(`✅ Session created: ${res.data._id}`);
      setTitle('');
      setLat('');
      setLng('');
      setExpiresAt('');
      fetchSessions();
    } catch (err) {
      console.error('Error creating session:', err);
      alert('❌ Failed to create session');
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await API.get('/sessions/teacher');
      setSessions(res.data.sessions);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  const fetchToken = async (sessionId) => {
    try {
      const res = await API.get(`/session/${sessionId}/token`);
      setSessions((prev) =>
        prev.map((s) =>
          s._id === sessionId ? { ...s, token: res.data.token } : s
        )
      );
    } catch (err) {
      console.error(`Failed to fetch token for session ${sessionId}`);
    }
  };

  useEffect(() => {
    fetchSessions();

    // Start token refresh interval
    const interval = setInterval(() => {
      sessions.forEach((s) => fetchToken(s._id));
    }, 5000);

    return () => clearInterval(interval);
  }, [sessions]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👩‍🏫 Teacher's Dashboard</h2>

      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">Create New Session</h3>
        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Latitude"
          className="border p-2 w-full mb-2"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          placeholder="Longitude"
          className="border p-2 w-full mb-2"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border p-2 w-full mb-2"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />
        <button
          onClick={createSession}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Create Session
        </button>
      </div>

      <div className="grid gap-4">
        {sessions.map((s) => (
          <div key={s._id} className="bg-white p-4 rounded shadow">
            <h4 className="text-lg font-semibold">{s.title}</h4>
            <p>📍 Location: {s.location?.lat}, {s.location?.lng}</p>
            <p>🕒 Expires: {new Date(s.expiresAt).toLocaleString()}</p>
            <p>🔁 Token: <span className="font-mono text-blue-700">{s.token || 'Loading...'}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
