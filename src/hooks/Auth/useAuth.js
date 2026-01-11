import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, login, logout } = context;

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data) {
        login(response.data);
        return true;
      }
    } catch {
      return false;
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      if (response.data) {
        login(response.data);
        return true;
      }
    } catch {
      return false;
    }
  };

  const logoutUser = () => {
    logout();
  };

  return {
    user,
    loginUser,
    registerUser,
    logoutUser,
    isAuthenticated: !!user,
  };
};

export default useAuth;
