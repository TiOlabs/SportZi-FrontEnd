import { Col, Row } from "antd";
import ArcadeRatingCard from "../../components/arcadeRatingCard";
import { useEffect, useState } from "react";
import { ArcadeFeedbacks } from "../../types";
const ArcadeRatingCardsSection = () => {
    const [arcadeRatings, setArcadeRatings] = useState<ArcadeFeedbacks[]>([]);
    useEffect(() => {   
        try {
            const fetchData = async () => {
                const res = await fetch(
                    "http://localhost:8000/api/getarcaderatings"
                );
                const data = await res.json();
                setArcadeRatings(data);
            };
            fetchData();
        } catch (e) {
            console.log(e);
        }
    }, []);
    console.log(arcadeRatings);
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
        {arcadeRatings?.map((arcadeRating: ArcadeFeedbacks) => (
          <Col lg={8} md={12} sm={24}>
            <ArcadeRatingCard
              arcadeRating_id={arcadeRating.arcade_feedback_id}
              arcadeRating={arcadeRating.rate}
              arcadeName={arcadeRating.arcade.arcade_name}
            />
            
          </Col>
        ))}

      </Row>
    </Row>
  );
};

export default ArcadeRatingCardsSection;
