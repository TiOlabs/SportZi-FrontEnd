/* eslint-disable react-hooks/rules-of-hooks */
import { Col, Row } from "antd";
import { Grid } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const arcadePackageCoachEnrollAccept = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleClose = async () => {
    setIsModalOpen(false);
  };
  console.log(props);
  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatePackageEnrollmentCoachDetails/${props.coach_id}/${props.package_id}`,
        {
          status: "success",
        }
      );

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const showDeleteConfirm = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatePackageEnrollmentCoachDetails/${props.coach_id}/${props.package_id}`,
        {
          status: "rejected",
        }
      );

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const showEnrollConfirm = async () => {
    setIsModalOpen(true);
  };
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
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
              <AdvancedImage
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  backgroundSize: "cover",
                }}
                cldImg={cld.image(props.coach_image)}
              />
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
              Coach:- {props.coach_name}
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
          Package Name:- {props.package_name}
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
          For Enroll:- {props.duration} months
        </Col>
        {lg && props.status === "pending" ? (
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
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#FF0000",
                border: "1px solid #FF0000",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "18px",
              }}
              onClick={showEnrollConfirm}
            >
              Enrollment Update
            </Button>
          </Col>
        ) : null}
        {lg && props.status === "success" ? (
          <Col
            style={{
              color: "green",
              fontFamily: "kanit",
              fontWeight: "500",
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
            Coach Enrolled Successfully
          </Col>
        ) : null}
        {lg && props.status === "rejected" ? (
          <Col
            style={{
              color: "red",
              fontFamily: "kanit",
              fontWeight: "500",
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
            Coach Rejected Successfully
          </Col>
        ) : null}
      </Row>
      {props.status === "pending" ? (
        <Modal
          width={1000}
          title="Enroll Details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleClose}
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
              onClick={handleAccept}
            >
              Accept Request
            </Button>,
            <Button
              disabled={
                props.status === "canceled_By_Coach" ||
                props.status === "canceled_By_Arcade" ||
                props.status === "canceled_By_Player" ||
                props.status === "canceled_By_Admin"
              }
              style={{
                backgroundColor: "#fff",
                color: "#FF0000",
                border: "1px solid #FF0000",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "18px",
              }}
              onClick={showDeleteConfirm}
              key="submit"
              type="primary"
            >
              Reject Request
            </Button>,
          ]}
        >
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
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Row style={{ width: "100%" }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <AdvancedImage
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      backgroundSize: "cover",
                    }}
                    cldImg={
                      cld.image(props?.package_image)
                      // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                      // .resize(Resize.scale().width(200).height(200))
                    }
                  />
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
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  package:- {props.package_name}
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
                alignItems: "right",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              {props.enroll_date}
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
              xs={24}
              sm={12}
              md={12}
              lg={4}
              xl={4}
            >
              For:- {props.duration} months
            </Col>

            <Col
              style={{
                color: "red",
                fontFamily: "kanit",
                fontWeight: "300",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              {props.rate}
            </Col>
          </Row>
        </Modal>
      ) : null}
    </>
  );
};
export default arcadePackageCoachEnrollAccept;
