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
} from "antd";
import BookingFormPicture from "../../assents/coachBookingForm1.png";
import Calender from "../../components/calender";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { usePlayer } from "../../context/player.context";
import { CoachBookingContext } from "../../context/coachBooking.context";
import { CoachAssignDetails, Zone } from "../../types";

const { Option } = Select;

const CoachBookingForm: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [pcount, setPcount] = useState<string>("");
  const [arcade, setArcade] = useState<string>("");
  const [coachAssignDetails, setCoachAssignDetails] = useState<
    CoachAssignDetails[]
  >([]);
  const { userDetails } = usePlayer();
  const { coachId } = useContext(CoachBookingContext);
  const [coachAssignArcades, setCoachAssignArcades] = useState<string[]>([]);
  const [zoneForCoachBookings, setzoneForCoachBookings] = useState<Zone>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoachassignvaluesById/${coachId}`
        );
        const data = await res.json();
        setCoachAssignDetails(data);
        setCoachAssignArcades(
          data.map(
            (coachAssignDetail: CoachAssignDetails) =>
              coachAssignDetail.arcade.arcade_name
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [coachId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getzoneForCoachBooking/${arcade}/${coachAssignDetails[0]?.coach.sport.sport_id}/${coachAssignDetails[0]?.coach.coach_id}`
        );
        const data = await res.json();
        console.log(data);
        setzoneForCoachBookings(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [arcade]);

  console.log(zoneForCoachBookings?.zone_id);

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
          zone_id: zoneForCoachBookings?.zone_id,
          arcade_id: arcade,
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
                    {coachAssignArcades?.length === 0 ? (
                      <Empty />
                    ) : (
                      coachAssignArcades?.map((arcadeName, index) => (
                        <Option
                          key={index}
                          value={coachAssignDetails[0]?.arcade.arcade_id}
                        >
                          {arcadeName}
                        </Option>
                      ))
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
              <Button
                htmlType="submit"
                style={{
                  width: "90%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2EA8BF",
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