import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type User } from '../../context/AuthContext';
import { TextField, Button, Container, Typography, CircularProgress, Box, Grid } from '@mui/material';
import axios from '../../components/api/axios';
interface UserEntity {
    id: number;
    username: string;
    email: string;
    enabled: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null;
    vipExpiredAt: string;
    refreshToken: string | null;
}

interface LoginResponse {
    accessToken: string;
    userEntity: UserEntity;
}
const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            const { accessToken, userEntity } = res.data;
            const token = accessToken;
            const User:User ={
                email:userEntity.username,
                username: userEntity.username,
                role:"admin",
            
            }
            login(token,User);
            navigate('/dashboard'); // hoặc điều hướng khác 
        } catch (err) {
            alert('Login failed');
        }
        setLoading(false);
    };
    return (
        <>
            <Grid size={12}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh" // Make the container take at least the full viewport height
                    bgcolor="#f0f2f5" // Optional: Add a background color
                >
                    <Container component="main" maxWidth="xs">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                {error && (
                                    <Typography color="error" variant="body2" align="center">
                                        {error}
                                    </Typography>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="secondary" /> : 'Login'}
                                </Button>
                            </form>
                        </Box>
                    </Container>
                </Box>
            </Grid></>
    );
};

export default Login;