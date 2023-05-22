import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { useState } from 'react';

import { SignIn } from './features/authentication/components/SignIn';
import { trpc } from './utils/trpc';
import { getFetch } from "@trpc/client";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Register } from './features/authentication/components/Register';
import { Dashboard } from './features/dashboard/components/Dashboard';
import { Exercise } from './features/dashboard/components/Exercises';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { Profile } from './features/dashboard/components/Profile';
import { History } from './features/dashboard/components/History';
import { Workout } from './features/dashboard/components/Workout';
import { Measure } from './features/dashboard/components/Measure';
import { EmptyWorkout } from './features/dashboard/components/EmptyWorkout';
import { ToastContainer } from 'react-toastify';

export function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      loggerLink<any>(),
      httpBatchLink({
        url: "http://localhost:2022/api/trpc",
        async headers(){
          return {
            authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        },
        fetch: async (input, init?) => {
          const fetch = getFetch();
          return fetch(input, {
            ...init,
            credentials: "include",
          });
        },
      }),
    ],
  }));
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box>
              <Routes>
                <Route path="login" element={ <SignIn />}>
                </Route>
                <Route path="register" element={ <Register />}>
                </Route>
                <Route path="dashboard" element={localStorage.getItem('access_token') ? <Dashboard/>:<SignIn />}>
                  <Route path="exercises" element={<Exercise />}>
                  </Route>
                  <Route path="profile" element={<Profile />}>
                  </Route>
                  <Route path="history" element={<History />}>
                  </Route>
                  <Route path="workout" element={<Workout />}>
                  </Route>
                  <Route path="workout/new" element={<EmptyWorkout />}>
                  </Route>
                  <Route path="measure" element={<Measure />}>
                  </Route>
                </Route>
              </Routes>
            </Box>
          </Router>
          <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
