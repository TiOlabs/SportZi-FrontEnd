import { Button, Col, Row } from "antd";
import Background from "../../assets/HeroSectionBackgroundImg.png";
import Man from "../../assets/HeroSectionMan.png";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
const HeroSection = () => {
  const { lg, md, sm, xs, xl } = useBreakpoint();
  return (
    <Row
      style={{
        height: md ? (xl ? "750px" : "675px") : "498px",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center center",
      }}
    >
      <img
        src={Man}
        style={{
          width: md ? (xl ? "500px" : "415px") : "280px",
          height: md ? (xl ? "700px" : "600px") : "400px",
          zIndex: "0",
          position: "absolute",
          marginTop: md ? (xl ? "50px" : "75px") : "95px",
          marginLeft: sm ? (md ? (xl ? "925px" : "350px") : "145px") : "145px",
          overflow: "hidden",
        }}
      />

      <Col span={1} xl={3}></Col>
      <Col
        span={23}
        xl={10}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          zIndex: "1",
        }}
      >
        <h3
          style={{
            color: "white",
            fontSize: md ? (xl ? "110px" : "90px") : "50px",
            marginTop: md ? "60px" : "80px",
          }}
        >
          Delight Discover,Drive.
        </h3>
      </Col>
      <Col xl={11}></Col>
      <Col span={1} xl={2}></Col>
      <Col span={9} xl={9}>
        <div
          style={{
            color: "white",
            fontSize: md ? "30px" : "18px",
            marginTop: md ? "-150px" : "-80px",
          }}
        >
          Your Journey Starts Here!
        </div>
      </Col>
      <Col span={14} xl={13}></Col>
      <Col span={1} xl={2}></Col>
      <Col span={2}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: md ? "240px" : "158px",
            height: md ? "57px" : "52px",
            display: "flex",
            borderRadius: "3px",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1",
            backgroundColor: "#5587CC",
            marginTop: md ? (xl ? "-90px" : "-70px") : "-50px",
            fontSize: md ? "20px" : "16px",
          }}
        >
          Discover Coaches
        </Button>
      </Col>
    </Row>
  );
};

export default HeroSection;
