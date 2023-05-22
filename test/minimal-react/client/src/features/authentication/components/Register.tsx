import { CreateUserInput } from '@examples/minimal-react-server/schema/user.schema';
import { Copyright } from '@mui/icons-material';
import {
  Avatar, Box, Container, createTheme, CssBaseline, TextField, ThemeProvider, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

import { useRegistration } from '../hooks/useRegistration';

export function Register() {
  const { error, isLoading, handleRegistration } = useRegistration();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password')?.toString() ?? '';
    const passwordConfirmation = data.get('password_confirmation')?.toString() ?? '';
    const email = data.get('email')?.toString() ?? '';

    if (!password || !email) return;

    const user: CreateUserInput = {
      email,
      password,
      name: email,
      passwordConfirm: passwordConfirmation,
    };

    handleRegistration(user);
  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              id="password_confirmation"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
