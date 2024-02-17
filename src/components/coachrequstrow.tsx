import { Col, Row, Typography } from "antd";
import { Button, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import profilePic from "../assents/pro.png";

const CoachRequstRow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancell = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Row
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
          {" "}
          <Button
            style={{
              borderRadius: "3px",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "18px",
              borderColor: "#5587CC",
              color: "#5587CC",
            }}
            onClick={showModal}
          >
            Cancel Booking
          </Button>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancell}>
            <p
              style={{
                color: "#FF0000",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "28px",
              }}
            >
              Warning
            </p>
            <Typography>
              {" "}
              Are you sure you want to cancel this meeting? Please note that
              cancellations made within 24 hours of the meeting may incur
              charges.
            </Typography>
          </Modal>
        </Col>
      </Row>
    </>
  );
};
export default CoachRequstRow;
