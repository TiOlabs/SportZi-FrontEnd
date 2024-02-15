import { Col, Grid, Row, Typography } from "antd";

const ReviewCard = () => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  return (
    <>
      <Row
        style={{
          width: "330px",
          height: "200px",
          backgroundColor: "#fff",
          marginTop: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography
            style={{
              paddingTop: "25px",
              paddingLeft: "20px",
              fontFamily: "kanit",
              fontWeight: md ? "500" : "400",
              fontSize: md ? "18px" : "16px",
            }}
          >
            Sharada
          </Typography>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography
            style={{
              paddingRight: "20px",
              paddingLeft: "20px",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: md ? "15px" : "12px",
            }}
          >
            We recently had a small group session with Chris for my son's
            birthday prior to BPL|02. Chris was fantastic with the boys. Despite
            having 4 boys for the hour, he was attentive to their individual
            needs.
          </Typography>
        </Col>
      </Row>
    </>
  );
};

export default ReviewCard;
