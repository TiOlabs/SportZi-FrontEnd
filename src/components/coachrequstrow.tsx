import { Col, Row, Typography } from "antd";
import { Button, Flex } from "antd";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import profilePic from "../assents/pro.png";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { CoachBookingDetails, ZoneBookingDetails } from "../types";
import { AdvancedImage } from "@cloudinary/react";
import confirm from "antd/es/modal/confirm";

const CoachRequstRow = (props: any) => {
  console.log(props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const[zoneBookingDetalsByCreateTime,setZoneBookingDetailsByCreateTime]=useState<ZoneBookingDetails[]>([])
  console.log(props.created_at)
  console.log(props.user_id)
let id;
  useEffect(()=>{
    
    try {
      const fetchData = async () => {
        const res = await fetch(
          `http://localhost:8000/api/getarcadebookingbyCreatedTime/${props.created_at}/${props.user_id}`
        );

        const data = await res.json();
        console.log(data);
        console.log(data[0]?.zone_booking_id)
        id=data[0]?.zone_booking_id;
        setZoneBookingDetailsByCreateTime(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  
   
  }
  ,[props])

 console.log(id)
 console.log(zoneBookingDetalsByCreateTime[0]?.zone_booking_id)

 


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure cancel this task?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect to the user and the arcade.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      async onOk() {
        try {
          const response = await axios.put(
            `http://localhost:8000/api/updatecoachBooking/${props.booking_id}`,
            {
              booking_id: props.booking_id,
              status: "canceled_By_player",
            }
          );
          const res = await axios.put(
            `http://localhost:8000/api/updatearcadebooking/${zoneBookingDetalsByCreateTime[0]?.zone_booking_id}`,
            {
              zone_booking_id:zoneBookingDetalsByCreateTime[0]?.zone_booking_id ,
              status: "canceled_By_player",
            }
          );

          props.setZoneBookingDetails((prev: any) => {
            return prev.filter(
              (coachBookingDetails: CoachBookingDetails) =>
                coachBookingDetails.booking_id !== props.booking_id
            );
          });
          setIsModalOpen(false);
        } catch (error) {
          console.log("error");
          console.log(error);
        }
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
                  cld.image(props?.coach_image)
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
            onClick={showDeleteConfirm}
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
            {props.venue}
          </Col>
        </Row>
      </Modal>
      <Modal></Modal>
    </>
  );
};
export default CoachRequstRow;
// Are you sure you want to cancel this meeting? Please note that
// cancellations made within 24 hours of the meeting may incur
// charges.