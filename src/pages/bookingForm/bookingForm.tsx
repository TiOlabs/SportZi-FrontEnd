import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button, Select, Input, InputNumber } from "antd";
import BookingFormPicture from "../../assents/BookingFormPicture.png";
import Calender from "../../components/calender";
import { LeftOutlined } from "@ant-design/icons";
const { Option } = Select;

const BookingForm = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [zone, setZone] = useState("");
  const [pcount, setPcount] = useState("");

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
    try {
      const res = await axios.post(
        "http://localhost:8000/api/addarcadebooking",
        {
          booking_date: date,
          booking_time: time,
          zone: zone,
          participant_count: pcountint,
        }
      );
      console.log(res);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  };

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
                    <Form.Item name="date">
                      <Calender
                        onChange={(date: any) => {
                          setDate(date);
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
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
                <button
                  type="button"
                  onClick={() => setTime("9")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  9
                </button>
                <button
                  type="button"
                  onClick={() => setTime("12")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  12
                </button>
                <button
                  type="button"
                  onClick={() => setTime("13")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  13
                </button>
                <button
                  type="button"
                  onClick={() => setTime("14")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  14
                </button>
                <button
                  type="button"
                  onClick={() => setTime("15")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  15
                </button>
                <button
                  type="button"
                  onClick={() => setTime("16")}
                  style={{ width: "100%", padding: "5%" }}
                >
                  16
                </button>
              </div>
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
            >
              <Form.Item
                name="zone"
                label="Zone"
                rules={[{ required: true }]}
                style={{
                  width: "90%",
                  marginTop: "2%",
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
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Participant Count"
                label="Participant Count"
                rules={[{ required: true, type: "number" }]}
                style={{
                  width: "90%",
                }}
              >
                <InputNumber
                  style={{
                    height: "50px",
                    width:"100%",
                    display: "flex",
                   alignItems: "center",
                  }}
                  onChange={(value) => setPcount(value?.toString() || "")}
                />
                {/* <Input
                  onChange={(event) => setPcount(event.target.value)}
                  placeholder="Participant Count"
                  allowClear
                  style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                /> */}
              </Form.Item>
            </div>
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
