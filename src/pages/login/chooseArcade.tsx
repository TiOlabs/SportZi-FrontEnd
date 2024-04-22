import { Col, Row } from "antd";
import React from "react";
import ArcadeCardForMannager from "../../components/ArcadeCardForMannager";

const ChooseArcade = () => {
  return (
    <>
      <Row style={{ width: "100%", height: "100vh" }}>
        <Col xs={8} style={{ backgroundColor: "#000" }}></Col>
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
          <ArcadeCardForMannager />
        </Col>
        <Col xs={8} style={{ backgroundColor: "#000" }}></Col>
      </Row>
    </>
  );
};
export default ChooseArcade;
