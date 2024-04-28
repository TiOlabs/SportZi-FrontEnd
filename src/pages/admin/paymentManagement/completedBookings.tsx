import { Col, Row, Button, Empty, Modal } from "antd";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { ZoneBookingDetails } from "../../../types";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
const CompletedBookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [completedBookings, setCompletedBookings] = useState<
    ZoneBookingDetails[]
  >([]);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        if (value === 2) {
          // Fetch only when the value is 2 (Arcade Bookings)
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}api/getCompleteArcadeBookings`
          );
          const data = await res.json();
          console.log(data);
          setCompletedBookings(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompletedBookings();
  }, [value]); // Add value to the dependency array to re-fetch when value changes

  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  console.log("ggggg", completedBookings);
  const showDeleteConfirm = async (zoneBookingId: string) => {
    Modal.confirm({
      title: "Are you sure delete this booking?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        console.log("OK");
        console.log(zoneBookingId);
        try {
          const res = await axios.delete(
            `${process.env.REACT_APP_API_URL}api/deletearcadebooking/${zoneBookingId}`
          );
          console.log(res);
          // Fetch the updated list of completed bookings after deletion
          const updatedBookings = completedBookings.filter(
            (booking) => booking.zone_booking_id !== zoneBookingId
          );
          setCompletedBookings(updatedBookings);
        } catch (err) {
          console.log(err);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Completed bookings</h2>
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
            <Radio value={1}>Coach Bookings</Radio>
            <Radio value={2}>Arcade Bookings</Radio>
            <Radio value={3}>Enrolled Package</Radio>
            <Radio value={4}>All</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: "white",
          padding: "1%",
          marginTop: "20px",
        }}
      >
        {" "}
        {completedBookings.length === 0 ? (
          <Row
            style={{
              backgroundColor: "white",
              padding: "1%",
              marginTop: "20px",
              marginLeft: "40%",
            }}
          >
            <Empty />
          </Row>
        ) : (
          completedBookings.map((booking, index) => (
            <>
              <Col></Col>
              <Col span={8} style={{}}>
                <div
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    width: "70px",
                    height: "70px",
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
                  {booking.zone.zone_name}
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
                  Rs.{" "}
                  {String(
                    Number(booking.participant_count) *
                      Number(booking.zone.rate)
                  )}
                </div>
              </Col>
              <Col span={8}>
                <Link to={`/profile/`}>
                  <AdvancedImage
                    style={{
                      borderRadius: "50%",
                      position: "absolute",
                      width: "70px",
                      height: "70px",
                    }}
                    cldImg={
                      cld.image(String(booking.user.user_image))
                      // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                      // .resize(Resize.scale().width(200).height(200))
                    }
                  />
                </Link>
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
                  {booking.user.firstname} {booking.user.lastname}
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
                  <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div style={{ lineHeight: 3.0, fontSize: "160px" }}>
                      <Row>
                        <div style={{ fontSize: "28px", color: "#0E458E" }}>
                          Booking Details
                        </div>
                        <Col span={24}>
                          <b>Booking ID :</b> {booking.zone_booking_id}
                        </Col>
                        <Col span={24}>
                          <Row>
                            <Col span={16}>
                              <b>Booked By : </b> {booking.user.firstname}{" "}
                              {booking.user.lastname}
                            </Col>
                            <Col span={8}>
                              <b>User ID : </b> {booking.user.user_id}
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24}>
                          <Row>
                            <Col span={16}>
                              <b>Arcade :</b> {booking.zone.arcade.arcade_name}
                            </Col>
                            <Col span={8}>
                              <b>Arcade ID</b> : {booking.zone.arcade.arcade_id}
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24}>
                          <Row>
                            <Col span={24}>
                              <b>Zone :</b> {booking.zone.zone_name}
                            </Col>
                            <Col span={24}>
                              <b>Zone_ID :</b> {booking.zone.zone_id}
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24}>
                          <b>Booking Date :</b> {booking.date}
                        </Col>
                        <Col span={24}>
                          <b>Booking Time :</b> {booking.time}
                        </Col>
                        <Col span={24}>
                          <b>Participant Count :</b>{" "}
                          {Number(booking.participant_count)}
                        </Col>
                        <Col span={24}>
                          <b>Created at :</b> {booking.created_at}
                        </Col>
                      </Row>
                    </div>
                  </Modal>
                  <Button
                    type="primary"
                    ghost
                    onClick={() =>
                      showDeleteConfirm(String(booking.zone_booking_id))
                    }
                    style={{ width: "100px", marginLeft: "20px" }}
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
                      Delete
                    </div>
                  </Button>
                </div>
              </Col>
            </>
          ))
        )}
      </Row>
    </Col>
  );
};

export default CompletedBookings;
