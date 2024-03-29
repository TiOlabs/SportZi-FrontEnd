import { Col, Row, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import axios from "axios";
import { ZoneBookingDetails } from "../../../types";
const PlayerCanceled = () => {
  const [value, setValue] = useState(1);
  const [playerBookingDetails, setPlayerBookingDetails] = useState<
    ZoneBookingDetails[]
  >([]);
  const [playerCanceled, setPlayerCanceled] = useState<ZoneBookingDetails[]>(
    []
  );

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8000/api/getarcadebookings"
        );
        const data = await res.data;
        setPlayerBookingDetails(data);
        console.log(data);

        // console.log(arcadeBookings.filter((arcadeBooking) => arcadeBooking.);

        const playerCanceledBookings = data.filter(
          (arcadeBooking: ZoneBookingDetails) =>
            arcadeBooking.status === "canceled_By_Player"
        );
        console.log(playerCanceledBookings);

        setPlayerCanceled(playerCanceledBookings);
        console.log(playerCanceled);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  });

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    console.log(value);

    if (value === 1) {
      const playerCanceledBookings = playerBookingDetails.filter((arcadeBooking: ZoneBookingDetails) => {
        const canceledTime = new Date(arcadeBooking.canceled_at as string).getTime(); // Convert canceled_at to a valid Date object
        const createdTime = new Date(arcadeBooking.created_at as string).getTime();
        const timeDifference = canceledTime - createdTime;
        const twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        return timeDifference < twentyFourHoursInMillis;
      });
      setPlayerCanceled(playerCanceledBookings);
    }else if (value === 2) {
      const playerCanceledBookings = playerBookingDetails.filter((arcadeBooking: ZoneBookingDetails) => {
        const canceledTime = new Date(arcadeBooking.canceled_at as string).getTime(); // Convert canceled_at to a valid Date object
        const createdTime = new Date(arcadeBooking.created_at as string).getTime();
        const timeDifference = canceledTime - createdTime;
        console.log(timeDifference);
        const twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        return timeDifference > twentyFourHoursInMillis;
      });
      setPlayerCanceled(playerCanceledBookings);
    }
};

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Cancelled By Player</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          {" "}
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Before 24 hours</Radio>
            <Radio value={2}>After 24 hours</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Col style={{ marginTop: "20px", maxHeight: "75vh", overflowY: "auto" }}>
        {playerCanceled.map((ZoneBookingDetails: ZoneBookingDetails) => (
          <DataRow
            booking_id={ZoneBookingDetails.zone_booking_id} // Fix: Access the zone_booking_id property from ZoneBookingDetails
            booked_Arena={ZoneBookingDetails.zone.zone_name}
            booked_by={ZoneBookingDetails.user.firstname}
            rate={
              Number(ZoneBookingDetails.zone.rate) *
              Number(ZoneBookingDetails.participant_count)
            }
            user_id={ZoneBookingDetails.user.user_id}
            zone_id={ZoneBookingDetails.zone.zone_id}
            zone={ZoneBookingDetails.zone.zone_name}
            booking_date={ZoneBookingDetails.date}
            booking_time={ZoneBookingDetails.time}
            participant_count={ZoneBookingDetails.participant_count}
            created_at={ZoneBookingDetails.created_at}
            canceled_at={ZoneBookingDetails.canceled_at}
          />
        ))}
      </Col>
    </Col>
  );
};

export default PlayerCanceled;

function DataRow(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(props);
  return (
    <Row
      style={{
        backgroundColor: "white",
        padding: "1%",
        marginTop: "63px",
      }}
    >
      <Col span={8} style={{}}>
        <div
          style={{
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "80px",
            height: "80px",
            backgroundColor: "#000",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {props.booked_Arena}
        </div>
      </Col>
      <Col span={2} style={{}}>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {" "}
          Rs.{props.rate}
        </div>
      </Col>
      <Col span={8}>
        <div
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "80px",
            height: "80px",
            backgroundColor: "#000",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {props.booked_by}
        </div>
      </Col>
      <Col span={6} style={{}}>
        <div
          style={{
            height: "80px",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            onClick={showModal}
            style={{ width: "100px", backgroundColor: "#0E458E" }}
          >
            <div
              style={{
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Details
            </div>
          </Button>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ lineHeight: 3.0, fontSize: "160px" }}>
              <Row>
                <div style={{ fontSize: "28px", color: "#0E458E" }}>
                  Booking Details
                </div>
                <Col span={24}>
                  <b>Booking ID :</b> {props.booking_id}
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={16}>
                      <b>Booked By : </b> {props.booked_by}
                    </Col>
                    <Col span={8}>
                      <b>User_ID : </b> {props.user_id}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={16}>
                      <b>Arcade :</b> Super Box Complex
                    </Col>
                    <Col span={8}>
                      <b>User_ID</b> : C000189
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={24}>
                      <b>Zone :</b> {props.zone}
                    </Col>
                    <Col span={24}>
                      <b>Zone_ID :</b> {props.zone_id}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <b>Booking Date :</b> {props.booking_date}
                </Col>
                <Col span={24}>
                  <b>Booking Time :</b> {props.booking_time}
                </Col>
                <Col span={24}>
                  <b>Participant Count :</b> {props.participant_count}
                </Col>
                <Col span={24}>
                  <b>Created at :</b> {props.created_at}
                </Col>
                <Col span={24}>
                  <b>Canceled at :</b> {props.canceled_at}
                </Col>
              </Row>
            </div>
          </Modal>
          <Button
            type="primary"
            ghost
            style={{ width: "130px", marginLeft: "20px" }}
          >
            <div
              style={{
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Return Money
            </div>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
