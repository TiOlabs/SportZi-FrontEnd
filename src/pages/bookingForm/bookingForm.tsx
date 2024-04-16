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
import axiosInstance from "../../axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserIdContext } from "../../context/userId.context";
const { Option } = Select;

const BookingForm = () => {
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
    try {
      const fetchData = async () => {
        const res = await fetch(
          `http://localhost:8000/api/getarcadebookingbydate/${date}/${zoneId}`
        );

        const data = await res.json();
        console.log(data);
        setBookingDate(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [date]);

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
  const openTime = 9.00;
  const closeTime = 21.00;
  const timeStep =1;
  let buttonData = [];
  
  for (let i = openTime; i < closeTime; i += timeStep) {
    let nextTime = i + timeStep;
    let hour = Math.floor(i);
    let minute = (i - hour) * 60;
    let nextHour = Math.floor(nextTime);
    let nextMinute = (nextTime - nextHour) * 60;
  
    buttonData.push({ id: `${hour}:${minute < 10 ? '0' : ''}${minute}- ${nextHour}:${nextMinute < 10 ? '0' : ''}${nextMinute}`, time: `${hour}:${minute < 10 ? '0' : ''}${minute}- ${nextHour}:${nextMinute < 10 ? '0' : ''}${nextMinute}` });
    console.log(buttonData)
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

  return (
    <div style={{ margin: "2%" }}>
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
                  name="way_of_booking"
                  label="Way of Booking"
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
                    <Option value="full">Full Zone</Option>
                    <Option value="Individual">Individual</Option>
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
                  flexDirection: "column",
                  rowGap: "20px",
                  width: "80%",
                  height: "800px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  overflow: "auto",
                }}
              >
                {bookingDate.map((booking) => {
                  console.log(booking.time);
                  return (
                    <button
                      id={booking.time.toString()}
                      style={{ backgroundColor: "red" }}
                    ></button>
                  );
                })}
                {buttonData.map((button) => (
                  <button
                    disabled={
                      bookingDate.find(
                        (booking) => booking.time === button.id
                      )
                        ? true
                        : false
                    }
                    key={button.id}
                    id={button.id.toString()}
                    type="button"
                    onClick={() => setTime(button.id)}
                    style={{
                      width: "100%",
                      padding: "5%",
                      backgroundColor: bookingDate.find(
                        (booking) => booking.time === button.id
                      )
                        ? "red"
                        : button.id === time
                        ? "#1677FF"
                        : "white",
                    }}
                  >
                    {bookingDate.find(
                      (booking) => booking.time === button.id
                    )
                      ? "Booked"
                      : button.time}
                  </button>
                ))}
              </Form.Item>
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
              />
            </div>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "40px" }}>
        <AppFooter />
      </div>
    </div>
  );
};

export default BookingForm;
