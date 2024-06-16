import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  InputNumber,
  message,
  Empty,
  ConfigProvider,
  Calendar,
} from "antd";
import BookingFormPicture from "../../assents/coachBookingForm1.png";
import Calender from "../../components/calender";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { usePlayer } from "../../context/player.context";
import { CoachBookingContext } from "../../context/coachBooking.context";
import {
  Arcade,
  Coach,
  CoachAssignDetails,
  CoachEnrollDetailsForPackages,
  User,
  Zone,
  ZoneBookingDetails,
} from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { time } from "console";
import PaymentModal from "../../components/paymentCheckout";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { ZoneBookingsContext } from "../../context/zoneBookings.context";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import NavbarProfile from "../../components/NavBarProfile";
import { useUser } from "../../context/userContext";
import axiosInstance from "../../axiosInstance";
const { Option } = Select;

const CoachBookingForm: React.FC = () => {
  interface TimeParticipantCount {
    time: string;
    totalParticipantCount: number;
  }
  const { setZoneBookings } = useContext(ZoneBookingsContext);
  const { userDetails } = useUser();
  const [userData, setUserData] = useState<User>();
  const [avaliability, setAvaliability] = useState<any>();
  const [coachData, setcoachData] = useState<Coach>();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [pcount, setPcount] = useState<string>("");
  const [arcade, setArcade] = useState<string>("");
  const [zone, setZone] = useState<string>("");
  const [coachSport, setCoachSport] = useState<string>("");
  const [coachAssignDetails, setCoachAssignDetails] = useState<
    CoachAssignDetails[]
  >([]);
  const [decodedValues, setDecodedValues] = useState<any>();
  const { coachId } = useContext(CoachBookingContext);
  const [zoneForCoachBookings, setzoneForCoachBookings] = useState<Zone[]>([]);
  const [arcadesofCoache, setarcadesofCoache] = useState<Arcade>();
  const [dayOfWeek, setDayOfWeek] = useState<string>("");
  const [datee, setDatee] = useState<String>("");
  const [coachBookings, setCoachBookings] = useState<any[]>([]);
  const [zoneDetails, setZoneDetails] = useState<Zone>();
  const [reservationType, setReservationType] = useState<string>("");
  const [zoneBookingDetails, setZoneBookingDetails] = useState<any[]>([]);
  const [bookingDate, setBookingDate] = useState<ZoneBookingDetails[]>([]);
  const [timeParticipantCounts1, setTimeParticipantCounts1] = useState<
    TimeParticipantCount[]
  >([]);
  const [packageDetails, setPackageDetails] = useState<Arcade>();
  const [packageEnrollDataForCoach, setPackageEnrollDataForCoach] = useState<
    CoachEnrollDetailsForPackages[]
  >([]);

  const currentCoachId = useRef(coachId);

  const handleDateChange = (datee: any) => {
    // Extract the date part from the Day.js object
    const formattedDate = datee.format("YYYY-MM-DD");
    console.log(formattedDate);

    // Set the formatted date using setDatee
    setDatee(formattedDate);
  };

  const handleDateSelect = (datee: any) => {
    const day = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(datee);
    console.log(day);
    setTime("");
    setDayOfWeek(day);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getCoachEnrollPackageDetailsForCoachBookingForm/${coachId}`
        );
        const packageEnrollDetailsForCoach = await res.json();
        console.log(packageEnrollDetailsForCoach);
        setPackageEnrollDataForCoach(packageEnrollDetailsForCoach);
      };
      fetchData();
    } catch (e) {
      console.log("errrr", e);
    }
  }, [coachId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPaymentDetails = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}api/getuser/${userDetails.id}`
        );
        const paymentDetailsData = resPaymentDetails.data;
        console.log(paymentDetailsData);
        setUserData(paymentDetailsData);
      } catch (e) {
        console.log("errrr", e);
      }
    };
    fetchData();
  }, [userDetails]);

  useEffect(() => {
    console.log(coachId);
    const fetchData = async () => {
      currentCoachId.current = coachId;
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoachassignvaluesById/${coachId}`
        );
        const data = await res.json();
        console.log(data);
        if (currentCoachId.current === coachId) {
          const filteredData = data.filter(
            (item: { status: string }) => item.status === "success"
          );
          setCoachAssignDetails(filteredData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [coachId]);

  console.log(coachId);

  useEffect(() => {
    console.log(coachId);
    let formattedCoachId = coachId.replace(":", "");
    console.log(formattedCoachId);
    const fetchData = async () => {
      currentCoachId.current = coachId;
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoache/${formattedCoachId}`
        );
        const data = await res.json();
        console.log(data);
        if (currentCoachId.current === coachId) {
          setcoachData(data);
          console.log(data.sport_id);
          setCoachSport(data?.sport_id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [coachId]);
  console.log(coachSport);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails/${arcade}`
        );
        const data = await res.json();
        console.log(data);
        setarcadesofCoache(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [arcade]);
  console.log(coachId);
  console.log(dayOfWeek);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getCoachAvailiability/${coachId}`
        );
        const data = await res.json();
        console.log(data);
        const filteredData = data.filter(
          (item: any) => item.coach_id === coachId && item.day === dayOfWeek
        );
        console.log(filteredData);

        setAvaliability(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [coachId, dayOfWeek]);
  // console.log(
  //   arcadesofCoache?.zone.find((zone) => zone.sport.sport_id)?.zone_name
  // );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getCoachBookings`
        );
        const data = await res.json();
        console.log(data);
        setCoachBookings(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getZoneDetails/${zone}`
        );

        const data = await res.json();
        console.log(data);

        setZoneDetails(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [zone]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadebookingbydate/${datee}/${zone}`
        );

        const data = await res.json();
        console.log(data);
        setBookingDate(data);

        // Grouping data by booking time and calculating total participant count for each group
        const groupedByTime: {
          [key: string]: { bookings: any[]; totalParticipantCount: number };
        } = data.reduce(
          (
            acc: {
              [x: string]: { bookings: any[]; totalParticipantCount: number };
            },
            booking: { time: any; participant_count: any }
          ) => {
            const time = booking.time;
            if (!acc[time]) {
              acc[time] = { bookings: [], totalParticipantCount: 0 };
            }
            acc[time].bookings.push(booking);
            acc[time].totalParticipantCount += booking.participant_count;
            return acc;
          },
          {}
        );

        console.log("Grouped by time:");
        console.log(groupedByTime);

        // Logging participant count for each group
        for (const time in groupedByTime) {
          console.log(`Time: ${time}`);
          console.log(
            "Participant count:",
            groupedByTime[time].totalParticipantCount
          );
          // setTc(groupedByTime[time].totalParticipantCount)
        }

        // Logging total participant count with respect to the relevant date
        const totalParticipantCountByDate = Object.values(groupedByTime).reduce(
          (total: number, group: any) => total + group.totalParticipantCount,
          0
        );
        console.log(
          `Total participant count for date ${datee}:`,
          totalParticipantCountByDate
        );
        const timeParticipantCounts = Object.entries(groupedByTime).map(
          ([time, { totalParticipantCount }]) => ({
            time,
            totalParticipantCount,
          })
        );
        console.log("Time Participant Counts:", timeParticipantCounts);
        setTimeParticipantCounts1(timeParticipantCounts);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [datee, zone]);

  const handleFinish = async () => {
    console.log("gggggggggg");
    console.log(date, time, pcount, zoneForCoachBookings);
    console.log(userData?.user_id);
    const pcountInt = parseInt(pcount);

    if (parseInt(pcount) <= 0) {
      message.error("Participant count must be more than 0");
      return; // Stop further execution
    } else if (time === "") {
      message.error("Time must be selected");
      return; // Stop further execution
    } else {
      try {
        // Get current date and time
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = String(currentDate.getMonth() + 1).padStart(
          2,
          "0"
        );
        const currentDay = String(currentDate.getDate()).padStart(2, "0");
        const currentHours = String(currentDate.getHours()).padStart(2, "0");
        const currentMinutes = String(currentDate.getMinutes()).padStart(
          2,
          "0"
        );
        const currentSeconds = String(currentDate.getSeconds()).padStart(
          2,
          "0"
        );

        const currentDateTime = `${currentYear}-${currentMonth}-${currentDay} ${currentHours}:${currentMinutes}:${currentSeconds}`;

        setZoneBookings({
          date: datee,
          time: time,
          fullAmount: finalAmaount,
          participant_count: pcountInt,
          user_id: userData?.user_id,
          zone_id: zone,
          way_of_booking: reservationType,
          booking_type: "coach",
          created_at: currentDateTime, // Set current date and time
        });
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    }
  };

  // eslint-disable-next-line no-octal
  const openTimeStr = zoneDetails?.open_time ?? "";
  const closeTimeStr = zoneDetails?.close_time ?? "";
  console.log(openTimeStr);

  // Split the time string to get hours and minutes
  const [openHour, openMinute] = openTimeStr.split(":").map(Number);
  const [closeHour, closeMinute] = closeTimeStr.split(":").map(Number);

  // Concatenate hours and minutes with a period
  const openTime = openHour + openMinute / 60;
  const closeTime = closeHour + closeMinute / 60;
  const timeStep = zoneDetails?.time_Step as number;
  console.log(timeStep);
  let buttonData = [];

  for (let i = openTime; i < closeTime; i += timeStep) {
    let nextTime = i + timeStep;
    let hour = Math.floor(i);
    let minute = Math.round((i - hour) * 60);
    let nextHour = Math.floor(nextTime);
    let nextMinute = Math.round((nextTime - nextHour) * 60);

    let formattedTime = `${hour}:${
      minute < 10 ? "0" : ""
    }${minute} - ${nextHour}:${nextMinute < 10 ? "0" : ""}${nextMinute}`;

    if (date === dayjs().format("YYYY-MM-DD")) {
      // Split formattedTime into start and end times
      const [startTime, endTime] = formattedTime.split(" - ");

      // Parse start and end times into time objects
      const formattedStartTime = dayjs(startTime, "HH:mm");
      const formattedEndTime = dayjs(endTime, "HH:mm");
      const currentTime = dayjs();

      // Compare current time with start and end times
      const disabled = currentTime.isAfter(formattedEndTime);
      console.log(disabled);

      // Push time slot with disabled property into buttonData
      buttonData.push({
        id: formattedTime,
        time: formattedTime,
        disabled: disabled,
      });
    } else {
      // If it's not today's date, enable the time slot
      buttonData.push({
        id: formattedTime,
        time: formattedTime,
        disabled: false,
      });
    }

    console.log(buttonData);
  }

  console.log(time);
  const [messageApi, contextHolder] = message.useMessage();
  let coachAmount = Number(coachData?.rate) * Number(pcount);
  let coachRate = Number(coachData?.rate);
  let zonerate = Number(zoneDetails?.rate);
  let fullAmount;
  if (
    zoneDetails?.full_zone_rate === 0 &&
    reservationType === "person_by_person"
  ) {
    if (zoneDetails?.discount.discount_percentage === null) {
      fullAmount = Number(zonerate) * Number(pcount);
    } else {
      fullAmount =
        Number(zonerate) * Number(pcount) -
        (Number(zonerate) *
          Number(pcount) *
          Number(zoneDetails?.discount.discount_percentage)) /
          100;
    }
  } else if (zoneDetails?.full_zone_rate === 0 && reservationType === "full") {
    if (zoneDetails?.discount.discount_percentage === null) {
      fullAmount = Number(zonerate) * Number(zoneDetails.capacity);
    } else {
      fullAmount =
        Number(zonerate) * Number(zoneDetails.capacity) -
        (Number(zonerate) *
          Number(zoneDetails.capacity) *
          Number(zoneDetails?.discount.discount_percentage)) /
          100;
    }
  } else if (
    zoneDetails?.full_zone_rate !== 0 &&
    reservationType === "person_by_person"
  ) {
    if (zoneDetails?.discount.discount_percentage === null) {
      fullAmount = Number(zonerate) * Number(pcount);
    } else {
      fullAmount =
        Number(zonerate) * Number(pcount) -
        (Number(zonerate) *
          Number(pcount) *
          Number(zoneDetails?.discount.discount_percentage)) /
          100;
    }
  } else if (zoneDetails?.full_zone_rate !== 0 && reservationType === "full") {
    if (zoneDetails?.discount.discount_percentage === null) {
      fullAmount = Number(zoneDetails?.full_zone_rate);
    } else {
      fullAmount =
        Number(zoneDetails?.full_zone_rate) -
        (Number(zoneDetails?.full_zone_rate) *
          Number(zoneDetails?.discount.discount_percentage)) /
          100;
    }
  }
  let finalAmaount = Number(fullAmount) + coachAmount * timeStep;

  // let finalAmount;
  // if (zoneDetails?.discount === null) {
  //   finalAmount = fullAmount ?? 0;
  // } else {
  //   finalAmount =
  //     (fullAmount ?? 0) -
  //     ((fullAmount ?? 0) *
  //       Number(zoneDetails?.discount.discount_percentage ?? 0)) /
  //       100;
  // }
  console.log(fullAmount);

  console.log(fullAmount);
  console.log(avaliability);
  console.log(zoneDetails?.capacity);
  const capacity = zoneDetails?.capacity;
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const arcadeId = arcade;
  useEffect(() => {
    console.log(zoneDetails);
    try {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getPackageDetails/${arcade}`
        );

        const data = await res.json();
        console.log(data);
        setPackageDetails(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [zoneDetails]);
  const disabledDate = (current: Dayjs | null): boolean => {
    // Can not select days before today
    const today = dayjs().startOf("day");
    return current ? current.isBefore(today, "day") : false;
  };
  let zoneOpenTime = zoneDetails?.open_time;
  let zoneCloseTime = zoneDetails?.close_time;
  const isWithinPackageTime = (buttonTime: string, packageTime: string) => {
    const [start, end] = packageTime.split("-");
    const [buttonStart, buttonEnd] = buttonTime.split("-");

    // Convert times to minutes for easier comparison
    const timeToMinutes = (time: string) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    };

    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const buttonStartMinutes = timeToMinutes(buttonStart);
    const buttonEndMinutes = timeToMinutes(buttonEnd);

    // Check if button time is within the package time
    const isWithin =
      buttonStartMinutes >= startMinutes && buttonEndMinutes <= endMinutes;

    // Check for special case: add half-hour slots if needed
    if (!isWithin) {
      if (
        buttonStartMinutes === startMinutes - 30 ||
        buttonEndMinutes === endMinutes + 30
      ) {
        return true;
      }
    }

    return isWithin;
  };

  const isZoneTime = (buttonTime: string, zoneTime: string) => {
    const [start, end] = zoneTime.split("-");
    const [buttonStart, buttonEnd] = buttonTime.split("-");

    // Convert times to minutes for easier comparison
    const timeToMinutes = (time: string) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    };

    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const buttonStartMinutes = timeToMinutes(buttonStart);
    const buttonEndMinutes = timeToMinutes(buttonEnd);

    // Check if button time is within the zone time
    const isWithin =
      buttonStartMinutes >= startMinutes && buttonEndMinutes <= endMinutes;

    // Check for special case: add half-hour slots if needed
    if (!isWithin) {
      if (
        buttonStartMinutes === startMinutes - 30 ||
        buttonEndMinutes === endMinutes + 30
      ) {
        return true;
      }
    }

    return isWithin;
  };

  const isPackageDayAndTime = (buttonId: string) => {
    if (!dayOfWeek || !packageDetails || !packageDetails.package || !buttonId)
      return false;

    return packageDetails.package.some(
      (pkg) =>
        pkg.zone_id === zone &&
        pkg.packageDayAndTime &&
        pkg.packageDayAndTime.some(
          (pdt) =>
            pdt.day === dayOfWeek && isWithinPackageTime(buttonId, pdt.time)
        )
    );
  };

  const isZoneRejectDay = (buttonId: string) => {
    if (
      !dayOfWeek ||
      !zoneDetails ||
      !zoneDetails.zoneRejectDayAndTime ||
      !buttonId
    )
      return false;

    return zoneDetails.zoneRejectDayAndTime.some(
      (zoneday) =>
        zoneday.day === dayOfWeek &&
        isZoneTime(buttonId, zoneday.time as string)
    );
  };

  const isZoneRejectDate = (buttonId: string) => {
    if (
      !datee ||
      !zoneDetails ||
      !zoneDetails.zoneRejectDateAndTime ||
      !buttonId
    )
      return false;

    return zoneDetails.zoneRejectDateAndTime.some(
      (zoneday) =>
        zoneday.date === datee && isZoneTime(buttonId, zoneday.time as string)
    );
  };

  const isCoachInthePackage = (buttonId: string) => {
    if (!dayOfWeek || !packageDetails || !packageDetails.package || !buttonId)
      return false;

    return packageEnrollDataForCoach.some(
      (pkg) =>
        pkg.coach_id === coachId &&
        pkg.package.packageDayAndTime &&
        pkg.package.packageDayAndTime.some(
          (pdt) =>
            pdt.day === dayOfWeek && isWithinPackageTime(buttonId, pdt.time)
        )
    );
  };
  console.log(packageEnrollDataForCoach);
  console.log(isCoachInthePackage);

  return (
    <>
      <NavbarProfile />
      <div style={{ margin: "2%", marginTop: "4%" }}>
        <Row>
          <Col lg={24} xs={24}></Col>
          <Col lg={24} xs={24}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: "2.5",
              }}
            >
              Join Us and Unleash Your Potential with Our Expert Coaches
            </h1>
          </Col>
        </Row>
        <Form onFinish={handleFinish} layout="vertical">
          <Row>
            <Col xs={24} lg={10}>
              <div style={{ backgroundColor: "#E9F6FC" }}>
                <Row gutter={16} style={{}}>
                  <Col
                    xs={24}
                    md={12}
                    lg={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={BookingFormPicture}
                        alt="bookingForm"
                        style={{
                          width: "100%",
                          maxHeight: "350px",
                          display: "flex",
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      />
                    </div>
                  </Col>
                  <Col style={{}} xs={24} md={12} lg={24}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Calendar
                        style={{ width: "94%", marginLeft: "3%" }}
                        onChange={handleDateChange}
                        onSelect={handleDateSelect}
                        disabledDate={disabledDate} // Add this line to disable past dates
                      />
                    </div>
                  </Col>

                  <Form.Item
                    name="arcade"
                    label="Select Arcade"
                    rules={[{ required: true }]}
                    style={{
                      width: "90%",
                      marginLeft: "20px",
                    }}
                  >
                    <Select
                      placeholder="Select a Arcade"
                      onChange={(value) => setArcade(value)}
                      allowClear
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {coachAssignDetails?.length === 0 ? (
                        <Empty />
                      ) : (
                        coachAssignDetails?.map((arcadeName, index) => (
                          <Option key={index} value={arcadeName?.arcade_id}>
                            {arcadeName?.arcade.arcade_name}
                          </Option>
                        ))
                      )}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="zone"
                    label="Select Zone"
                    rules={[{ required: true }]}
                    style={{
                      width: "90%",
                      marginLeft: "20px",
                    }}
                  >
                    <Select
                      placeholder="Select a Zone"
                      onChange={(value) => setZone(value)}
                      allowClear
                      disabled={!arcade}
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {arcadesofCoache?.zone ? (
                        arcadesofCoache.zone
                          .filter((zone) => zone.sport.sport_id === coachSport)
                          .map((zone, index) => (
                            <Option key={index} value={zone.zone_id}>
                              {zone.zone_name}
                            </Option>
                          ))
                      ) : (
                        <Empty />
                      )}
                    </Select>
                  </Form.Item>
                </Row>
              </div>
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center" }}
              xs={24}
              lg={14}
            >
              <Row
                style={{
                  backgroundColor: "#BCE4EC",
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Item
                  name="Time Slot"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "20px",
                    width: "80%",
                    height: "800px",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    overflowY: "auto",
                  }}
                >
                  {dayOfWeek &&
                  avaliability &&
                  avaliability.length > 0 &&
                  zoneDetails ? (
                    <>
                      {/* Filter available slots for the selected day */}
                      {avaliability
                        .filter(
                          (item: any) => item.day === dayOfWeek && item.time
                        )
                        .flatMap((item: any) => {
                          const coachStartTime = parseFloat(
                            item.time.split("-")[0].split(":")[0]
                          ); // Get the coach's start hour
                          const coachEndTime = parseFloat(
                            item.time.split("-")[1].split(":")[0]
                          ); // Get the coach's end hour

                          const zoneOpenTime = parseFloat(
                            (zoneDetails.open_time ?? "00:00").split(":")[0]
                          );
                          const zoneCloseTime = parseFloat(
                            (zoneDetails.close_time ?? "24:00").split(":")[0]
                          );

                          const effectiveStartHour = Math.max(
                            coachStartTime,
                            zoneOpenTime
                          );
                          const effectiveEndHour = Math.min(
                            coachEndTime,
                            zoneCloseTime
                          );

                          const timeSlots: any[] = [];
                          const timeIncrement = zoneDetails.time_Step as number; // Get the time increment for the zone

                          for (
                            let i = zoneOpenTime;
                            i + timeIncrement <= zoneCloseTime;
                            i += timeIncrement
                          ) {
                            const slotStart = i;
                            const slotEnd = i + timeIncrement;

                            if (
                              slotStart >= effectiveStartHour &&
                              slotEnd <= effectiveEndHour
                            ) {
                              const startTimeHour = Math.floor(slotStart);
                              const startTimeMinutes =
                                slotStart % 1 === 0 ? "00" : "30"; // Adjust minutes
                              const endTimeHour = Math.floor(slotEnd);
                              const endTimeMinutes =
                                slotEnd % 1 === 0 ? "00" : "30"; // Adjust minutes

                              const startTime = `${startTimeHour}:${startTimeMinutes}`;
                              const endTime = `${endTimeHour}:${endTimeMinutes}`;

                              timeSlots.push({
                                startTime,
                                endTime,
                              });
                            }
                          }

                          return timeSlots;
                        })
                        // Sort the time slots based on start time
                        .sort(
                          (
                            a: { startTime: string },
                            b: { startTime: string }
                          ) => {
                            const timeA = a.startTime.split(":");
                            const timeB = b.startTime.split(":");
                            return (
                              parseInt(timeA[0]) * 60 +
                              parseInt(timeA[1]) -
                              (parseInt(timeB[0]) * 60 + parseInt(timeB[1]))
                            );
                          }
                        )
                        .map((slot: any, index: number) => (
                          <ConfigProvider
                            theme={{
                              components: {
                                Button: {
                                  colorPrimaryHover: "white",
                                },
                              },
                            }}
                            key={index} // Use a unique key for each time slot
                          >
                            <Button
                              id={`${slot.startTime}-${slot.endTime}`}
                              disabled={
                                coachBookings.find(
                                  (item) =>
                                    item.date === datee &&
                                    // item.zone_id === zone &&
                                    item.coach_id === coachId &&
                                    item.time ===
                                      `${slot.startTime}-${slot.endTime}` &&
                                    item.status === "success"
                                ) !== undefined ||
                                bookingDate.find((item) => {
                                  return (
                                    item.date === datee &&
                                    item.zone.zone_id === zone &&
                                    item.time ===
                                      `${slot.startTime}-${slot.endTime}` &&
                                    item.way_of_booking === "full" &&
                                    item.status === "success"
                                  );
                                }) !== undefined ||
                                !zone ||
                                !arcade ||
                                isPackageDayAndTime(
                                  `${slot.startTime}-${slot.endTime}`
                                ) ||
                                isZoneRejectDay(
                                  `${slot.startTime}-${slot.endTime}`
                                ) ||
                                isZoneRejectDate(
                                  `${slot.startTime}-${slot.endTime}`
                                ) ||
                                isCoachInthePackage(
                                  `${slot.startTime}-${slot.endTime}`
                                )
                              }
                              style={{
                                width: "100%",
                                height: "60px",
                                backgroundImage: bookingDate.find(
                                  (booking) =>
                                    booking.time ===
                                      `${slot.startTime}-${slot.endTime}` &&
                                    booking.date === datee &&
                                    booking.zone.zone_id === zone &&
                                    booking.way_of_booking === "full" &&
                                    booking.status === "success"
                                )
                                  ? "none" // If fully booked, no gradient needed
                                  : bookingDate.find((item) => {
                                      return (
                                        item.date === datee &&
                                        item.zone.zone_id === zone &&
                                        item.time ===
                                          `${slot.startTime}-${slot.endTime}` &&
                                        item.way_of_booking ===
                                          "person_by_person" &&
                                        item.booking_type === "zone" &&
                                        item.status === "success"
                                      );
                                    })
                                  ? `linear-gradient(to right, #0F70AE ${
                                      ((timeParticipantCounts1.find(
                                        (item) =>
                                          item.time ===
                                          `${slot.startTime}-${slot.endTime}`
                                      )?.totalParticipantCount || 0) /
                                        Number(capacity)) *
                                      100
                                    }%, ${
                                      `${slot.startTime}-${slot.endTime}` ===
                                      time
                                        ? "#1677FF"
                                        : "#2EA8BF"
                                    } 0%)`
                                  : "none",
                                backgroundColor:
                                  `${slot.startTime}-${slot.endTime}` === time
                                    ? "#1677FF"
                                    : coachBookings.some(
                                        (item) =>
                                          item.date === datee &&
                                          item.coach_id === coachId &&
                                          item.time ===
                                            `${slot.startTime}-${slot.endTime}` &&
                                          item.status === "success"
                                      ) ||
                                      bookingDate.find((item) => {
                                        return (
                                          item.date === datee &&
                                          item.way_of_booking === "full" &&
                                          item.time ===
                                            `${slot.startTime}-${slot.endTime}` &&
                                          item.status === "success"
                                        );
                                      }) ||
                                      isPackageDayAndTime(
                                        `${slot.startTime}-${slot.endTime}`
                                      ) ||
                                      isCoachInthePackage(
                                        `${slot.startTime}-${slot.endTime}`
                                      ) ||
                                      isZoneRejectDay(
                                        `${slot.startTime}-${slot.endTime}`
                                      ) ||
                                      isZoneRejectDate(
                                        `${slot.startTime}-${slot.endTime}`
                                      )
                                    ? "#FF0000" // Red color when disabled due to package time
                                    : "#2EA8BF",
                              }}
                              onClick={() => {
                                setTime(`${slot.startTime}-${slot.endTime}`);
                              }}
                            >
                              {coachBookings.some(
                                (item) =>
                                  item.date === datee &&
                                  // item.zone_id === zone &&
                                  item.coach_id === coachId &&
                                  item.time ===
                                    `${slot.startTime}-${slot.endTime}` &&
                                  item.status === "success"
                              ) ||
                              bookingDate.find((item) => {
                                return (
                                  item.date === datee &&
                                  item.zone.zone_id === zone &&
                                  item.time ===
                                    `${slot.startTime}-${slot.endTime}` &&
                                  item.way_of_booking === "full" &&
                                  item.status === "success"
                                );
                              })
                                ? "Booked"
                                : isPackageDayAndTime(
                                    `${slot.startTime}-${slot.endTime}`
                                  )
                                ? `${slot.startTime}-${slot.endTime} : Has a Package `
                                : isCoachInthePackage(
                                    `${slot.startTime}-${slot.endTime}`
                                  )
                                ? `${slot.startTime}-${slot.endTime} : Coach has a Package`
                                : isZoneRejectDay(
                                    `${slot.startTime}-${slot.endTime}`
                                  )
                                ? `${slot.startTime}-${slot.endTime} : Zone is Closed`
                                : isZoneRejectDate(
                                    `${slot.startTime}-${slot.endTime}`
                                  )
                                ? `${slot.startTime}-${slot.endTime} : Zone is Closed`
                                : `${slot.startTime}-${slot.endTime}`}
                            </Button>
                          </ConfigProvider>
                        ))}
                    </>
                  ) : (
                    <Empty
                      description={"Coach has no Available Times on This Day!"}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  name="Participant Count"
                  label={
                    <span>
                      Participant Count ( Available Participant Count is -{" "}
                      <span style={{ color: "red", fontSize: "16px" }}>
                        {Number(capacity) -
                          (timeParticipantCounts1.find(
                            (item) => item.time === time
                          )?.totalParticipantCount || 0)}
                      </span>{" "}
                      )
                    </span>
                  }
                  rules={[{ required: true, type: "number" }]}
                  style={{
                    width: "90%",
                    marginLeft: "20px",
                  }}
                >
                  <InputNumber
                    disabled={!time}
                    style={{
                      height: "50px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onChange={(value) => setPcount(value?.toString() || "")}
                  />
                </Form.Item>
                <Form.Item
                  name="way_of_booking"
                  label="Reservation Type"
                  rules={[{ required: true }]}
                  style={{
                    width: "90%",
                    marginTop: "0%",
                    marginLeft: "15px",
                  }}
                >
                  <Select
                    placeholder="Reservation Type"
                    onChange={(value) => setReservationType(value)}
                    allowClear
                    disabled={!time || !datee}
                    style={{
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {zoneDetails?.way_of_booking === "full" ? (
                      <>
                        <Option value="full">Full Zone</Option>
                        <Option value="person_by_person" disabled>
                          Individual
                        </Option>
                      </>
                    ) : zoneDetails?.way_of_booking === "person_by_person" ? (
                      <>
                        <Option value="full" disabled>
                          Full Zone
                        </Option>
                        <Option value="person_by_person">Individual</Option>
                      </>
                    ) : zoneDetails?.way_of_booking === "Both" &&
                      bookingDate.find(
                        (item) =>
                          item.date === datee &&
                          item.zone.zone_id === zone &&
                          item.time === time
                      ) ? (
                      <>
                        <Option value="full" disabled>
                          Full Zone
                        </Option>
                        <Option value="person_by_person">Individual</Option>
                      </>
                    ) : (
                      <>
                        <Option value="full">Full Zone</Option>
                        <Option value="person_by_person">Individual</Option>
                      </>
                    )}
                  </Select>
                </Form.Item>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={10}></Col>
            <Col xs={24} lg={14}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
            </Col>
          </Row>
          <Row>
            <Col xs={8} lg={6}>
              <Button
                htmlType="submit"
                style={{
                  width: "90%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#BAE5EE",
                }}
              >
                <LeftOutlined />
                Back
              </Button>
            </Col>
            <Col xs={0} lg={4}></Col>
            <Col xs={16} lg={14}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "0%",
                }}
              >
                {contextHolder}

                <PaymentModal
                  htmlType="submit"
                  item={"Coach Booking"}
                  orderId={5}
                  amount={finalAmaount}
                  currency={"LKR"}
                  first_name={userData?.firstname}
                  last_name={userData?.lastname}
                  email={userData?.email}
                  phone={userData?.accountNumber}
                  address={userData?.address}
                  city={userData?.city}
                  country={userData?.country}
                  date={datee}
                  time={time}
                  pcount={pcount}
                  userId={userDetails.id}
                  zoneId={zone}
                  arcadeId={arcade}
                  sportId={coachSport}
                  coach_id={coachId}
                  reservation_type={reservationType}
                  avaiableParticipantCount={
                    Number(capacity) -
                    (timeParticipantCounts1.find((item) => item.time === time)
                      ?.totalParticipantCount || 0)
                  }
                  coach_email={coachData?.user.email}
                  coach_name={
                    coachData?.user.firstname + " " + coachData?.user.lastname
                  }
                  role={userData?.role}
                  zone_name={zoneDetails?.zone_name}
                  user_name={userData?.firstname + " " + userData?.lastname}
                  arcade_name={arcadesofCoache?.arcade_name}

                  //zoneId={zoneId}
                  //reservation_type={zone}
                  //avaiableParticipantCount={
                  // Number(capacity) -
                  // (timeParticipantCounts1.find((item) => item.time === time)
                  //  ?.totalParticipantCount ?? 0)
                  //}
                />
              </div>
            </Col>
          </Row>
        </Form>
        <div style={{ marginTop: "40px" }}></div>
      </div>
    </>
  );
};

export default CoachBookingForm;
