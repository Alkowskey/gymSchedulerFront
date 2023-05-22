import { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CreateUserInput } from '@examples/minimal-react-server/schema/user.schema';
import { TRPCClientErrorLike } from '@trpc/client';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../shared/utils/toast.util';

export function useRegistration() {
  const [error, setError] = useState<TRPCClientErrorLike<any> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerUser = trpc.registerUser.useMutation({
    onSuccess: (data) => {
      navigate('/login');
      Toast.success("Login successful!");
    },
    onError: (error) => {
      Toast.error("Couldn't register user");
      setError(error);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleRegistration = (user: CreateUserInput) => {
    setIsLoading(true);
    registerUser.mutate(user);
  };

  return { error, isLoading, handleRegistration };
}