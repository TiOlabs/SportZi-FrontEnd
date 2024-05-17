import { message } from "antd";
import React, { useEffect, useState } from "react";

const CoachBookingContext = React.createContext<any>(null);

const CoachBookingProvider = ({ children }: any) => {
  const [coachId,setCoachId]= useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pcount, setPcount] = useState("");


  useEffect(() => {
    const storedCoachId = localStorage.getItem("coachId") as string;
    console.log(storedCoachId);
    setCoachId(storedCoachId || "");
    console.log(coachId);
  }, [coachId]);
  const handleFinish = async () => {
    console.log(date, time, pcount);
    if (parseInt(pcount) <= 0) {
      message.error("Participant count must be more than 0");
      return; // Stop further execution
    } else if (time === "") {
      message.error("time must be selected");
      return; // Stop further execution
    } else {
      try {
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    }
  };

  return (
    <CoachBookingContext.Provider
      value={{ coachId,setCoachId }}
    >
      {children}
    </CoachBookingContext.Provider>
  );
};


export { CoachBookingContext, CoachBookingProvider };

