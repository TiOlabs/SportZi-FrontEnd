import { Col, Row } from "antd";
import profilePic from "../assents/pro.png";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import Typography from "antd/es/typography/Typography";

const CoachAccepteLst = () => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

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
    <>
      <Row
        onClick={showModal}
        style={{
          padding: "10px",
          width: "90%",
          height: "auto",
          display: "flex",
          justifyContent: "center",

          border: "1px solid #EFF4FA",
          alignItems: "center",
        }}
      >
        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
          <Row style={{ width: "100%" }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div
                style={{
                  backgroundColor: "#000",
                  width: "90px",
                  height: "81px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  backgroundImage: `url(${profilePic})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </Col>
            <Col
              style={{
                color: "#000",
                fontFamily: "kanit",
                fontWeight: "300",
                fontSize: "18px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              kanishka jj
            </Col>
          </Row>
        </Col>
        <Col
          style={{
            color: "#000",
            fontFamily: "kanit",
            fontWeight: "300",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={8}
          sm={8}
          md={8}
          lg={6}
          xl={6}
        >
          Date
        </Col>
        <Col
          style={{
            color: "#000",
            fontFamily: "kanit",
            fontWeight: "300",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={8}
          sm={8}
          md={8}
          lg={6}
          xl={6}
        >
          Time
        </Col>
        {lg && (
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Venue
          </Col>
        )}
      </Row>

      <Modal
        title="Are You Shure"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#0E458E",
              border: "1px solid #0E458E",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "18px",
            }}
            key="back"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#FF0000",
              border: "1px solid #FF0000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "18px",
            }}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Cancel Meeting
          </Button>,
        ]}
      >
        <Typography>
          if you are cancel Accepted meeting before 24 hours your ratings shoud
          be decrease by 1%. i you are agree then cancel
        </Typography>
      </Modal>
    </>
  );
};
export default CoachAccepteLst;
