import React, { useState, createContext, useEffect, useContext } from "react";
// import axios from "axios";
import axiosInstance from "../axiosInstance";
// import { useNavigate } from "react-router-dom";

export const PlayerContext = createContext<any>(null);

const PlayerProvider = ({ children }: any) => {

  const [userDetails, setUserDetails] = useState<any>({
    id: "",
    firstName: "",
    lastName: "",
    image: "",
    coachname: "",
    discription: "",
    achivements: "",
  });

  // const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await axiosInstance
        .get("/api/auth/getplayerdetails/", {})
        .then((res) => {
          console.log("dataaaaaaaaaa", res.data);
          setUserDetails({
            id: res.data.user_id,
            firstName: res.data.firstname,
            lastName: res.data.lastname,
            image: res.data.user_image,
            phoneNumbers: res.data.phone[0].phone_number,
            discription: res.data.Discription,
          });
          // console.log("userDetails", userDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error:", error);
      // Handle error responses here if needed
    }
  };

  useEffect(() => {
    console.log("fetching user");
    fetchUser();
  }, []);


  // console.log("t", t);
  return (
    <PlayerContext.Provider value={{ userDetails }}>
      {children}
    </PlayerContext.Provider>
  );
};

function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { PlayerProvider, usePlayer };
