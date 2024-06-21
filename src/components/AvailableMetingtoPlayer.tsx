import { Col, Form, Row, message } from "antd";
import profilePic from "../assents/pro.png";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { ZoneBookingDetails } from "../types";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import TextArea from "antd/es/input/TextArea";

const AvailableMetingstoPlayer = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResonModalOpen, setIsResonModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsResonModalOpen(false);
  };

  const shoeResonModal = () => {
    setIsResonModalOpen(true);
  };
  const handleOkForResonModal = () => {
    setIsResonModalOpen(false);
  };
  const handleCancelForResonModal = () => {
    setIsResonModalOpen(false);
  };

  const showDeleteConfirm = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addbookingcancelarcade`,
        {
          booking_id: props.booking_id,
          reason: reason,
        }
      );
      // Close modal
      setIsResonModalOpen(false);

      // Update zone booking details
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatearcadebooking/${props.booking_id}`,
        {
          zone_booking_id: props.booking_id,
          status: "canceled_By_Player",
          email: props.email,
          role: props.role,
          zone_name: props.zone_name,
          player_name: props.player_name,
          booking_date: props.booking_date,
          booking_time: props.booking_time,
          arcade_name: props.venue,
          reason: reason,
          user_id: props.user_id,
          arcade_id: props.arcade_id,
        }
      );
      message.success(
        "Booking cancelation successfull!"
      );
      // Close modal
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);

      // Update zone booking details
      props.setZoneBookingDetails((prev: any) => {
        return prev.filter(
          (zoneBookingDetails: ZoneBookingDetails) =>
            zoneBookingDetails.zone_booking_id !== props.booking_id
        );
      });
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
                cldImg={
                  cld.image(props?.zone_image)
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
              {props.zone_name}
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
          {props.booking_date}
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
          {props.booking_time}
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
            {props.venue}
          </Col>
        )}
      </Row>

      <Modal
        width={1000}
        title="Basic Modal"
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
            // onClick={showDeleteConfirm}
            onClick={shoeResonModal}
            key="submit"
            type="primary"
          >
            Cancel Meeting
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
                    cld.image(props?.zone_image)
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
                {props.zone_name}
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
            lg={6}
            xl={6}
          >
            {props.booking_date}
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
            {props.booking_time}
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
            lg={6}
            xl={6}
          >
            Zone: {props.venue}
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
            lg={6}
            xl={6}
          >
            Status: {props.status}
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
            lg={6}
            xl={6}
          >
            Rate: LKR {props.full_amount}
          </Col>
        </Row>
      </Modal>
      <Modal
        width={1000}
        title="Basic Modal"
        // open={isModalOpen}
        open={isResonModalOpen}
        onOk={handleOkForResonModal}
        okText="Cancel Meeting"
        onCancel={handleCancelForResonModal}
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
            // onClick={showDeleteConfirm}
            onClick={showDeleteConfirm}
            key="submit"
            type="primary"
          >
            Cancel Meeting
          </Button>,
        ]}
      >
        <Form layout="vertical" onFinish={showDeleteConfirm}>
          <Form.Item>
            <h3>Are you sure you want to cancel this meeting?</h3>
          </Form.Item>

          <Form.Item
            name="reason"
            label="Please enter the reason for cancellation"
            rules={[
              {
                type: "string",
                message: "Please enter a valid Description!",
              },
              {
                required: true,
                message: "Please input your Descrition!",
              },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Add a Short Description about Applying for Coaching"
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AvailableMetingstoPlayer;
