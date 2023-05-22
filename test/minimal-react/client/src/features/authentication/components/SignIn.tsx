import { LoginUserInput } from '@examples/minimal-react-server/schema/user.schema';
import { Copyright } from '@mui/icons-material';
import {
  Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography,
} from '@mui/material';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';

import { useLogin } from '../hooks/useLogin';
import 'react-toastify/dist/ReactToastify.css';

export function SignIn() {
  const { token, error, isLoading, handleLogin } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password')?.toString() ?? '';
    const email = data.get('email')?.toString() ?? '';

    if (!password || !email) return;

    const user: LoginUserInput = {
      email,
      password,
    };

    handleLogin(user);

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
            Sign in
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
