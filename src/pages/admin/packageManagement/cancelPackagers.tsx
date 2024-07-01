import { Col, Row, Button } from "antd";
const CancelPackagers = () => {
  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" , marginLeft: "21%"}}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Cancel Packages</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
          />
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: "white",
          padding: "1%",
          marginTop: "50px",
        }}
      >
        <Col></Col>
        <Col span={8} style={{}}>
          <div
            style={{
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "80px",
              height: "80px",
              backgroundColor: "#000",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "80px",
              fontSize: "16px",
            }}
          >
            Swimming For Beginers
          </div>
        </Col>
        <Col span={2} style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              textAlign: "center",
              height: "80px",
              fontSize: "16px",
            }}
          >
            {" "}
            100$
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              borderRadius: "50%",
              position: "absolute",
              width: "80px",
              height: "80px",
              backgroundColor: "#000",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "80px",
              fontSize: "16px",
            }}
          >
            SSC
          </div>
        </Col>
        <Col span={6} style={{}}>
          <div
            style={{
              height: "80px",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              style={{ width: "100px", backgroundColor: "#0E458E" }}
            >
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Details
              </div>
            </Button>
            <Button
              type="primary"
              ghost
              style={{ width: "100px", marginLeft: "20px" }}
            >
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Cancel
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default CancelPackagers;
