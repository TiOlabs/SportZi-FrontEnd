import { Col, Row } from "antd";
import { Grid } from "antd";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const PackageEnrollmentDetailsInPlayerProfile = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
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
  const showDeleteConfirm = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatePackageEnrollmentPlayerDetails/${props.player_id}/${props.package_id}`,
        {
          status: "canceled_By_Player",
        }
      );
      // Close modal
      setIsModalOpen(false);
      // Update zone booking details
      //   props.setZoneBookingDetails((prev: any) => {
      //     return prev.filter(
      //       (zoneBookingDetails: ZoneBookingDetails) =>
      //         zoneBookingDetails.zone_booking_id !== props.booking_id
      //     );
      //   });
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
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              {props.package_name}
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
          LKR {props.rate}
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
          {props.duration} months
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
              alignItems: "right",
            }}
            xs={24}
            sm={12}
            md={12}
            lg={6}
            xl={4}
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
            {props.duration} months
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
            xl={4}
          >
            LKR {props.rate}
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
            xl={4}
          >
            Status:{" "}
            {props.status}
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default PackageEnrollmentDetailsInPlayerProfile;
