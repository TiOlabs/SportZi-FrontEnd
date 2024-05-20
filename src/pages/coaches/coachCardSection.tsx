import { Col, Empty, Row, Spin } from "antd";
import CoachCardCoachPage from "../../components/CoachCardCoachPage";
import { useEffect, useState } from "react";
import { Coach } from "../../types";
import axios from "axios";

const CoachCardSection = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getcoach`
        );
        const data = await res.data;

        // Filter the data to include only items with status "active"
        const successCoaches = data.filter(
          (coach: { status: string }) => coach.status === "active"
        );

        // Set the filtered data to state
        setCoaches(successCoaches);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
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
      {loading ? (
        <Spin />
      ) : coaches.length === 0 ? (
        <Empty  description={"No Coaches Availiable"} />
      ) : (
        coaches.map((coach: Coach) => (
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
            <div
              style={{
                marginTop: "0vh",
                marginRight: "10vh",
                marginBottom: "10vh",
              }}
            >
              <CoachCardCoachPage
                coach_id={coach.coach_id}
                coach_image={coach.user.user_image}
                coach_name={`${coach.user.firstname} ${coach.user.lastname}`}
                coach_sport={coach.sport.sport_name}
                coach_rating={coach.coachFeedbacks.rate}
                coach_short_description={coach.short_desctiption}
                coach_rate={coach.rate}
              />
            </div>
          </Col>
        ))
      )}
    </Row>
  );
};

export default CoachCardSection;
