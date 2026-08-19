import { useState } from 'react';
import { useSwimBook } from '../context/SwimBookContext';

export const useAuthViewModel = (mode: 'login' | 'register') => {
  const { login: loginUser, register: registerUser } = useSwimBook();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(mode === 'login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [swimmingLevel, setSwimmingLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    setError('');
  };

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long');
      return false;
    }
    if (!isLoginMode && !name) {
      setError('Name is required for registration');
      return false;
    }
    setError('');
    return true;
  };

  const handleAuthSubmit = async (): Promise<boolean> => {
    if (!validate()) return false;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    if (isLoginMode) loginUser(email);
    else registerUser(name, email, swimmingLevel);
    return true;
  };

  const handleOAuth = async (provider: 'Google' | 'Apple'): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    loginUser(provider === 'Google' ? 'google.user@aquabook.app' : 'apple.user@aquabook.app');
    return true;
  };

  return {
    isLoginMode,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    swimmingLevel,
    setSwimmingLevel,
    error,
    isLoading,
    toggleMode,
    handleAuthSubmit,
    handleOAuth,
  };
};
