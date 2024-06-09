import { Col, Grid, Row, Typography,Rate} from "antd";

const ReviewCard = (props:any) => {

  const {userName} = props;
  const {comment} = props;
  const {rate} = props;


  // console.log("username:::::",userName);
  // console.log("comment:::::",comment);

  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  return (
    <>
      <Row
        style={{
          minWidth: "100%",
          maxWidth: "330px",
          minHeight: "150px",
          backgroundColor: "#fff",
          marginTop: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography
            style={{
              paddingTop: "10px",
              paddingLeft: "20px",
              fontFamily: "kanit",
              fontWeight: md ? "500" : "400",
              fontSize: md ? "18px" : "16px",
            }}
          >
            {/* Sharada */}
            {userName}
          </Typography>
        </Col>
        <Col
        style={{
          margin:"0",
          padding:"0px",
        }}
        >
        <Rate
                        allowHalf
                        disabled
                        value={rate}
                        style={{
                          scale: "0.7",
                          display: "flex",
                          flexDirection: "row",
                          color: "#0E458E",
                          fillOpacity: "0.8",
                        }}
                      />

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
            {/* We recently had a small group session with Chris for my son's
            birthday prior to BPL|02. Chris was fantastic with the boys. Despite
            having 4 boys for the hour, he was attentive to their individual
            needs. */}
            {comment}
          </Typography>
        </Col>
      </Row>
    </>
  );
};

export default ReviewCard;







