import Navbar2 from "../../components/NavBar2";
import { Col, Flex, Row } from "antd";
import Navbar from "../../components/navbar";
import AppFooter from "../../components/footer";
import AboutImage from "../../assents/AboutImage.png";
import { Image } from "antd";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap')
</style>;

const About = () => {
  return (
    <div style={{}}>
      <Navbar2 />
      {/* ............................................................ */}
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "absolute",
          borderStyle: "dashed",
          paddingLeft: "40vw",
        }}
      >
        <Col
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
            height: "100vh",
            width: "60vw",
          }}
        >
          <div style={{}}></div>
        </Col>
      </Row>
      {/* .................................................................. */}
      <Row
        style={{
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={4} xs={0} md={4}></Col>
        <Col
          lg={16}
          xs={24}
          md={16}
          style={{
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              fontSize: 45,
              fontWeight: 300,

              marginTop: "10%",

              fontStyle: "kanit",
            }}
          >
            About Us
          </div>
          <div
            style={{
              fontSize: 18,
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "8%",
              marginLeft: "8%",
              marginRight: "8%",
              lineHeight: 1.8,
              fontStyle: "kanit",
              fontWeight: 300,
            }}
          >
            I am a former elite rugby league player who would love to encourage
            and mentor younger athletes to work towards their goals and
            aspirations as well as to share my knowledge and give back to the
            game that’s given me so much. My main position in rugby league was
            halfback and I had the honour of representing QLD in the State Of
            Origin
            <br />
            <br />
            <br />I am a former elite rugby league player who would love to
            encourage and mentor younger athletes to work towards their goals
            and aspirations as well as to share my knowledge and give back to
            the game that’s given me so much. My main position in rugby league
            was halfback and I had the honour of representing QLD in the State
            Of Origin
          </div>
        </Col>
      </Row>

      {/* <Row
        style={{
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={4} xs={0} md={4}></Col>
        <Col
          lg={16}
          xs={24}
          md={16}
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              fontSize: 45,
              fontWeight: 300,

              marginTop: "10%",

              fontStyle: "kanit",
            }}
          >
            About Us
            <br /> <br />
          </div>
        </Col>
      </Row>
      <Row style={{ }}>
        <Col
          lg={10}
          xs={24}
          md={10}
          style={{
            display: "Flex",
            alignItems: "right",
            justifyContent: "right",
            textAlign: "right",
          }}
        >
          <Image width={500} src={AboutImage} preview={{ src: AboutImage }} />
        </Col>
        <Col
          lg={14}
          xs={24}
          md={14}
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
          }}
        >
          {" "}
          <div
            style={{
              fontSize: 18,
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "8%",
              marginLeft: "8%",
              marginRight: "8%",
              lineHeight: 1.8,
              fontStyle: "kanit",
              fontWeight: 300,
            }}
          >
            I am a former elite rugby league player who would love to encourage
            and mentor younger athletes to work towards their goals and
            aspirations as well as to share my knowledge and give back to the
            game that’s given me so much. My main position in rugby league was
            halfback and I had the honour of representing QLD in the State Of
            Origin
            <br />
            <br />
            <br />I am a former elite rugby league player who would love to
            encourage and mentor younger athletes to work towards their goals
            and aspirations as well as to share my knowledge and give back to
            the game that’s given me so much. My main position in rugby league
            was halfback and I had the honour of representing QLD in the State
            Of Origin
          </div>{" "}
        </Col>
      </Row>

      <Row>
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={4} xs={0} md={4}></Col>
        <Col
          lg={16}
          xs={24}
          md={16}
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
            borderStyle: "dashed",
           
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "5%",
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "#0E458E",
          }}
        >
          The Journey of coaching
        </div>
      </Row>

      <Row style={{ marginBottom: "10%" }}>
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={16} xs={24} md={16}>
          <div
            style={{
              marginTop: "2%",
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 300,
              fontStyle: "kanit",
              lineHeight: 1.8,
            }}
          >
            {" "}
            I am a former elite rugby league player who would love to encourage
            and mentor younger athletes to work towards their goals and
            aspirations as well as to share my knowledge and give back to the
            game that’s given me so much. My I am a former elite rugby league
            player who would love to encourage and mentor younger athletes to
            work towards their goals and aspirations as well as to share my
            knowledge and give back to the game that’s given me so much. My main
            position in rugby league was halfback and I had the honour of
            representing QLD in the State Of Origin{" "}
          </div>
        </Col>
        <Col lg={4} xs={0} md={4}></Col>
      </Row> */}
      {/* <AppFooter /> */}
    </div>
  );
};

export default About;

/*
 <div style={{}}>
      <Navbar2 />
      <Row>
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={4} xs={0} md={4}></Col>
        <Col
          lg={16} xs={24} md={16}
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              fontSize: 45,
              fontWeight: 300,
              display: "Flex",
              alignItems: "center",
              justifyContent: "left",
              textAlign: "center",
              marginTop: "10%",
              marginLeft: "15%",
              fontStyle: "kanit",
            }}
          >
            About Us
            <br /> <br />
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          lg={10} xs={24} md={10}
          style={{
            display: "Flex",
            alignItems: "right",
            justifyContent: "right",
            textAlign: "right",
          }}
        >
          <Image width={500} src={AboutImage} preview={{ src: AboutImage }} /> 
        </Col>
        <Col
          lg={14} xs={24} md={14}
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
          }}
        >
          {" "}
          <div
            style={{
              fontSize: 18,
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "10%",
              marginLeft: "8%",
              marginRight: "8%",
              lineHeight: 1.8,
              fontStyle: "kanit",
              fontWeight: 300,
            }}
          >
            I am a former elite rugby league player who would love to encourage
            and mentor younger athletes to work towards their goals and
            aspirations as well as to share my knowledge and give back to the
            game that’s given me so much. My main position in rugby league was
            halfback and I had the honour of representing QLD in the State Of
            Origin <br />
            <br />
            <br />I am a former elite rugby league player who would love to
            encourage and mentor younger athletes to work towards their goals
            and aspirations as well as to share my knowledge and give back to
            the game that’s given me so much. My main position in rugby league
            was halfback and I had the honour of representing QLD in the State
            Of Origin
          </div>{" "}
        </Col>
      </Row>

      <Row>
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={4} xs={0} md={0}></Col>
        <Col
          lg={16} xs={24} md={16}
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
        </Col>
      </Row>



      <Row
        style={{
          marginTop: "5%",
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "#0E458E",
          }}
        >
          The Journey of coaching
        </div>
      </Row>

      <Row style={{ marginBottom: "10%" }}>
        <Col lg={4} xs={0} md={4}></Col>
        <Col lg={16} xs={24} md={16 }>
          <div
            style={{
              marginTop: "2%",
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 300,
              fontStyle: "kanit",
            }}
          >
            {" "}
            I am a former elite rugby league player who would love to encourage
            and mentor younger athletes to work towards their goals and
            aspirations as well as to share my knowledge and give back to the
            game that’s given me so much. My I am a former elite rugby league
            player who would love to encourage and mentor younger athletes to
            work towards their goals and aspirations as well as to share my
            knowledge and give back to the game that’s given me so much. My main
            position in rugby league was halfback and I had the honour of
            representing QLD in the State Of Origin{" "}
          </div>
        </Col>
        <Col lg={4} xs={0} md={4}></Col>
      </Row>
      <AppFooter />
    </div>
  );
};
*/
