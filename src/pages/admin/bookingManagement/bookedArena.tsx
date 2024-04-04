import { Col, Row, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { ZoneBookingDetails } from "../../../types";
import { Spin } from "antd";
const { confirm } = Modal;

const BookedArena = (props: any) => {
  const [zoneBookingDetails, setZoneBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDataa, setFilteredData] = useState<ZoneBookingDetails[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(`http://localhost:8000/api/getarcadebookings`);
        const data = await res.json();
        setZoneBookingDetails(data);
        const filteredData = zoneBookingDetails.filter(
          (zoneBookingDetails: ZoneBookingDetails) =>
            zoneBookingDetails.status === "success"
        );
        setFilteredData(filteredData);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [zoneBookingDetails]);

  console.log(props.arcadeBookings);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Booked Arena</h2>
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
        <Col
          style={{ marginTop: "20px", maxHeight: "80vh", overflowY: "auto" }}
        >
          {filteredDataa.map((ZoneBookingDetails: ZoneBookingDetails) => (
            <DataRow
              booking_id={ZoneBookingDetails.zone_booking_id}
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

              // arcadeBookings={props.arcadeBookings}
              // setArcadeBookings={props.setArcadeBookings}
              // key={arcadeBooking.id}
              // zone={arcadeBooking.zone}
              // booking_id={arcadeBooking.id}
              // booking_date={arcadeBooking.booking_date}
              // booking_time={arcadeBooking.booking_time}
              // participant_count={arcadeBooking.participant_count}
              // created_at={arcadeBooking.created_at}
              // cancel_by_arcade={arcadeBooking.cancel_by_arcade}
              // cancel_by_player={arcadeBooking.cancel_by_player}
              // cancel_by_admin={arcadeBooking.cancel_by_admin}
            />
          ))}
        </Col>
      </Spin>
    </Col>
  );
};
export default BookedArena;

function DataRow(props: any) {
  console.log(props);
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
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure cancel this task?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect to the user and the arcade.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        // try{
        //   const res = await axios.post(
        //     `http://localhost:8000/api/arcadebookingcancel/${props.booking_id}`,
        //     {
        //       id: props.booking_id,
        //     }
        //   )
        // }
        // catch(error){
        //   console.log(error);
        // }
        try {
          const response = await axios.put(
            `http://localhost:8000/api/updatearcadebooking/${props.booking_id}`,
            {
              zone_booking_id: props.booking_id,
              status: "canceled_By_Admin",
            }
          );
          if (response.status === 200) {
            console.log("success");
            props.setZoneBookingDetails((prev: any) => {
              return prev.filter(
                (zoneBookingDetails: ZoneBookingDetails) =>
                  zoneBookingDetails.zone_booking_id !== props.booking_id
              );
            });
          }
          // const res = await axios.delete(
          //   `http://localhost:8000/api/deletearcadebooking/${props.booking_id}`,
          //   {
          //     data: {
          //       id: props.id,
          //     },
          //   }
          // );

          // if (props.arcadeBookings.length > 0) {
          //   const data = props.arcadeBookings.filter(
          //     (arcadeBooking: any) => arcadeBooking.id !== props.booking_id
          //   );
          //   props.setArcadeBookings(data);

          // }
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Row
      style={{
        backgroundColor: "white",
        padding: "1%",
        marginTop: "50px",
      }}
    >
      <Col></Col>
      <Col span={7} style={{}}>
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
      <Col span={4} style={{}}>
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
          {props.zone}
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
      <Col span={7}>
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
      <Col span={4} style={{}}>
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
              </Row>
            </div>
          </Modal>
          <Button
            type="primary"
            ghost
            onClick={showDeleteConfirm}
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
              Cancel
            </div>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
