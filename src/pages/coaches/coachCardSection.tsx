import { Col, Row } from "antd";
import CoachCardCoachPage from "../../components/CoachCardCoachPage";
import { useEffect, useState } from "react";
import { Coach } from "../../types";

const Appfooter = require("../../components/footer");
const CoachCardSection = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch("http://localhost:8000/api/getcoach");

        const data = await res.json();
        console.log(data);
        setCoaches(data);
        console.log(coaches);
      
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#EFF4FA",
        marginBottom: "5%",
        width: "100%",
      }}
    >
      {coaches?.map((coach: Coach) => (
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3%",
          }}
          lg={8}
          xs={24}
          md={12}
        >
          <CoachCardCoachPage
          coach_image={coach.user.user_image}
          coach_name={coach.user.firstname}
          coach_sport={coach.sport.sport_name}
          coach_rating={coach.coachFeedbacks.rate}
          coach_short_description={coach.short_desctiption}
          coach_rate={coach.rate}
          
          />
        </Col>
      ))}
    </Row>
  );
};

export default CoachCardSection;
