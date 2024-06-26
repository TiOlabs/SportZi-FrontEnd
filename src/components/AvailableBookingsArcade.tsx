import { Col, Form, Row, message } from "antd";
import profilePic from "../assents/pro.png";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import TextArea from "antd/es/input/TextArea";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const AvailableBookingsArcade = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isResonModalOpen, setIsResonModalOpen] = useState(false);
  const [reason, setReason] = useState("");
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
    //   const response = await axios.put(
    //     `http://localhost:8000/api/updatearcadebooking/${props.booking_id}`,
    //     {
    //       zone_booking_id: props.booking_id,
    //       status: "canceled_By_Player",
    //     }
    //   );

    //   // Close modal
    //   setIsConfirmModalOpen(false);

    //   // Update zone booking details

    // } catch (error) {
    //   console.log("error");
    //   console.log(error);
    // }
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
  const showDelete = async () => {
    confirm({
      title: "Are you sure cancel this task?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect to the user and the arcade.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}api/updatearcadebooking/${props.booking_id}`,
            {
              zone_booking_id: props.booking_id,
              status: "canceled_By_Arcade",
              email: props.email,
              arcade_name: props.arcade_name,
              player_name: props.booked_by,
              role: "ARCADE",
              booking_date: props.date,
              booking_time: props.time,
              zone_name: props.zoneName,
              user_id: props.user_id,
              arcade_id: props.arcade_id,
              reason: reason,
            }
          );

          setIsConfirmModalOpen(false);
          message.success("Booking cancelation successfull!");
          // Close modal
          setIsModalOpen(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } catch (error) {
          console.log("error");
          console.log(error);
        }
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
        message.success("Booking cancelation successfull!");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
            zone: {props.zoneName}
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
            status: {props.status}
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
            Rate: LKR {props.full_amount}
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
            onClick={shoeResonModal}
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
            onClick={showDelete}
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
export default AvailableBookingsArcade;
