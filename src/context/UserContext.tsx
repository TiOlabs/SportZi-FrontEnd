import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
  const [userDetails, setUserDetails] = useState<any>({
    id: "",
    name: "",
    image: "",
    coachname: "",
  });
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      await axiosInstance
        .get("/api/auth/getplayerdetails/", {})
        .then((res) => {
          console.log("dataaaaaaaaaa", res.data);
          setUserDetails({
            id: res.data.user_id,
            name: res.data.firstname + " " + res.data.lastname,
            image: res.data.user_image,
            phoneNumbers: res.data.phone[0].phone_number,
          });
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

  return (
    <UserContext.Provider value={{ userDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
