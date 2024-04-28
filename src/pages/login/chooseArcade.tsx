import { Col, Row } from "antd";
import React, { useEffect } from "react";
import ArcadeCardForMannager from "../../components/ArcadeCardForMannager";
import axiosInstance from "../../axiosInstance";

const ChooseArcade = () => {
  useEffect(() => {
    console.log("useeffect");
    axiosInstance
      .get("/api/auth/getchoosenArcade/")
      .then((res) => {
        console.log("kanishka", res.data);
      })
      .catch((err) => {
        console.log("errorrrrrrrrrr", err);
      });
  }, []);

  return (
    <>
      <style>
        overflowY: "hidden", @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
      </style>
      <Row style={{ width: "100%", height: "100vh" }}>
        <Col xs={8}></Col>
        <Col
          xs={8}
          style={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              fontWeight: "500",
              color: "#000",
              fontFamily: "kanit",
              marginBottom: "20px",
            }}
          >
            Choose your Arcade
          </p>
          <ArcadeCardForMannager name="ssc Ground" />
          <ArcadeCardForMannager name="colombo city" />
          <ArcadeCardForMannager name="magestic city" />
        </Col>
        <Col xs={8}></Col>
      </Row>
    </>
  );
};
export default ChooseArcade;
