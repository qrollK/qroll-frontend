import { jwtDecode } from "jwt-decode";

export function saveToken(token) {
  localStorage.setItem('qroll_token', token);
}

export function getUserFromToken() {
  const token = localStorage.getItem('qroll_token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
