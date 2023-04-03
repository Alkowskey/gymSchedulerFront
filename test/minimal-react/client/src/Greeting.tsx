import { CreateUserInput } from '../../server/schema/user.schema';
import { trpc } from './utils/trpc';
import Button from '@mui/material/Button';

export function Greeting() {
  const exercise = trpc.exercise.useQuery();
  const exerciseData = exercise.data || [];
  const registerUser = trpc.registerUser.useMutation();

  const register = () => {
    const user: CreateUserInput = {
      name: 'test123123',
      email: 'testmail@gmail.com',
      password: '12312312',
      passwordConfirm: '123123123'
    }
    
    registerUser.mutate(user);
  };

  return (
        <div>
            <h2>Exercises</h2>
            <ul>
              {exerciseData.map((exercise) => (
                <li key={exercise.id}>{exercise.excerise}</li>
              ))}
            </ul>
            <Button variant="contained" onClick={register}>Register user</Button>
        </div>
  );
}
