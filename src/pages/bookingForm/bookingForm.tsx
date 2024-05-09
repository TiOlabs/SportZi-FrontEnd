import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Form,
  Button,
  Select,
  Input,
  InputNumber,
  message,
} from "antd";
import BookingFormPicture from "../../assets/BookingFormPicture.png";
import Calender from "../../components/calender";
import { LeftOutlined } from "@ant-design/icons";
import AppFooter from "../../components/footer";
import PaymentModal from "../../components/paymentCheckout";
import { User, Zone, ZoneBookingDetails } from "../../types";
import { ZoneBookingsContext } from "../../context/zoneBookings.context";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserIdContext } from "../../context/userId.context";
import { useLocation } from "react-router-dom";
import NavbarProfile from "../../components/NavBarProfile";
import dayjs from "dayjs";
import { count } from "console";
import { max } from "moment";

const { Option } = Select;

const BookingForm = () => {
  interface TimeParticipantCount {
    time: string;
    totalParticipantCount: number;
  }
  const location = useLocation() as unknown as { bookings: any };
  const { bookings } = location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bookings]);
  const { setZoneBookings } = useContext(ZoneBookingsContext);
  const { setUserId } = useContext(UserIdContext);
  const [form] = Form.useForm();
  const [decodedValues, setDecodedValues] = useState<any>();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [zone, setZone] = useState("");
  const [pcount, setPcount] = useState("");
  const [zoneDetails, setZoneDetails] = useState<Zone>();
  const [bookingCount, setbookingCount] = useState<Number>();
  const [bookingDate, setBookingDate] = useState<ZoneBookingDetails[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<User>();
  const [timeParticipantCounts1, setTimeParticipantCounts1] = useState<
    TimeParticipantCount[]
  >([]);
  // payment_id: "",
  // oder_id: "",
  // items: "",
  // amount: "",
  // currency: "",
  // first_name: "",
  // last_name: "",
  // email: "",
  // phone: "",
  // address: "",
  // city: "",
  // country: "",
  const { zoneId } = useContext(ZoneBookingsContext);
  console.log("Clicked Zone: ", zoneId);
  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = token ? jwtDecode(token) : undefined;
    setDecodedValues(decoded);
  }, []);
  console.log(decodedValues?.userId);
  const userId = decodedValues?.userId;
  setUserId();
  console.log(userId);

  console.log(userId);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const resPaymentDetails = await fetch(
          `http://localhost:8000/api/getuser/${userId}`
        );
        const paymentDetailsData = await resPaymentDetails.json();
        console.log(paymentDetailsData);
        setPaymentDetails(paymentDetailsData);
      };
      fetchData();
    } catch (e) {
      console.log("errrr", e);
    }
  }, [userId]);
  console.log(date);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/getarcadebookingbydate/${date}/${zoneId}`
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
          `Total participant count for date ${date}:`,
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
  }, [date, zoneId]);

  console.log("Time Participant Counts:", timeParticipantCounts1);
  const participantCounts: number[] = bookingDate.map(
    (booking) => booking.participant_count as number
  );

  console.log(participantCounts);
  const sumParticipantCount: number = participantCounts.reduce(
    (total: number, count: number) => total + count,
    0
  );

  console.log("Sum of participant counts:", sumParticipantCount);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `http://localhost:8000/api/getZoneDetails/${zoneId}`
        );

        const data = await res.json();
        console.log(data);
        setZoneDetails(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log(paymentDetails);

  console.log(zoneDetails?.rate);
  console.log(zoneDetails?.capacity);
  const capacity = zoneDetails?.capacity;
  console.log(capacity);
  const rate = zoneDetails?.rate;
  console.log(pcount);
  let fullAmount = Number(rate) * Number(pcount);
  console.log(fullAmount);

  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const resPaymentDetails = await fetch(
  //         "http://localhost:8000/api/getarcadebookings"
  //       );
  //       const paymentDetailsData = await resPaymentDetails.json();

  //       // const respaymentStatus = await fetch(
  //       //   "http://localhost:8000/api/postpaymentStatus"
  //       // );
  //       // const paymentStatusData = await respaymentStatus.json();

  //       // setPaymentStatus(paymentStatusData);
  //       //...........

  //       console.log(paymentDetailsData);
  //       setPaymentDetails(paymentDetailsData);
  //     };
  //     fetchData();
  //   } catch (e) {
  //     console.log("errrr", e);
  //   }
  // }, []);

  // const onZoneChange = (value: string) => {
  //   console.log(value);
  //   setZone(value);

  // switch (value) {
  //   case "male":
  //     form.setFieldsValue({ note: "Hi, man!" });
  //     break;
  //   case "female":
  //     form.setFieldsValue({ note: "Hi, lady!" });
  //     break;
  //   case "other":
  //     form.setFieldsValue({ note: "Hi there!" });
  //     break;
  //   default:
  // }
  // };
  // const onPcountChange = (value: string) => {
  //   console.log(value);
  //   setPcount(value);
  // };

  const handleFinish = async () => {
    console.log(date, time, zone, pcount);
    const pcountint = parseInt(pcount);
    if (parseInt(pcount) <= 0) {
      message.error("Participant count must be more than 0");
      return; // Stop further execution
    } else if (time === "") {
      message.error("time must be selected");
      return; // Stop further execution
    } else {
      try {
        setZoneBookings({
          date: date,
          time: time,
          participant_count: pcountint,
          user_id: userId,
          zone_id: zoneId,
          way_of_booking: zone,
          booking_type:"zone"
        });

        // setZoneBookings(
        //   {
        //     date: date,
        //     time: time,
        //     participant_count: pcountint,
        //     user_id: userId,
        //     zone_id: zoneId,
        //   },
        //   () => {
        //     console.log("Zone Bookings added");
        //   }
        // );

        // const res = await axiosInstance.post(
        //   `http://localhost:8000/api/addarcadebooking`,
        //   {
        //     date: date,
        //     time: time,
        //     // rate: fullAmount,
        //     participant_count: pcountint,
        //     user_id: userId,
        //     zone_id: zoneId,
        //   }
        // );
        // console.log(res);
        // console.log(res.data.cancel_by_admin);
      } catch (err) {
        console.log("Errorrr");
        console.log("Error");
        console.log(err);
      }
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Booking Successfull!",
        duration: 2,
      });
    }, 1000);
  };

  const openTimeStr = zoneDetails?.open_time ?? "";
  const closeTimeStr = zoneDetails?.close_time ?? "";
  console.log(openTimeStr);

  // Split the time string to get hours and minutes
  const [openHour, openMinute] = openTimeStr.split(":").map(Number);
  const [closeHour, closeMinute] = closeTimeStr.split(":").map(Number);

  // Concatenate hours and minutes with a period
  const openTime = openHour + openMinute / 60;
  const closeTime = closeHour + closeMinute / 60;

  console.log(openTime); // Example: 8.0
  console.log(closeTime); // Example: 17.0

  const timeStep = 1;
  let buttonData = [];
  for (let i = openTime; i < closeTime; i += timeStep) {
    console.log(i);
    let nextTime = i + timeStep;
    let hour = Math.floor(i);
    let minute = (i - hour) * 60;
    let nextHour = Math.floor(nextTime);
    let nextMinute = (nextTime - nextHour) * 60;

    let formattedTime = `${hour}:${minute < 10 ? "0" : ""}${minute}- ${nextHour}:${nextMinute < 10 ? "0" : ""}${nextMinute}`;
    formattedTime = formattedTime.replace(/\s/g, ''); // Remove any spaces

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


  // const buttonData = [
  //   { id: "1", time: "9.00-10.00" },
  //   { id: "2", time: "10.00-11.00" },
  //   { id: "3", time: "11.00-12.00" },
  //   { id: "4", time: "12.00-13.00" },
  //   { id: "5", time: "13.00-14.00" },
  //   { id: "6", time: "14.00-15.00" },
  //   { id: "7", time: "15.00-16.00" },
  //   { id: "8", time: "16.00-17.00" },
  //   { id: "9", time: "17.00-18.00" },
  //   { id: "10", time: "18.00-19.00" },
  //   { id: "11", time: "19.00-20.00" },
  //   { id: "12", time: "20.00-21.00" },
  // ];
  const formattedTime = dayjs().format("HH:mm");
  console.log(capacity);
  const calculateLinearGradientPercentage = (
    count: number,
    capacity: number
  ) => {
    console.log(count, capacity);
    return (count / capacity) * 100 + "%";
  };
  console.log("565");
  console.log(capacity);
  console.log(timeParticipantCounts1);
  return (
    <>
      <NavbarProfile />
      <div style={{ margin: "2%", marginTop: "4%" }}>
        <h1
          style={{
            display: "Flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Book your slot Today!
        </h1>
        <Form onFinish={handleFinish} layout="vertical">
          <Row>
            <Col xs={24} lg={10}>
              <div style={{ backgroundColor: "#F0F8FF" }}>
                <Row gutter={16} style={{}}>
                  <Col
                    xs={24}
                    md={12}
                    lg={24}
                    style={{ display: "Flex", justifyContent: "center" }}
                  >
                    <div style={{ display: "Flex", justifyContent: "center" }}>
                      <img
                        src={BookingFormPicture}
                        alt="bookingForm"
                        style={{
                          width: "100%",
                          maxHeight: "350px",
                          display: "Flex",
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      />
                    </div>
                  </Col>
                  <Col style={{}} xs={24} md={12} lg={24}>
                    <div style={{ display: "Flex", justifyContent: "center" }}>
                      <Form.Item name="date" rules={[{ required: true }]}>
                        <Calender
                          onChange={(date: any) => {
                            setDate(date);
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
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
                      placeholder="Select a Zone"
                      onChange={(value) => setZone(value)}
                      allowClear
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
                      ) : (
                        <>
                          <Option value="full">Full Zone</Option>
                          <Option value="person_by_person">Individual</Option>
                        </>
                      )}
                    </Select>
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
                      disabled={!date || !time}
                      style={{
                        height: "50px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                      max={
                        Number(capacity) -
                        (timeParticipantCounts1.find(
                          (item) => item.time === time
                        )?.totalParticipantCount || 0)
                      }
                      onChange={(value) => setPcount(value?.toString() || "")}
                    />
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
                  backgroundColor: "#7493BF",
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <Form.Item
                name="Time Slot"
                label="time Slot"
                rules={[{ required: true }]}
              > */}
                <Form.Item
                  name="Time Slot"
                  style={{
                    display: "flex",
                    marginTop: "20px",
                    flexDirection: "column",
                    rowGap: "20px",
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    overflowY: "auto", // Set overflowY to "auto" to enable vertical scrolling
                    maxHeight: "800px", // Adjust the maximum height to fit your layout
                  }}
                >
                  {bookingDate.map((booking) => {
                    console.log(booking.time);
                    return (
                      <button
                        id={booking.time.toString()}
                        style={{ backgroundColor: "red", width: "50%" }} // Adjusted width to 50%
                      ></button>
                    );
                  })}
                  {buttonData.map((button) => (
                    <button
                      disabled={bookingDate.find(
                        (booking) =>
                          booking.time === button.id &&
                          booking.way_of_booking === "full"
                      ) !== undefined ||
                        timeParticipantCounts1.find(
                          (item) => item.time === button.id
                        )?.totalParticipantCount === capacity
                      }
                      key={button.id}
                      id={button.id.toString()}
                      type="button"
                      onClick={() => setTime(button.id)}
                      style={{
                        width: "100%",
                        padding: "5%",
                        backgroundColor: bookingDate.find(
                          (booking) =>
                            booking.time === button.id &&
                            booking.way_of_booking === "full"
                        )
                          ? "#0F70AE" // If fully booked, set background color to red
                          : button.id === time // Otherwise, use the original logic for background color
                          ? "#1677FF"
                          : "white",
                        // Adjusted background color to cover only half of the button when booked
                        backgroundImage: bookingDate.find(
                          (booking) =>
                            booking.time === button.id &&
                            booking.way_of_booking === "full"
                        )
                          ? "none" // If fully booked, no gradient needed
                          : bookingDate.find((booking) => booking.time === button.id)
                          ? `linear-gradient(to right, #0F70AE ${
                              ((timeParticipantCounts1.find(
                                (item) => item.time === button.id
                              )?.totalParticipantCount || 0) /
                                Number(capacity)) *
                              100
                            }%, ${button.id === time ? "#1677FF" : "white"} 0%)`
                          : "none",
                      }}
                    >
                      {bookingDate.find(
                        (booking) =>
                          booking.time === button.id &&
                          booking.way_of_booking === "full"
                      )
                        ? "Fully Booked" 
                        : timeParticipantCounts1.find(
                            (item) => item.time === button.id
                          )?.totalParticipantCount === capacity
                        ? "Fully Booked"
                        : `${
                            (timeParticipantCounts1.find(
                              (item) => item.time === button.id
                            )?.totalParticipantCount ?? 0) > 0
                              ? button.time.toString()
                              : button.time.toString()
                          }`}
                    </button>
                  ))}
                </Form.Item>
                {/* ${button.time} */}
                {/* </Form.Item> */}
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
                type="primary"
                style={{
                  width: "90%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
                  item={"Zone Booking"}
                  orderId={5}
                  amount={fullAmount}
                  currency={"LKR"}
                  first_name={paymentDetails?.firstname}
                  last_name={paymentDetails?.lastname}
                  email={paymentDetails?.email}
                  phone={paymentDetails?.Phone}
                  address={paymentDetails?.address}
                  city={paymentDetails?.city}
                  country={paymentDetails?.country}
                  date={date}
                  time={time}
                  pcount={pcount}
                  userId={userId}
                  zoneId={zoneId}
                  reservation_type={zone}
                  avaiableParticipantCount={
                    Number(capacity) -
                    (timeParticipantCounts1.find((item) => item.time === time)
                      ?.totalParticipantCount ?? 0)
                  }
                />
              </div>
            </Col>
          </Row>
        </Form>
        <div style={{ marginTop: "40px" }}>
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default BookingForm;
