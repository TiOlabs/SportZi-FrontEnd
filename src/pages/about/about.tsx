import Navbar2 from "../../components/navbar";
import { Col, Flex, Row } from "antd";
import Navbar from "../../components/navbar";
import AppFooter from "../../components/footer";
import AboutImage from "../../assents/AboutImage.png";
import { Image } from "antd";
import { Grid } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarLogin from "../../components/NavBarLogin";
import { usePlayer } from "../../context/player.context";

const About = () => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);
  const { userDetails } = usePlayer();
  return (
    <div style={{}}>
     {userDetails.id!=="" ? <Navbar/> : <NavbarLogin />}
      {/* ............................................................ */}
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "absolute",
          paddingLeft: "40vw",
        }}
      >
        <Col
          style={{
            backgroundColor: "#EFF4FA",
            backgroundSize: "cover",
            height: "110vh",
            width: "58vw",
            marginRight: lg ? "-2.6%" : md ? "-3.5%" : "-4%",
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
          justifyContent: "left",
          textAlign: "center",
        }}
      >
        <Col lg={4} xs={0} md={0}></Col>
        <Col lg={4} xs={0} md={0}></Col>
        <Col
          lg={12}
          xs={24}
          md={24}
          style={{
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              fontSize: 45,
              fontWeight: 300,

              marginTop: lg ? "12%" : "10%",
              marginBottom: lg ? "0%" : "3%",
              fontStyle: "kanit",
            }}
          >
            About Us
          </div>
        </Col>
        <Col lg={4} xs={0} md={0}></Col>
      </Row>

      <Row style={{ marginTop: "2%" }}>
        <Col lg={3} xs={0} md={0}></Col>
        <Col
          lg={11}
          xs={0}
          md={24}
          style={{
            display: "Flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "-1%",
          }}
        >
          <Image
            style={{
              width: lg ? "460px" : "400px",
              marginLeft: lg ? "-5%" : "2%",
              marginRight: lg ? "0%" : "2%",
            }}
            width={460}
            src={AboutImage}
            preview={{ src: AboutImage }}
          />
        </Col>
        <Col
          lg={10}
          xs={24}
          md={24}
          style={{
            display: "Flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: lg ? "18px" : "16px",
              marginTop: lg ? "3%" : "10%",
              marginRight: lg ? "15%" : "5%",
              marginLeft: lg ? "0%" : "5%",
              lineHeight: 1.8,
              fontStyle: "kanit",
              fontWeight: 300,
            }}
          >
            <div
              style={{
                display: "Flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "5%",
              }}
            >
              I am a former elite rugby league player who would love to
              encourage and mentor younger athletes to work towards their goals
              and aspirations as well as to share my knowledge and give back to
              the game that’s given me so much. My main position in rugby league
              was halfback and I had the honour of representing QLD in the State
              Of Origin
            </div>

            <div
              style={{
                display: "Flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              I am a former elite rugby league player who would love to
              encourage and mentor younger athletes to work towards their goals
              and aspirations as well as to share my knowledge and give back to
              the game that’s given me so much. My main position in rugby league
              was halfback and I had the honour of representing QLD in the State
              Of Origin
            </div>
          </div>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "10%",
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
        <Col lg={4} xs={0} md={3}></Col>
        <Col lg={16} xs={24} md={18}>
          <div
            style={{
              marginTop: lg ? "5%" : "8%",
              marginLeft: lg ? "0%" : "5%",
              marginRight: lg ? "0%" : "5%",
              display: "Flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: lg ? "18px" : "16px",
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
        <Col lg={4} xs={0} md={3}></Col>
      </Row>

    
      {<AppFooter />}
    </div>
  );
};

export default About;

/////