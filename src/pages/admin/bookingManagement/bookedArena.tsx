import { Col, Row, Button, Modal } from "antd";
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { ArcadeBookings } from "../../../types";
const { confirm } = Modal;

const BookedArena = (props: any) => {
  console.log(props.arcadeBookings);
  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
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
      <Col style={{ marginTop: "20px", maxHeight: "80vh", overflowY: "auto" }}>
        {props.arcadeBookings.map((arcadeBooking: ArcadeBookings) => (
          <DataRow
            arcadeBookings={props.arcadeBookings}
            setArcadeBookings={props.setArcadeBookings}
            key={arcadeBooking.id}
            zone={arcadeBooking.zone}
            booking_id={arcadeBooking.id}
            booking_date={arcadeBooking.booking_date}
            booking_time={arcadeBooking.booking_time}
            participant_count={arcadeBooking.participant_count}
            created_at={arcadeBooking.created_at}
            cancel_by_arcade={arcadeBooking.cancel_by_arcade}
            cancel_by_player={arcadeBooking.cancel_by_player}
            cancel_by_admin={arcadeBooking.cancel_by_admin}
          />
        ))}
      </Col>
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
              id: props.booking_id,
              cancel_by_admin: true,
            }
          );
          // const res = await axios.delete(
          //   `http://localhost:8000/api/deletearcadebooking/${props.booking_id}`,
          //   {
          //     data: {
          //       id: props.id,
          //     },
          //   }
          // );
          console.log(props.arcadeBookings);

          // if (props.arcadeBookings.length > 0) {
          //   const data = props.arcadeBookings.filter(
          //     (arcadeBooking: any) => arcadeBooking.id !== props.booking_id
          //   );
          //   props.setArcadeBookings(data);

          // }
          props.setArcadeBookings((prev: any) => {
            return prev.filter(
              (arcadeBooking: ArcadeBookings) =>
                arcadeBooking.id !== props.booking_id
            );
          });
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
          Super Box Complex
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
          100$
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
          Sasindu Daluwatta
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
                      <b>Booked By : </b> Sasindu Daluwatta
                    </Col>
                    <Col span={8}>
                      <b>User_ID : </b> A005124
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
                    <Col span={16}>
                      <b>Zone :</b> {props.zone}
                    </Col>
                    <Col span={8}>
                      <b>Zone_ID :</b> Z072149
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
