import { Col, Row, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import axiosInstance from "../../../axiosInstance"

interface Player {
  player_id: string;
  user: {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    DOB: string;
    gender: string;
    accountNumber: string | null;
    is_active: string;
    user_image: string | null;
    address:String | null;
    city : String | null;
    country : String | null;
  };
}

const PlayerManagement = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {

    // Fetch player data from the backend when the component mounts
    const fetchPlayers = async () => {
      try {
        const response = await axiosInstance.get("/api/getplayer");
        setPlayers(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>

      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Players details</h2>
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

      {players.map((playerdetails: Player) => (
        <DataRow
          // key={playerdetails.player_id} // Add key prop
          playerdetails={playerdetails} // Pass playerdetails as prop
        />
      ))}
    </Col>
  );
};

export default PlayerManagement;





function DataRow(props:any) {

 const { playerdetails } = props;
  // console.log(playerdetails);
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

  return (
    <Row
      key={playerdetails.player_id}
      style={{
        backgroundColor: "white",
        padding: "1%",
        marginTop: "20px",
      }}
    >
      <Col></Col>
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
            justifyContent: "left",
            marginLeft: "100px",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {playerdetails.user.firstname} {playerdetails.user.lastname} 
          {/* Mr.Ruchith Nusara */}
        </div>
      </Col>

      <Col span={8}></Col>
      <Col span={8} style={{}}>
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
            style={{ width: "100px", backgroundColor: "#0E458E" }}
            onClick={showModal}
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
                  Player Details
                </div>
                <Col span={24}>
                  <b>Player ID : </b> {playerdetails.player_id}
                </Col>
                <Col span={24}>
                      <b>First Name :</b> {playerdetails.user.firstname}
                </Col>
                <Col span={24}>
                      <b>Last Name : </b> {playerdetails.user.lastname}
                </Col>
                <Col span={24}>
                      <b>Email :</b> {playerdetails.user.email}
                </Col>
                <Col span={24}>
                      <b>Account Number :</b>  {playerdetails.user.accountNumber || "N/A"}
                </Col>           

                <Col span={24}>
                  <b>DOB :</b> {playerdetails.user.DOB}
                </Col>
                <Col span={24}>
                  <b>Gender :</b> {playerdetails.user.gender}
                </Col>
                <Col span={24}>
                  <b>City :</b> {playerdetails.user.city || "N/A"}
                </Col>
                <Col span={24}>
                  <b>Country :</b> {playerdetails.user.country || "N/A"}
                </Col>
              </Row>
            </div>
          </Modal>

          <Button
            type="primary"
            ghost
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
    </Row>
  );
}
