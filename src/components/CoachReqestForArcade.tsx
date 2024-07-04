import { Col, Row, message } from "antd";
import profilePic from "../assents/pro.png";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const CoachReqestForArcade = (props: any) => {
  console.log("props", props);
  const { ArcadeId } = useParams();
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleAccept();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsRejectModalOpen(false);
  };
  const handlReject = () => {
    setIsModalOpen(false);
    setIsRejectModalOpen(true);
  };
  const handleAccept = () => {
    try {
      const fetchData = async () => {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}api/updatecoachAssignDetailsForArcade`,
          {
            coach_id: props.coach_id,
            coachId: props.coach_id,
            arcade_id: ArcadeId,
            status: "success",
            coach_name: props.coach_name,
            email: props.coach_Email,
            arcade_name: props.arcade_name,
            role: "ARCADE",
          }
        );
        console.log(res.data);
      };
      fetchData();
      message.success("Coach Assigned Successfully");
    } catch (e) {
      console.log(e);
    } finally {
      window.location.reload();
    }
  };

  const handleOkRehect = () => {
    setIsRejectModalOpen(false);
    try {
      const fetchData = async () => {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}api/updatecoachAssignDetailsForArcade`,
          {
            coach_id: props.coach_id,
            coachId: props.coach_id,
            arcade_id: ArcadeId,
            status: "canceled_By_Arcade",
            coach_name: props.coach_name,
            email: props.coach_Email,
            arcade_name: props.arcade_name,
          }
        );
        console.log(res.data);
      };
      fetchData();
      message.success("Coach Rejected Successfully");
    } catch (e) {
      console.log(e);
    }
  };
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/CoachUser/:${props.coach_id}`);
  };
  const dateTimeString = props.date;
  const dateObject = new Date(dateTimeString);

  // Extracting the date and time parts
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();
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
                onClick={handleClick}
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                cldImg={
                  cld.image(props.coach_image)
                  // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                  // .resize(Resize.scale().width(200).height(200))
                }
                // border-radius: 50%;
                // width: 80px;
                // height: 80px;
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
              {props.coach_name}
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
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
        >
          <div>
            <div>{date}</div>
            <div>{time}</div>
          </div>
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
          {props.sport}
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
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
        >
          <Button
            style={{
              backgroundColor: "#5587CC",
              color: "#fff",

              fontFamily: "kanit",
            }}
            key="submit"
            type="primary"
            onClick={showModal}
          >
            Accept
          </Button>
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
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <Button
               disabled={
                props.status === "canceled_By_Coach" ||
                props.status === "canceled_By_Arcade" ||
                props.status === "canceled_By_Player" ||
                props.status === "canceled_By_Admin"
              }
              style={{
                backgroundColor: "#fff",
                color: "#5587CC",
                border: "1px solid #5587CC",
                fontFamily: "kanit",
              }}
              key="submit"
              type="primary"
              onClick={showModal}
            >
              Reject
            </Button>
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
              backgroundColor: "#5587CC",
              color: "#fff",

              fontFamily: "kanit",
            }}
            key="submit"
            type="primary"
            // onClick={handleOk}
            onClick={handleOk}
          >
            Accept
          </Button>,
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#0E458E",
              border: "1px solid #0E458E",
              fontFamily: "kanit",
            }}
            key="back"
            onClick={handlReject}
          >
            Reject
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
                  onClick={handleClick}
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                  cldImg={
                    cld.image(props.coach_image)
                    // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                    // .resize(Resize.scale().width(200).height(200))
                  }
                  // border-radius: 50%;
                  // width: 80px;
                  // height: 80px;
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
                {props.coach_name}
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
            {props.sport}
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
            for {props.duration} years
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
            {props.description}
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Reject Coach"
        visible={isRejectModalOpen}
        onOk={handleOkRehect}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to reject this coach?</p>
      </Modal>
    </>
  );
};
export default CoachReqestForArcade;
