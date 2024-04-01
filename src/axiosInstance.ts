


import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// Define custom Axios instance with type AxiosInstance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Set your API base URL
  timeout: 5000, // Set timeout if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include JWT token in request headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get JWT token from cookie
    const token = Cookies.get('token'); 
    // console.log("from axioInstance:",token);

    // If token exists, set Authorization header with Bearer token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
 

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Add any global response intercept logic here
//     return response;
//   },
//   (error) => {
//     if (error.response.data.statusCode === 401) {
//       // Swal.fire({
//       //   title: 'Access denied ',
//       //   text: "Your token has expired",
//       //   icon: 'warning',
//       //   confirmButtonColor: '#3085d6',
//       //   confirmButtonText: 'Log in again '
//       // }).then((result) => {
//       //   if (result.isConfirmed) {
//       //     window.location.href = '/login'
//       //   }
//       // })

//       window.location.href = '/login';
//     }
 
//   }
// );

export default axiosInstance;
