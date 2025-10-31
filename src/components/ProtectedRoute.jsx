import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../api";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/me`, { withCredentials: true })
      .then((res) => {
        setIsAuth(res.data.loggedIn);
      })
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
