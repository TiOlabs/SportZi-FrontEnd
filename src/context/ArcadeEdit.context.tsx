import React, { useState, createContext, useEffect, useContext } from "react";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const ArcadeEditContext = createContext<any>(null);

const ArcadeEditprovider = ({ children }: any) => {
  const [decodedValues, setDecodedValues] = useState<any>();
  const [arcadeEditDetails, setArcadeEditDetails] = useState<any>({
    id: "",
    firstName: "",
    // lastName: "",
    // user_image: "",
    // coachname: "",
    // discription: "",
    // achivements: "",
  });

  // const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = token ? jwtDecode(token) : undefined;
    setDecodedValues(decoded);
  }, []);
  console.log("decodedValues", decodedValues);

  console.log("decodedValues", decodedValues?.userId);
  const t = decodedValues?.userId;

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (t) {
          // Check if t is not null
          axiosInstance
            .get(`/api/auth/getarchadedetails`)
            .then((res) => {
              console.log("dataaaaaaaaaa", res.data);
              setArcadeEditDetails({
                id: res.data.arcade_id,
                firstName: res.data.arcade_name,
              });
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
  }, [t]);

  // console.log("t", t);
  return (
    <ArcadeEditContext.Provider value={{ arcadeEditDetails }}>
      {children}
    </ArcadeEditContext.Provider>
  );
};

function useArcadeEdit() {
  const context = useContext(ArcadeEditContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { ArcadeEditprovider, useArcadeEdit };
