import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box, Button, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading } from './userSlice';
import { login } from './usersThunks';
import { LoginMutation } from '../../../types';
import LoginGoogle from './components/LoginGoogle';

const Login = () => {
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error.error}
        </Alert>
      )}
      <Box>
        <LoginGoogle />
      </Box>
      <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="E-mail"
              name="email"
              autoComplete="current-email"
              value={state.email}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              value={state.password}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Sign in'}
        </Button>
        <Link component={RouterLink} to="/register" variant="body2">
          Don't have an account? Sign up.
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
