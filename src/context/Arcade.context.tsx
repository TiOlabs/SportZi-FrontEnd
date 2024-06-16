import React, { useState, createContext, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const ArcadeContext = createContext<any>(null);

const ArcadeProvider = ({ children }: any) => {
  const [decodedValues, setDecodedValues] = useState<any>();
  const [managerDetails, setManagerDetails] = useState<any>({
    id: "",
    firstName: "",
    lastName: "",
    user_image: "",
    coachname: "",
    discription: "",
    achivements: "",
  });

  // const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = token ? jwtDecode(token) : undefined;
    setDecodedValues(decoded);
  }, []);
  console.log("decodedValues", decodedValues);

  console.log("decodedValues", decodedValues?.userId);
  const id = decodedValues?.userId;

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (id) {
          // Check if t is not null
          axiosInstance
            .get(`http://localhost:8000/api/getarcadeDetailsById/${id}`)
            .then((res) => {
              console.log("dataaaaaaaaaa", res.data);
              console.log("dataArcede", res.data.arcade);

              try {
                setManagerDetails({
                  id: res.data.manager_id,
                  firstName: res.data.user.firstname,
                  lastName: res.data.user.lastname,
                  role: res.data.user.role,
                  image: res.data.user.user_image,
                });
              } catch (err) {
                console.log(err);
              }
              console.log("dataaaaaaaaaa", res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      // Handle error responses here if needed
    }
  }, [id]);
  console.log("managerDetails", managerDetails);
  return (
    <ArcadeContext.Provider value={{ managerDetails }}>
      {children}
    </ArcadeContext.Provider>
  );
};

function useArcade() {
  const context = useContext(ArcadeContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { ArcadeProvider, useArcade };
