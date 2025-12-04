import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, login, logout } = context;

  const loginUser = async (email, password) => {
    const toastId = toast.loading('Signing in...');
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data) {
        login(response.data);
        toast.success('Welcome back!', { id: toastId });
        return true;
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message, { id: toastId });
      return false;
    }
  };

  const registerUser = async (name, email, password) => {
    const toastId = toast.loading('Creating account...');
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      if (response.data) {
        login(response.data);
        toast.success('Account created successfully!', { id: toastId });
        return true;
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message, { id: toastId });
      return false;
    }
  };

  const logoutUser = () => {
    logout();
    toast.success('Logged out successfully');
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
