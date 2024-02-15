import { Button, Col, Grid, Modal, Row, Typography } from "antd";
import { useState } from "react";
import profilePic from "../assents/pro.png";

const CoachReqestList = () => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWarning, setIsModalOpenWarning] = useState(false);
  const [isModalOpenAccept, setIsModalOpenAccept] = useState(false);

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
    // Close the first modal as well
  };

  const handleCancelWarning = () => {
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
              kanishka jj
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
          Date
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
              Accept Meeting
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
            Reject Meeting
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
                kanishka jj
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
            Date
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
