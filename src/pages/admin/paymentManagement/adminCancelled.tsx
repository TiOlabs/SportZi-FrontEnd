import { Col, Row, Button, Modal } from "antd";
import { useState } from "react";
import { ArcadeBookings } from "../../../types";
import axios from "axios";

const AdminCanceled = (props: any) => {
  console.log(props.adminCanceled);

  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);

    try {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8000/api/getarcadebookings"
        );
        const data = await res.data;

        // console.log(arcadeBookings.filter((arcadeBooking) => arcadeBooking.);

        const adminCanceled = data.filter(
          (arcadeBooking: ArcadeBookings) => arcadeBooking.cancel_by_admin
        );

        console.log(adminCanceled);

        props.setAdminCanceled(adminCanceled);
      };
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Cancelled By Coach & Arcade</h2>
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
      <Row style={{}}>
        <Col span={21}></Col>
        <Col span={2}>
          <Button
            type="primary"
            onClick={handleRefresh}
            loading={loading}
            style={{
              backgroundColor: "#0E458E",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "5px",
            }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <Col style={{ marginTop: "20px", maxHeight: "75vh", overflowY: "auto" }}>
        {props.adminCanceled.map((adminCanceled: ArcadeBookings) => (
          <DataRow
            adminCanceled={props.adminCanceled}
            setAdminCanceled={props.setAdminCanceled}
            key={adminCanceled.id}
            zone={adminCanceled.zone}
            id={adminCanceled.id}
            booking_date={adminCanceled.booking_date}
            booking_time={adminCanceled.booking_time}
            participant_count={adminCanceled.participant_count}
            created_at={adminCanceled.created_at}
            cancel_by_arcade={adminCanceled.cancel_by_arcade}
            cancel_by_player={adminCanceled.cancel_by_player}
            cancel_by_admin={adminCanceled.cancel_by_admin}
          />
        ))}
      </Col>
    </Col>
  );
};

export default AdminCanceled;

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
          Super Box Complex
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
          Sasindu Daluwatta
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
                  <b>Booking ID :</b> {props.id}
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
