import { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { LoginUserInput } from '@examples/minimal-react-server/schema/user.schema';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../shared/utils/toast.util';
import { Id } from 'react-toastify';

export function useLogin() {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastId, setToastId] = useState<Id | null>(null);
  const navigate = useNavigate();

  const loginUser = trpc.loginUser.useMutation({
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        setToken(data.access_token);
        Toast.update(toastId || 1, {
          render: "Login successful!",
          type: "success",
          isLoading: false,
        })
        navigate('/dashboard/workout');
      }
    },
    onError: (error: any) => {
      Toast.update(toastId || 1, {
        render: "Login failed!",
        type: "error",
        isLoading: false,
      })
      setError(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleLogin = (user: LoginUserInput) => {
    setIsLoading(true);
    setToastId(Toast.loading("Logging in..."));
    loginUser.mutate(user);
  };

  return { token, error, isLoading, handleLogin };
}