import { Col, Row } from "antd";
import CoachCard from "../../components/CoachCard";

const CoachCardSection = () => {
  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0",
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(27, 93, 183, 0.07)",
        }}
      >
        <div>
          <h1>Our Best Coaches</h1>
        </div>

        <div style={{ marginBottom: "5%" }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <CoachCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <CoachCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <CoachCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <CoachCard />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CoachCardSection;
