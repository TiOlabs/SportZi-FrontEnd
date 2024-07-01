import { message } from "antd";
import React, { useEffect, useState } from "react";

const CoachBookingContext = React.createContext<any>(null);

const CoachBookingProvider = ({ children }: any) => {
  const [coachId, setCoachId] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pcount, setPcount] = useState("");

  // Function to update the state when localStorage changes
  const updateCoachIdFromLocalStorage = () => {
    const storedCoachId = localStorage.getItem("coachId");
    if (storedCoachId !== coachId) {
      setCoachId(storedCoachId || "");
    }
  };

  useEffect(() => {
    updateCoachIdFromLocalStorage(); // Initial load

    // Check for changes in localStorage every second
    const interval = setInterval(() => {
      updateCoachIdFromLocalStorage();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Coach Id changed", coachId);
  }, [coachId]);

  const handleFinish = async () => {
    console.log(date, time, pcount);  
    if (parseInt(pcount) <= 0) {
      message.error("Participant count must be more than 0");
      return; // Stop further execution
    } else if (time === "") {
      message.error("Time must be selected");
      return; // Stop further execution
    } else {
      try {
        // Handle the booking logic here
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    }
  };

  return (
    <CoachBookingContext.Provider value={{ coachId, setCoachId }}>
      {children}
    </CoachBookingContext.Provider>
  );
};

export { CoachBookingContext, CoachBookingProvider };