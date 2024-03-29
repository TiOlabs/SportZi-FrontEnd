import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Auth = ({ children }: any) => {
  // const [isUser, setIsUser] = useState(false);
  
  // const token = Cookies.get("token");
  // useEffect(() => {
  //   if (token) {
  //     setIsUser(true);
  //   }
  // }, [token]);

 
//   useEffect(() => {
//     try {
//     //   if (!user) {
//     //     setIsUser(false);
//     //     return;
//     //   }
//       const fetchData = async () => {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL}api/verifyToken/${user}`
//         );
//         const data = await res.json();

//         console.log(data.message);

//         if (data.message === "Invalid Token") {
//           setIsUser(false);
//         } else {
//           console.log("User is authenticated");
//           setIsUser(true);
//         }
//       };
//       fetchData();
//     } catch (e) {
//       console.log(e);
//     }
//   }, []);

  return <>
  {/* {isUser ? <>{children}</> : <h1>Not Authenticated</h1>} */}
  </>;
};

export default Auth;
