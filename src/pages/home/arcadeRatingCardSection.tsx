import { Col, Row } from "antd";
import ArcadeRatingCard from "../../components/arcadeRatingCard";
import { useEffect, useState } from "react";
import { ArcadeRating } from "../../types";
const ArcadeRatingCardsSection = () => {
    const [arcadeRatings, setArcadeRatings] = useState<ArcadeRating[]>([]);
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
        {arcadeRatings?.map((arcadeRating: ArcadeRating) => (
          <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }}>
            <ArcadeRatingCard
              arcadeRating_description={arcadeRating.discription}
              arcadeRating={arcadeRating.rate}
            />
          </Col>
        ))}

      </Row>
    </Row>
  );
};

export default ArcadeRatingCardsSection;
