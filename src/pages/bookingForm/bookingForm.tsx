import React, { useRef, useState } from "react";
import { Row, Col, Form, Button } from "antd";
import BookingFormPicture from "../../assents/BookingFormPicture.png";
import Calender from "../../components/calender";

const BookingForm = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState("");

  const [bookingForm, setBookingForm] = useState({
    id: null,
    date: "",
    time: "",
    participant_count: null,
  });

  const handleFinish = (date: any) => {
    console.log("haai", date);
    console.log("haai", time);
  };

  // const handleChangeDate = (e) => {
  //   setBookingForm({ ...bookingForm, date: e.target.value });
  // };
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
      <Form onFinish={handleFinish}>
        <Row>
          <Col xs={24} lg={10}>
            <Row gutter={16} style={{ borderStyle: "dotted" }}>
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
                  <Form.Item name="date">
                    <Calender />
                  </Form.Item>
                </div>
              </Col>
            </Row>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                  width: "80%",
                  height: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  overflow: "auto",
                }}
              >
                <button type="button" onClick={()=> setTime("9")} style={{ width: "100%", padding: "5%" }}>
                  9
                </button>
                <button type="button" onClick={()=> setTime("12")} style={{ width: "100%", padding: "5%" }}>
                  12
                </button>
                <button type="button" onClick={()=> setTime("13")} style={{ width: "100%", padding: "5%" }}>
                  13
                </button>
                <button type="button"  onClick={()=> setTime("14")}style={{ width: "100%", padding: "5%" }}>
                  14
                </button>
                <button type="button" onClick={()=> setTime("15")} style={{ width: "100%", padding: "5%" }}>
                  15
                </button>
                <button type="button" onClick={()=> setTime("16")} style={{ width: "100%", padding: "5%" }}>
                  16
                </button>
              </div>
            </div>
            <div></div>
          </Col>
          <Col xs={24} md={10}></Col>
          <Col xs={24} md={14}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" htmlType="submit" style={{ width: "80%" }}>
                Book
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BookingForm;
