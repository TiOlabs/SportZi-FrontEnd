import { Col, Row } from "antd";
import ArcadeCard from "../../components/ArcadeCardInArcadepage";
import { useEffect, useState } from "react";
import { Arcade } from "../../types";
import axios from "axios";

const ArcadeCardSection = () => {
  const [arcades, setarcades] = useState<Arcade[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
        );
        const data = await res.data;
        setarcades(data);
        console.log(arcades)
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
      {arcades?.map((arcade: Arcade) => (
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
          <ArcadeCard
            arcade_name={arcade.arcade_name}
            arcade_rate={arcade.arcadefeedbacks.rate}
            arcade_image={arcade.arcade_image}
            arcade_description={arcade.description}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ArcadeCardSection;
