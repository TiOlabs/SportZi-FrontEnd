import { Button, Col, Grid, Modal, Row, Typography } from "antd";
import { useState } from "react";
import profilePic from "../assents/pro.png";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { CoachAssignDetails } from "../types";

const CoachReqestList = (props: any) => {
  console.log(props);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false);
  const [isModalOpenAccept, setIsModalOpenAccept] = useState(false);
  const [coachAssignArcadeValues, setCoachAssignArcadeValues] = useState<
    CoachAssignDetails[]
  >([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalWarning = () => {
    setIsModalOpenWarning(true);
  };

  const handleOkWarning = () => {
    setIsModalOpenWarning(false);
    setIsModalOpen(false);
  };

  const handleCancelWarning = async () => {
    console.log(props.coach_id, props.arcade_id);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatecoachAssignDetailsForArcade`,
        {
          coach_id: props.coach_id,
          arcade_id: props.arcade_id,
          status: "canceled_By_Coach",
          arcade_email: props.arcade_email,
          role: props.role,
          arcade_name: props.arcade,
          coach_name: props.coach_name,
          
        }
      );
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getcoachassignvaluesById/${props.coach_id}`
      );

      // Filter data with status "success"
      const successData = res.data.filter(
        (item: { status: string }) => item.status === "success"
      );

      // Set filtered data to setCoachAssignArcadeValues
      setCoachAssignArcadeValues(successData);

      console.log("successData", successData);
      // Check if coachAssignArcadeValues is empty
      if (successData.length === 0) {
        // If empty, update status to "pending"
        await axios.put(
          `${process.env.REACT_APP_API_URL}api/updateCoach/${props.coach_id}`,
          {
            status: "pending",
          }
        );
      }
    } catch (e) {
      console.log(e);
    }

    setIsModalOpenWarning(false);
    setIsModalOpen(false);
  };

  const showModalAccept = () => {
    setIsModalOpenAccept(true);
  };

  const handleOkAccept = () => {
    setIsModalOpenAccept(false);
  };

  const handleCancelAccept = () => {
    setIsModalOpenAccept(false);
    setIsModalOpen(false);
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
        <Col xs={8} sm={8} md={8} lg={6} xl={6} onClick={showModal}>
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
              {props.arcade}
            </Col>
          </Row>
        </Col>
        <Col
          onClick={showModal}
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
            <Button
              style={{
                borderColor: "#5587CC",
                borderRadius: "3px",
                fontFamily: "kanit",
                color: "#5587CC",
              }}
              onClick={showModalWarning}
            >
              Reject Meeting
            </Button>
          </Col>
        )}
        {sm && (
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
                backgroundColor: "#5587CC",
                borderRadius: "3px",
                fontFamily: "kanit",
              }}
              type="primary"
              onClick={showModalAccept}
            >
              Keep Meeting
            </Button>
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
            }}
            key="back"
            onClick={showModalWarning}
          >
            Deny Meeting
          </Button>,
          <Button
            style={{
              backgroundColor: "#0E458E",

              fontFamily: "kanit",
            }}
            key="submit"
            type="primary"
            onClick={showModalAccept}
          >
            Accept Meeting
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
               {props.arcade}
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
            Time
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
            Venue
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Warning"
        open={isModalOpenWarning}
        onOk={handleOkWarning}
        onCancel={handleCancelWarning}
        footer={[
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#0E458E",
              border: "1px solid #0E458E",
              fontFamily: "kanit",
            }}
            key="back"
            onClick={handleCancelWarning}
          >
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: "#0E458E",

              fontFamily: "kanit",
            }}
            key="submit"
            type="primary"
            onClick={handleCancelWarning}
          >
            Reject Meeting
          </Button>,
        ]}
      >
        <Typography>
          Are you shure reject the meeting in this student
        </Typography>
      </Modal>

      <Modal
        title="Accept Meeting"
        open={isModalOpenAccept}
        onOk={handleOkAccept}
        onCancel={handleCancelAccept}
        footer={[
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#0E458E",
              border: "1px solid #0E458E",
              fontFamily: "kanit",
            }}
            key="back"
            onClick={handleCancelAccept}
          >
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: "#0E458E",

              fontFamily: "kanit",
            }}
            key="submit"
            type="primary"
            onClick={handleCancelAccept}
          >
            Accept Meeting
          </Button>,
        ]}
      >
        <Typography>Are you shure accept meeting</Typography>
      </Modal>
    </>
  );
};
export default CoachReqestList;
