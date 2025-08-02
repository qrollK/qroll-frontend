import { useState } from 'react';
import API from '../api';

export default function StudentDashboard() {
  const [sessionId, setSessionId] = useState('');
  const [enteredToken, setEnteredToken] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });

  const markAttendance = async () => {
    const res = await API.post('/attendance/submit', {
      sessionId,
      enteredToken,
      location,
    });
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <input placeholder="Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      <input placeholder="QR Token" value={enteredToken} onChange={(e) => setEnteredToken(e.target.value)} />
      <input placeholder="Latitude" value={location.lat} onChange={(e) => setLocation({ ...location, lat: e.target.value })} />
      <input placeholder="Longitude" value={location.lng} onChange={(e) => setLocation({ ...location, lng: e.target.value })} />
      <button onClick={markAttendance}>Submit Attendance</button>
    </div>
  );
}
