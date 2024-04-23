import { message } from "antd";
import React, { useState } from "react";

const CoachBookingContext = React.createContext<any>(null);

const CoachBookingProvider = ({ children }: any) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pcount, setPcount] = useState("");

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
      value={{ time, setTime, date, setDate, pcount, setPcount, handleFinish }}
    >
      {children}
    </CoachBookingContext.Provider>
  );
};

export { CoachBookingContext, CoachBookingProvider };
