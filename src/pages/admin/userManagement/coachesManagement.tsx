import { Col, Row, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useNavigate } from "react-router-dom";

interface Coach {
  coach_id: string;
  status: string;
  sport_id: string;
  rate: number | null;
  short_description: string;
  user: {
    user_id: string;
    role: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    DOB: string;
    gender: string;
    accountNumber: string | null;
    is_active: string;
    user_image: string | null;
    address: String | null;
    city: String | null;
    country: String | null;
  };
  sport: {
    sport_id: string;
    sport_name: string;
  };
}

const CoachesManagement = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getcoach`
        );
        setCoaches(response.data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchCoaches();
  }, []);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" ,marginLeft:"21%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Coaches details</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
          />
        </Col>
      </Row>

      {coaches.map((coachdetails: Coach) => (
        <DataRow coachdetails={coachdetails} />
      ))}
    </Col>
  );
};

export default CoachesManagement;

function DataRow(props: any) {
  const { coachdetails } = props;
  console.log(props);

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
  return (
    <Row
      key={coachdetails.coach_id}
      style={{
        backgroundColor: "white",
        padding: "1%",
        marginTop: "20px"
       
      }}
    >
      <Col></Col>
      <Col span={10} style={{}}>
        <AdvancedImage
          onClick={handleClick}
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "80px",
            height: "80px",
          }}
          cldImg={
            cld.image(coachdetails.user.user_image)
            // .resize(Resize.crop().width(200).height(200).gravity('auto'))
            // .resize(Resize.scale().width(200).height(200))
          }
          // border-radius: 50%;
          // width: 80px;
          // height: 80px;
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {coachdetails.user.firstname} {coachdetails.user.lastname}
          {/* Mr.Ruwan Palihawadana */}
        </div>
      </Col>

      <Col span={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {" "}
          {coachdetails.sport.sport_name}
          {/* Cricket */}
        </div>
      </Col>
      <Col span={8} style={{}}>
        <div
          style={{
            height: "80px",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{ width: "100px", backgroundColor: "#0E458E" }}
            onClick={showModal}
          >
            <div
              style={{
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Details
            </div>
          </Button>

          {/* modal */}
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ lineHeight: 3.0, fontSize: "160px" }}>
              <Row>
                <div style={{ fontSize: "28px", color: "#0E458E" }}>
                  Coach Details
                </div>
                <Col span={24}>
                  <Row>
                    <Col span={14}>
                      <b>Coach ID :</b> {coachdetails.coach_id}
                    </Col>
                    <Col span={10}>
                      <b>Sport ID :</b> {coachdetails.sport.sport_id}
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row>
                    <Col span={14}>
                      <b>First Name : </b> {coachdetails.user.firstname}
                    </Col>
                    <Col span={10}>
                      <b>Sport Name :</b> {coachdetails.sport.sport_name}
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <b>Last Name : </b> {coachdetails.user.lastname}
                </Col>
                <Col span={24}>
                  <b>Email :</b> {coachdetails.user.email}
                </Col>
                <Col span={24}>
                  <b>Account Number :</b>{" "}
                  {coachdetails.user.accountNumber || "N/A"}
                </Col>

                <Col span={24}>
                  <b>DOB :</b> {coachdetails.user.DOB}
                </Col>
                <Col span={24}>
                  <b>Gender :</b> {coachdetails.user.gender}
                </Col>
                <Col span={24}>
                  <b>City :</b> {coachdetails.user.city || "N/A"}
                </Col>
                <Col span={24}>
                  <b>Country :</b> {coachdetails.user.country || "N/A"}
                </Col>
              </Row>
            </div>
          </Modal>

          <Button
            type="primary"
            ghost
            style={{ width: "100px", marginLeft: "20px" }}
          >
            <div
              style={{
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Delete
            </div>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
