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
import { Arcade, Coach, CoachAssignDetails, Zone } from "../../types";
import dayjs from "dayjs";
import { time } from "console";
import PaymentModal from "../../components/paymentCheckout";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { ZoneBookingsContext } from "../../context/zoneBookings.context";
const { Option } = Select;

const CoachBookingForm: React.FC = () => {
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
  const [datee, setDatee] = useState<Date | null>(null);

  const handleDateChange = (datee: any) => {
    setDatee(datee);
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
        setCoachAssignDetails(data);
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
          (item: any) => item.coach_id === coachId && item.date === dayOfWeek
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
  const handleFinish = async () => {
    console.log(date, time, pcount, zoneForCoachBookings);
    const pcountInt = parseInt(pcount);
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
          participant_count: pcountInt,
          user_id: userDetails.user_id,
          zone_id: zone,
        });
      } catch (err) {
        console.log("Error");
        console.log(err);
      }
    }
    try {
      const res = await axios.post(
        `http://localhost:8000/api/addCoachBooking`,
        {
          participant_count: pcountInt,
          date: date,
          time: time,
          coach_id: coachId,
          player_id: userDetails.id,
          // zone_id: zoneForCoachBookings.find(,
          arcade_id: arcade,
        }
      );
      console.log(res);
    } catch (err) {
      console.log("Error");
      console.log(err);
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
  let fullAmount = Number(coachData?.rate) * 1;
  console.log(avaliability);
  return (
    <div style={{ margin: "2%" }}>
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
                    <Form.Item name="date" rules={[{ required: true }]}>
                      <ConfigProvider
                        theme={{
                          token: {
                            controlHeightLG: 20,
                            borderRadiusLG: 10,
                          },
                        }}
                      >
                        <Calendar
                          style={{ width: "94%", marginLeft: "3%" }}
                          onChange={handleDateChange}
                          onSelect={handleDateSelect}
                        />
                      </ConfigProvider>
                    </Form.Item>
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
                        (item: any) => item.date === dayOfWeek && item.time
                      )
                      .flatMap((item: any) => {
                        const timeRange = item.time.split("-"); // Split the time range
                        const startHour = parseFloat(
                          timeRange[0].split(":")[0]
                        ); // Get the start hour
                        const endHour = parseFloat(timeRange[1].split(":")[0]); // Get the end hour
                        const timeIncrement = 2; // Set the time increment to half-hour

                        const timeSlots = [];

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
                            id={`${slot.startTime}-${slot.endTime}`} // Use the start and end times as the ID
                            style={{
                              width: "100%",
                              height: "60px",
                              backgroundColor:
                                `${slot.startTime}-${slot.endTime}` === time
                                  ? "#488ca8"
                                  : "#2EA8BF",
                            }}
                            onClick={() => {
                              setTime(`${slot.startTime}-${slot.endTime}`);
                            }}
                          >
                            {`${slot.startTime}-${slot.endTime}`}
                          </Button>
                        </ConfigProvider>
                      ))}
                  </>
                ) : (
                  <Empty />
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
                item={"Zone Booking"}
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
                date={date}
                time={time}
                pcount={pcount}
                userId={userDetails?.user_id}
                zoneId={zone}
                arcadeId={arcade}

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
  );
};

export default CoachBookingForm;