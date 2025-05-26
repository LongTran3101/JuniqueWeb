import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth, type User } from '../../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
  role:string;
}

interface LoginResponse {
  accessToken: string;
  userEntity: UserEntity;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setError('');
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu là bắt buộc'),
    email:
      mode === 'register'
        ? Yup.string().email('Email không hợp lệ').required('Email là bắt buộc')
        : Yup.string().notRequired(),
  });

  const initialValues = {
    username: '',
    password: '',
    email: '',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    setError('');
    try {
      if (mode === 'login') {
        const res = await axios.post<LoginResponse>('http://localhost:8080/api/auth/login', {
          username: values.username,
          password: values.password,
        });

        const { accessToken, userEntity } = res.data;
        const user: User = {
          email: userEntity.email,
          username: userEntity.username,
          role: userEntity.role,
        };

        const payloadBase64 = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const exp = decodedPayload.exp * 1000;

        login(accessToken, user, exp);
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:8080/api/auth/register', {
          username: values.username,
          password: values.password,
          email: values.email,
        });

        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setMode('login');
      }
    } catch (err: any) {
      console.error(err);
      setError('Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin.');
    }
    setSubmitting(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Container maxWidth="xs">
        <Box
          sx={{
            p: 4,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, handleChange }) => (
              <Form>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                {mode === 'register' && (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                {error && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : mode === 'login' ? (
                    'Đăng nhập'
                  ) : (
                    'Đăng ký'
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <Typography variant="body2">
            {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
            <Link component="button" variant="body2" onClick={toggleMode}>
              {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
            </Link>
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
};

export default Login;
