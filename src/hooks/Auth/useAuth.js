import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const maskEmail = (email = '') => {
  if (!email || typeof email !== 'string') return 'N/A';

  const normalized = email.toLowerCase().trim();
  const [username, domain] = normalized.split('@');

  if (!domain) return 'invalid-email-format';
  if (username.length <= 2) return `${username[0] || '*'}***@${domain}`;

  return `${username.slice(0, 2)}***@${domain}`;
};

const getAxiosErrorPayload = (error) => {
  return {
    status: error?.response?.status,
    data: error?.response?.data,
    message: error?.message,
  };
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, login, logout, updateUser } = context;

  const loginUser = async (email, password) => {
    try {
      console.log('[FE][AUTH][LOGIN] Request', {
        endpoint: `${BASE_URL}/auth/login`,
        email: maskEmail(email),
      });

      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data) {
        console.log('[FE][AUTH][LOGIN] Success', {
          status: response.status,
          userId: response.data?._id,
          email: maskEmail(response.data?.email),
        });
        login(response.data);
        return true;
      }
    } catch (error) {
      console.error('[FE][AUTH][LOGIN] Error', getAxiosErrorPayload(error));
      return false;
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      console.log('[FE][AUTH][REGISTER] Request', {
        endpoint: `${BASE_URL}/auth/register`,
        email: maskEmail(email),
        hasName: Boolean(name),
      });

      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data) {
        console.log('[FE][AUTH][REGISTER] Success', {
          status: response.status,
          userId: response.data?._id,
          email: maskEmail(response.data?.email),
        });
        login(response.data);
        return true;
      }
    } catch (error) {
      console.error('[FE][AUTH][REGISTER] Error', getAxiosErrorPayload(error));
      return false;
    }
  };

  const logoutUser = () => {
    logout();
  };

  const updateUserData = (partialUserData) => {
    updateUser(partialUserData);
  };

  return {
    user,
    loginUser,
    registerUser,
    logoutUser,
    updateUserData,
    isAuthenticated: !!user,
  };
};

export default useAuth;
