import { Col, Row } from "antd";
import * as styles from "./home.module.css";
import { ColorFactory } from "antd/es/color-picker/color";
import ButtonGroup from "antd/es/button/button-group";
import ArcadeRatingCard from "../../components/arcadeRatingCard";
import { Route } from "react-router-dom";
import Column from "antd/es/table/Column";
const ArcadeRatingCardsSection = () => {
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
        <Col xs={1} md={1} lg={0} xl={0}></Col>
        <Col xs={23} md={23} lg={12} xl={8}>
          <ArcadeRatingCard />
        </Col>
        <Col xs={1} md={8} lg={0} xl={0}></Col>
        <Col xs={23} md={16} lg={12} xl={8}>
          <ArcadeRatingCard />
        </Col>
        <Col xs={1} md={1} lg={6} xl={0}></Col>
        <Col xs={23} md={23} lg={18} xl={8}>
          <ArcadeRatingCard />
        </Col>
        <Col xs={0} md={0} lg={0} xl={4}></Col>
        <Col xs={0} md={0} lg={0} xl={8}>
          <ArcadeRatingCard />
        </Col>
        <Col xs={0} md={0} lg={0} xl={0}></Col>
        <Col xs={0} md={0} lg={0} xl={8}>
          <ArcadeRatingCard />
        </Col>
      </Row>
    </Row>
  );
};

export default ArcadeRatingCardsSection;
