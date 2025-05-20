import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL,
  headers:{'Content-Type':'application/json'},
  withCredentials: true,
});
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  console.log("token axiosInstance  ",token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   res => res,
//   async err => {
//     const originalRequest = err.config;

//     if (err.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token: string) => {
//             originalRequest.headers['Authorization'] = 'Bearer ' + token;
//             return axiosInstance(originalRequest);
//           })
//           .catch(Promise.reject);
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {

//         console.log("goi refresh ");
//         const response = await axios.post(`${baseURL}/auth/refresh`, {}, {
//           withCredentials: true
//         });
//          console.log("goi refresh " , response);
//         const newToken = response.data.accessToken;

//         localStorage.setItem('accessToken', newToken);
//         axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
//         processQueue(null, newToken);

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem('accessToken');
//         window.location.href = '/login';
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
