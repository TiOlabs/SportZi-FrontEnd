import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Login from "../pages/login/login";

const Auth = ({ children }: any) => {
  const [isUser, setIsUser] = useState(false);
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      setIsUser(true);
    }
  }, [token]);
  return <>{isUser ? <>{children}</> : <Login />}</>;
};

const ProtectedRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check", {});
        setIsAuthenticated(true);
      } catch (error) {
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return <>{isAuthenticated ? <>{children}</>:<Login/>}</>
};

const PlayerRoute = ({children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check-player", {});
        setIsAuthenticated(true);
      } catch (error) {
      }
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return <>{isAuthenticated ? <>{children}</>:<Login/>}</>
};

const CoachRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check-coach", {});
        setIsAuthenticated(true);
      } catch (error) {
      }
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return <>{isAuthenticated ? <>{children}</>:<Login/>}</>
};


const ManagerRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check-manager", {});
        setIsAuthenticated(true);
      } catch (error) {
      }
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  return <>{isAuthenticated ? <>{children}</>:<Login/>}</>
};

const AdminRoute = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check-admin", {});
        console.log(response);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  console.log(isAuthenticated);
  return <>{isAuthenticated ? <>{children}</>:<Login/>}</>
};

// const SuperAdminRoute = ({children}: any) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const response = await axiosInstance.get("/api/auth/check-superAdmin", {});
//         setIsAuthenticated(true);
//       } catch (error) {
//       }
//       setIsLoading(false);
//     };
//     checkAuthentication();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>; 
//   }
//   return <>{isAuthenticated ? <>{children}</>:<Login/>}</>
// };


export {
  Auth,
  ProtectedRoute,
  PlayerRoute,
  CoachRoute,
  ManagerRoute,
  AdminRoute,
  // SuperAdminRoute
};
