import { Col, Form, Row } from "antd";
import profilePic from "../assents/pro.png";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import Typography from "antd/es/typography/Typography";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import TextArea from "antd/es/input/TextArea";

const CoachAccepteLst = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false);
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

  const showModalWarning = () => {
    setIsModalOpenWarning(true);
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
  const handleOkWarning = async () => {
    let created_at, user_id;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getCoachBookinByBookingId/${props.booking_id}`
      );
      created_at = res.data.created_at;
      user_id = res.data.player_id;
      console.log(created_at);
      console.log(user_id);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updateArcadeBookingByCreatedTime/${created_at}/${user_id}`,
        {
          status: "canceled_By_Coach",
        }
      );
    } catch (e) {
      console.log(e);
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatecoachBooking/${props.booking_id}`,
        {
          status: "canceled_By_Coach",
          email: props.email,
          arcade_email: props.arcade_email,
          role: props.role,
          coach_name: props.coach_name,
          player_name: props.booked_by,
          booking_date: props.date,
          booking_time: props.time,
          arcade_name: props.arcade_name,
          reason: reason,
        }
      );
    } catch (e) {
      console.log(e);
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

    setIsModalOpen(false);
    setIsModalOpenWarning(false);

    // Close the first modal as well
  };

  const handleCancelWarning = () => {
    setIsModalOpenWarning(false);
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
                  backgroundImage: `url(${profilePic})`,
                  backgroundSize: "cover",
                }}
                cldImg={
                  cld.image(props?.image)
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
                fontSize: md ? "18px" : "16px",
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
            fontSize: md ? "18px" : "16px",
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
            fontSize: md ? "18px" : "16px",
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
              fontSize: md ? "18px" : "16px",
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
        title="Discription of Meeting"
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
            onClick={shoeResonModal}
          >
            Cancel Meeting
          </Button>,
        ]}
      >
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
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
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
                    cld.image(props?.image)
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
                  fontSize: md ? "18px" : "16px",
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
              fontSize: md ? "18px" : "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            {props.date}
          </Col>
        </Row>

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
          <Col
            style={{
              marginTop: "10px",
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: md ? "18px" : "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            {props.time}
          </Col>

          <Col
            style={{
              marginTop: "10px",
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: md ? "18px" : "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            Zone: {props.venue}
          </Col>
          <Col
            style={{
              marginTop: "10px",
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: md ? "18px" : "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            Status: {props.status}
          </Col>
          <Col
            style={{
              marginTop: "10px",
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: md ? "18px" : "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            Rate: LKR {props.full_amount}
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Are you Sure?"
        open={isModalOpenWarning}
        onOk={shoeResonModal}
        onCancel={handleCancelWarning}
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
            onClick={handleCancelWarning}
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
            onClick={handleOkWarning}
          >
            Cancel Meeting
          </Button>,
        ]}
      >
        <Typography>
          If you are cancel meeting after 24h for meetying. your rating is
          decreese and you payment is return
        </Typography>
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
            onClick={handleOkWarning}
            key="submit"
            type="primary"
          >
            Cancel Meeting
          </Button>,
        ]}
      >
        <Form layout="vertical" onFinish={handleOkWarning}>
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
export default CoachAccepteLst;
