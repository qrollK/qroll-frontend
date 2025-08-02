import { useState } from 'react';
import API from '../api';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const createSession = async () => {
    const res = await API.post('/session/create', {
      title,
      location: { lat, lng },
      expiresAt,
    });
    alert(`Session created: ${res.data._id}`);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
      <input placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
      <input placeholder="Expiry Date" type="datetime-local" onChange={(e) => setExpiresAt(e.target.value)} />
      <button onClick={createSession}>Create Session</button>
    </div>
  );
}
