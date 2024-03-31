import React, {useState } from "react";
import { Row, Col, Form, Button, Select, InputNumber, message } from "antd";
import BookingFormPicture from "../../assets/BookingFormPicture.png";
import Calender from "../../components/calender";
import { LeftOutlined } from "@ant-design/icons";

const { Option } = Select;

const CoachBookingForm = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [zone, setZone] = useState("");
  const [pcount, setPcount] = useState("");

  const handleFinish = async () => {
    console.log(date, time, zone, pcount);
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
    <div style={{ margin: "2%" }}>
      {" "}
      <Row>
        <Col lg={13} xs={24}></Col>
        <Col lg={8} xs={24}>
          {" "}
          <h1
            style={{
              display: "Flex",
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
                <button
                  type="button"
                  onClick={() => setTime("9")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  9.00-10.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("12")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  10.00-11.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("13")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  11.00-12.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("14")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  12.00-13.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("15")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  13.00-14.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("16")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  14.00-15.00
                </button>

                <button
                  type="button"
                  onClick={() => setTime("17")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  15.00-16.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("18")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  16.00-17.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("19")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  17.00-18.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("20")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  18.00-19.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("21")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  19.00-20.00
                </button>
                <button
                  type="button"
                  onClick={() => setTime("22")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  20.00-21.00
                </button>
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
              htmlType="submit"
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
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "90%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "40px" }}></div>
    </div>
  );
};

export default CoachBookingForm;