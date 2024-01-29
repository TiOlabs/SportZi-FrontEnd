import { Col, Row } from "antd";
import CoachCard from "../../components/CoachCard";

const CoachCardSection = () => {
  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0",
  };

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
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
            <div
              style={{
                width: "100%",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1 style={{ color: " #0E458E" }}>Our Best Coaches</h1>
            </div>

            <div
              style={{
                marginBottom: "5%",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
              </Row>
              <div>
                <button
                  style={{
                    color: "#1B5DB7",
                    background: "none",
                    border: "none",
                    fontFamily: "Kanit",
                    fontSize: "18px",
                  }}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CoachCardSection;
