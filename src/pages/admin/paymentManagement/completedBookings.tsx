import { Col, Row, Button } from "antd";
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
const CompletedBookings = () => {
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
      console.log("radio checked", e.target.value);
      setValue(e.target.value);
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
      <Row style={{marginTop:"20px"}}>
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
              style={{ width: "100px", backgroundColor: "#0E4" }}
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
    </Col>
  );
};

export default CompletedBookings;
