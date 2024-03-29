import { Col, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";


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
  };
}


const PlayerManagement = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Fetch player data from the backend when the component mounts
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getplayer");
        setPlayers(response.data);
        console.log(response.data);
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

      {players.map((player) => (
        <Row
          key={player.player_id}
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
                justifyContent:"left",
                marginLeft:"100px",
                alignItems: "center",
                textAlign: "center",
                height: "80px",
                fontSize: "16px",
              }}
            >
              {player.user.firstname} {player.user.lastname} 
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
      ))}
    </Col>
  );
};

export default PlayerManagement;
