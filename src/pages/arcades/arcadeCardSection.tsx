import { Col, Row } from "antd";
import ArcadeCard from "../../components/ArcadeCardInArcadepage";

const ArcadeCardSection = () => {
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
        <ArcadeCard />{" "}
      </Col>
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
        <ArcadeCard />
      </Col>
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
        <ArcadeCard />
      </Col>

      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        lg={8}
        xs={24}
        md={12}
      >
        <ArcadeCard />
      </Col>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        lg={8}
        xs={24}
        md={12}
      >
        <ArcadeCard />
      </Col>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        lg={8}
        xs={24}
        md={12}
      >
        <ArcadeCard />
      </Col>
    </Row>
  );
};

export default ArcadeCardSection;
