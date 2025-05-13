import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use the environment variable for the backend URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/'); // Redirect to the landing page or admin dashboard
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 400, margin: '40px auto' }}>
      <Typography variant="h5" gutterBottom>
        EnvilonTech Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;