import { GoogleLogin } from '@react-oauth/google';
import API from '../api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const res = await API.post('/auth/google', {
      token: credentialResponse.credential,
    });

    saveToken(res.data.token);
    const role = res.data.user.role;
    navigate(role === 'admin' ? '/admin' : '/student');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login Failed')} />
    </div>
  );
}
