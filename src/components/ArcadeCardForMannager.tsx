import React from "react";
import { Row, Col } from "antd";
const ArcadeCardForMannager = () => {
  return (
    <>
      <Row
        style={{
          width: "80%",
          height: "60px",
          border: "1px solid black",
          borderRadius: "3px",
        }}
      >
        <Col
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ borderRadius: "50%" }}></div>
        </Col>
        <Col
          xs={18}
          style={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <h1>SSC cricket</h1>
        </Col>
      </Row>
    </>
  );
};
export default ArcadeCardForMannager;
