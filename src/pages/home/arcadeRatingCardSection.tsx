import { Col, Empty, Row } from "antd";
import ArcadeRatingCard from "../../components/arcadeRatingCard";
import { useEffect, useState } from "react";
import { Arcade, ArcadeFeedbacks } from "../../types";
const ArcadeRatingCardsSection = () => {
  const [arcadeRatings, setArcadeRatings] = useState<Arcade[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
        );
        const data = await res.json();
        const filteredRatedArcades = data.filter(
          (arcade: Arcade) => arcade.arcadefeedbacks.length > 0
        );
        setArcadeRatings(filteredRatedArcades);
        console.log("arcadeRatings", filteredRatedArcades);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(arcadeRatings);
  function calculateAverageRate(feedbacks: ArcadeFeedbacks[]) {
    if (feedbacks.length === 0) return 0;
    let sum = 0;
    let avgRate = 0.0;
    feedbacks.map((feedback) => {
      sum += feedback.rate as number;
      avgRate = sum / feedbacks.length;
    });
    console.log("avgRate", avgRate);  
    return avgRate;
  }
  return (
    <Row
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          color: "#0E458E",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        Arcade ratings
      </h1>
      <Row>
        {arcadeRatings.length === 0 ? (
          <Empty description={"No Arcade Availiable"} />
        ) : (
          arcadeRatings.map((arcadeRating) => {
            const averageRate = calculateAverageRate(
              arcadeRating.arcadefeedbacks
            );
            console.log("averageRate", averageRate);
            return (
              <Col lg={8} md={12} sm={24}>
                <ArcadeRatingCard
                  arcadeRating_id={arcadeRating.arcade_id}
                  arcadeRating={averageRate}
                  arcadeName={arcadeRating.arcade_name}
                  arcade_id={arcadeRating.arcade_id}
                />
              </Col>
            );
          })
        )}
      </Row>
    </Row>
  );
};

export default ArcadeRatingCardsSection;
