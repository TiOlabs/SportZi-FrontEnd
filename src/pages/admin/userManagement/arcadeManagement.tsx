import { Col, Row, Button } from "antd";
import React, { useState, useEffect,Key } from "react";
import axios from "axios";

interface Arcade {
  arcade_id: String;
  arcade_name: String;
  location: String;
  address: String;
  arcade_email: String;
  manager_id: String;
  open_time: String;
  close_time: String;
  manager:{
    manager_id:String,
    user: {
      user_id: string;
      role: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      DOB: string;
      gender: string;
      accountNumber: string | null;
      is_active: string;
      user_image: string | null;
    };
    
  }
};

const ArcadeManagement = () => {
  const [arcades, setArcades] = useState<Arcade[]>([]);

  useEffect(() => {
    const fetchArcades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getarcadeDetails"
        );
        setArcades(response.data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchArcades();
  }, []);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Arcade details</h2>
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

      {arcades.map((arcade) => (
        <Row
          key={arcade.arcade_id as Key}

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
                alignItems: "center",
                marginLeft: "100px",
                textAlign: "center",
                height: "80px",
                fontSize: "16px",
              }}
            >
              {arcade.arcade_name}
              {/* Blue Feather */}
            </div>
          </Col>

          <Col span={8}>
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
              {" "}
              {arcade.arcade_email}
              {/* bluefeather@gmail.com */}
            </div>
          </Col>
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

export default ArcadeManagement;
