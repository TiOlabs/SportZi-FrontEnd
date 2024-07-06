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
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  function calculateAverageRate(feedbacks: ArcadeFeedbacks[]) {
    if (feedbacks.length === 0) return 0;
    let sum = 0;
    feedbacks.forEach((feedback) => {
      sum += feedback.rate as number;
    });
    return sum / feedbacks.length;
  }

  const sortedArcades = arcadeRatings
    .map((arcade) => ({
      ...arcade,
      averageRate: calculateAverageRate(arcade.arcadefeedbacks),
    }))
    .sort((a, b) => b.averageRate - a.averageRate);

  return (
    <Row
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2%",
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
          marginBottom: "2%",
        }}
      >
        Arcade ratings
      </h1>
      <Row gutter={[16, 16]}>
        {sortedArcades.length === 0 ? (
          <Empty description={"No Arcade Available"} />
        ) : (
          sortedArcades.map((arcade) => (
            <Col key={arcade.arcade_id as string} lg={8} md={12} sm={24}>
              <ArcadeRatingCard
                arcadeRating_id={arcade.arcade_id}
                // arcadeRating={arcade.averageRate}
                arcadeName={arcade.arcade_name}
                arcade_id={arcade.arcade_id}
                arcadeAverageRate={arcade.averageRate}
                arcade_image={arcade.arcade_image}
              />
            </Col>
          ))
        )}
      </Row>
    </Row>
  );
};

export default ArcadeRatingCardsSection;
