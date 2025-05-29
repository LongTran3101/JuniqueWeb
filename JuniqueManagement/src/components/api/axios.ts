import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  console.log("token axiosInstance  ", token);
  if (token) {
    const expireDateStr = localStorage.getItem('expireDate');
    if (!expireDateStr || expireDateStr.trim() === "" || Number.isNaN(parseInt(expireDateStr, 10))) {
      return config;
    }
    const expireTime = parseInt(expireDateStr, 10);
    if (Date.now() > expireTime) {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/auth/refresh',
          {},
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (res.status === 200) {
          const newToken = res.data.accessToken;
          let newExp = 0;
          try {
            const payloadBase64 = newToken.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            newExp = decodedPayload.exp * 1000;
          } catch {
            newExp = Date.now() + 60 * 1000;
          }
          // Custom login function (you may replace this with your logic)
          localStorage.setItem('accessToken', token);
          localStorage.setItem('expireDate', newExp.toString());

          // Update token in header
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          throw new Error("Refresh failed");
        }
      } catch (err) {
        console.error("Refresh token failed", err);
        // Optional: redirect to login or logout user
        return Promise.reject(err);
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});



export default axiosInstance;
