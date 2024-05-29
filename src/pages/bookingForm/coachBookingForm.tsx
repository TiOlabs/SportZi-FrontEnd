import React, { useContext, useEffect, useState } from "react";
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
const { Option } = Select;

const CoachBookingForm: React.FC = () => {
  interface TimeParticipantCount {
    time: string;
    totalParticipantCount: number;
  }
  const { setZoneBookings } = useContext(ZoneBookingsContext);
  const [userDetails, setUserDetails] = useState<any>();
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
    setDayOfWeek(day);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = token ? jwtDecode(token) : undefined;
    setDecodedValues(decoded);
  }, []);
  const userID = decodedValues?.userId;
  useEffect(() => {
    try {
      const fetchData = async () => {
        const resPaymentDetails = await fetch(
          `http://localhost:8000/api/getuser/${userID}`
        );
        const paymentDetailsData = await resPaymentDetails.json();
        console.log(paymentDetailsData);
        setUserDetails(paymentDetailsData);
      };
      fetchData();
    } catch (e) {
      console.log("errrr", e);
    }
  }, [userID]);

  useEffect(() => {
    console.log(coachId);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoachassignvaluesById/${coachId}`
        );
        const data = await res.json();
        console.log(data);
        const filteredData = data.filter(
          (item: any) => item.status === "success"
        );
        setCoachAssignDetails(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [coachId, arcade]);
  console.log(arcade);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoache/${coachId}`
        );
        const data = await res.json();
        console.log(data);
        setcoachData(data);
        console.log(data.sport_id);
        setCoachSport(data?.sport_id);
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
          `http://localhost:8000/api/getZoneDetails/${zone}`
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
          `http://localhost:8000/api/getarcadebookingbydate/${datee}/${zone}`
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
    console.log(userDetails.user_id);
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
          participant_count: pcountInt,
          user_id: userDetails.user_id,
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
  const openTime = 8.0;
  const closeTime = 23.0;
  const timeStep = 1;
  let buttonData = [];
  for (let i = openTime; i < closeTime; i += timeStep) {
    let nextTime = i + timeStep;
    let hour = Math.floor(i);
    let minute = (i - hour) * 60;
    let nextHour = Math.floor(nextTime);
    let nextMinute = (nextTime - nextHour) * 60;

    let formattedTime = `${hour}:${
      minute < 10 ? "0" : ""
    }${minute}- ${nextHour}:${nextMinute < 10 ? "0" : ""}${nextMinute}`;

    if (date === dayjs().format("YYYY-MM-DD")) {
      // Split formattedTime into start and end times
      const [startTime, endTime] = formattedTime.split("-");

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
  let zonerate = Number(zoneDetails?.rate);
  let fullAmount = coachAmount + zonerate * Number(pcount);
  let zoneAmount = fullAmount - coachAmount;
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
  const disabledDate = (current: Dayjs | null): boolean => {
    // Can not select days before today
    const today = dayjs().startOf("day");
    return current ? current.isBefore(today, "day") : false;
  };
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
                    name="Participant Count"
                    label="Participant Count"
                    rules={[{ required: true, type: "number" }]}
                    style={{
                      width: "90%",
                      marginLeft: "20px",
                    }}
                  >
                    <InputNumber
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
                  <Form.Item
                    name="way_of_booking"
                    label="Reservation Type"
                    rules={[{ required: true }]}
                    style={{
                      width: "90%",
                      marginTop: "0%",
                      marginLeft: "20px",
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
              </div>
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center" }}
              xs={24}
              lg={14}
            >
              <div
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
                  }}
                >
                  {dayOfWeek && avaliability && avaliability.length > 0 ? (
                    <>
                      {/* Filter available slots for the selected day */}
                      {avaliability
                        .filter(
                          (item: any) => item.day === dayOfWeek && item.time
                        )
                        .flatMap((item: any) => {
                          const timeRange = item.time.split("-"); // Split the time range
                          const startHour = parseFloat(
                            timeRange[0].split(":")[0]
                          ); // Get the start hour
                          const endHour = parseFloat(
                            timeRange[1].split(":")[0]
                          ); // Get the end hour
                          const timeIncrement = 1; // Set the time increment to half-hour

                          const timeSlots: any[] = [];

                          // Generate time slots half-hour by half-hour
                          for (
                            let i = startHour;
                            i < endHour;
                            i += timeIncrement
                          ) {
                            const startTimeHour = Math.floor(i);
                            const startTimeMinutes = i % 1 === 0 ? "00" : "30"; // Determine if it's on the hour or half past the hour
                            const endTimeHour = Math.floor(i + timeIncrement);
                            const endTimeMinutes =
                              (i + timeIncrement) % 1 === 0 ? "00" : "30"; // Determine if it's on the hour or half past the hour

                            const startTime = `${startTimeHour}:${startTimeMinutes}`;
                            const endTime = `${endTimeHour}:${endTimeMinutes}`;

                            timeSlots.push({
                              startTime,
                              endTime,
                            });
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
                                    item.zone_id === zone &&
                                    item.coach_id === coachId &&
                                    item.time ===
                                      `${slot.startTime}-${slot.endTime}` &&
                                    item.status === "success"
                                ) !== undefined ||
                                bookingDate.find((item) => {
                                  console.log(item.date);
                                  console.log(item.time); // Logging item.date
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
                                !arcade
                              }
                              // Use the start and end times as the ID
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
                                      console.log("hhhhhhhh");
                                      console.log(zoneDetails?.capacity);
                                      console.log(timeParticipantCounts1);
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
                                          item.zone_id === zone &&
                                          item.coach_id === coachId &&
                                          item.time ===
                                            `${slot.startTime}-${slot.endTime}` &&
                                          item.status === "success"
                                      ) ||
                                      bookingDate.find((item) => {
                                        console.log(item.date);
                                        console.log(item.time);
                                        console.log(item.way_of_booking);
                                        return (
                                          item.date === datee &&
                                          item.zone.zone_id === zone &&
                                          item.way_of_booking === "full" &&
                                          item.time ===
                                            `${slot.startTime}-${slot.endTime}` &&
                                          item.status === "success"
                                        );
                                      })
                                    ? "#FF0000" // Red color when disabled
                                    : "#2EA8BF",
                              }}
                              onClick={() => {
                                setTime(`${slot.startTime}-${slot.endTime}`);
                              }}
                            >
                              {coachBookings.some(
                                (item) =>
                                  item.date === datee &&
                                  item.zone_id === zone &&
                                  item.coach_id === coachId &&
                                  item.time ===
                                    `${slot.startTime}-${slot.endTime}` &&
                                  item.status === "success"
                              ) ||
                              bookingDate.find((item) => {
                                console.log(item.date);
                                console.log(item.time); // Logging item.date
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
                                : `${slot.startTime}-${slot.endTime}`}
                            </Button>
                          </ConfigProvider>
                        ))}
                    </>
                  ) : (
                    <Empty
                      description={"Coach has no Availible Times on This Day!"}
                    />
                  )}
                </Form.Item>
              </div>
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
                  amount={fullAmount}
                  currency={"LKR"}
                  first_name={userDetails?.firstname}
                  last_name={userDetails?.lastname}
                  email={userDetails?.email}
                  phone={userDetails?.phone}
                  address={userDetails?.address}
                  city={userDetails?.city}
                  country={userDetails?.contry}
                  date={datee}
                  time={time}
                  pcount={pcount}
                  userId={userDetails?.user_id}
                  zoneId={zone}
                  arcadeId={arcade}
                  sportId={coachSport}
                  coach_id={coachId}
                  reservation_type={reservationType}
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
