import { Col, Row } from "antd";
import profilePic from "../assents/pro.png";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
const AvailableCoachBookingsArcade = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };
  const showDeleteConfirm = async () => {
    setIsConfirmModalOpen(true);
    setIsModalOpen(false);
    // try {
    // const response = await axios.put(
    // `http://localhost:8000/api/updatearcadebooking/${props.booking_id}`,
    // {
    // zone_booking_id: props.booking_id,
    // status: "canceled_By_Player",
    // }
    // );
    // // Close modal
    // setIsConfirmModalOpen(false);
    // // Update zone booking details
    // } catch (error) {
    // console.log("error");
    // console.log(error);
    // }
  };
  const showDelete = async () => {
    let created_at, user_id;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getArcadeBookingsByBookingId/${props.booking_id}`
      );
      created_at = res.data.created_at;
      user_id = res.data.user_id;
      console.log(created_at);
      console.log(user_id);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updateCoachBookingByCreatedTime/${created_at}/${user_id}`,
        {
          status: "canceled_By_Arcade",
        }
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/updatearcadebooking/${props.booking_id}`,
        {
          zone_booking_id: props.booking_id,
          status: "canceled_By_Arcade",
          // email: props.email,
          // arcade_name: props.arcade_name,
          // booked_by: props.booked_by,
        }
      );
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
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
          borderStyle: "dotted",
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
                  backgroundImage: `url(${profilePic})`,
                  backgroundSize: "cover",
                }}
                cldImg={
                  cld.image(props?.user_image)
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
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              {props.booked_by}
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
          {props.date}
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
          {props.time}
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
            {props.zoneName}
          </Col>
        )}
      </Row>
      <Modal
        width={1000}
        title="Booking Details"
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
            }}
            key="back"
            onClick={showDeleteConfirm}
          >
            Cancel Meeting
          </Button>,
          <Button
            style={{
              backgroundColor: "#5587CC",
              color: "#fff",
              fontFamily: "kanit",
            }}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            OK
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
                    backgroundImage: `url(${profilePic})`,
                    backgroundSize: "cover",
                  }}
                  cldImg={
                    cld.image(props?.user_image)
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
                {props.booked_by}
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
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={8}
          >
            {props.date}
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
            lg={8}
            xl={8}
          >
            {props.time}
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
            lg={8}
            xl={8}
          >
            {props.zoneName}
          </Col>
        </Row>
      </Modal>
      <Modal
        width={1000}
        title="Conformation!"
        open={isConfirmModalOpen}
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
            No, Keep Meeting
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
            onClick={showDelete}
            key="submit"
            type="primary"
          >
            Yes,Cancel
          </Button>,
        ]}
      >
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          This may Highly effected to you! are you sure you want to cancel the
          booking?{" "}
        </div>{" "}
      </Modal>
    </>
  );
};
export default AvailableCoachBookingsArcade;
