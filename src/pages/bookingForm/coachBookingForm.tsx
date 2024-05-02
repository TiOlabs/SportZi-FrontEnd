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
} from "antd";
import BookingFormPicture from "../../assents/coachBookingForm1.png";
import Calender from "../../components/calender";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { usePlayer } from "../../context/player.context";
import { CoachBookingContext } from "../../context/coachBooking.context";
import { Arcade, CoachAssignDetails, Zone } from "../../types";
import dayjs from "dayjs";
import { time } from "console";
import PaymentModal from "../../components/paymentCheckout";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const { Option } = Select;

const CoachBookingForm: React.FC = () => {
  const { userId } = usePlayer();
  const [userDetails, setUserDetails] = useState<any>();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [pcount, setPcount] = useState<string>("");
  const [arcade, setArcade] = useState<string>("");
  const [coachSport, setCoachSport] = useState<string>("");
  const [coachAssignDetails, setCoachAssignDetails] = useState<
    CoachAssignDetails[]
  >([]);
  const [decodedValues, setDecodedValues] = useState<any>();
  const { coachId } = useContext(CoachBookingContext);
  const [zoneForCoachBookings, setzoneForCoachBookings] = useState<Zone[]>([]);
  const [arcadesofCoache, setarcadesofCoache] = useState<Arcade>();
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
  }, [coachId]);
  console.log(arcade);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoach/${coachId}`
        );
        const data = await res.json();
        console.log(data?.sport.sport_id);
        setCoachSport(data?.sport.sport_id);
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
         `${process.env.REACT_APP_API_URL}api/getarcadeDetailsById/${arcade}`
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
        // Add your logic here
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
                      <Calender
                        onChange={(date: any) => {
                          setDate(date);
                        }}
                      />
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
                        <Option key={index} value={arcadeName.arcade_id}>
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
                    onChange={(value) => setArcade(value)}
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
                {buttonData.map((button) => (
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimaryHover: "white",
                        },
                      },
                    }}
                  >
                    <Button
                      key={button.id}
                      id={button.id.toString()}
                      disabled={button.disabled}
                      style={{
                        width: "100%",
                        height: "60px",

                        backgroundColor:
                          button.id === time ? "#488ca8" : "#2EA8BF",
                      }}
                      onClick={() => {
                        setTime(button.time);
                      }}
                    >
                      {button.time}
                    </Button>
                  </ConfigProvider>
                ))}
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
                amount={500}
                currency={"LKR"}
                first_name={userDetails?.firstname}
                last_name={userDetails?.lastname}
                email={userDetails?.email}
                phone={userDetails?.Phone}
                address={userDetails?.address}
                city={userDetails?.city}
                country={userDetails?.country}
                date={date}
                time={time}
                pcount={pcount}
                userId={userId}
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