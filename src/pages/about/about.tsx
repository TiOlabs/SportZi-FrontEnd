import Navbar2 from "../../components/navbar";
import { Col, Flex, Row } from "antd";
import Navbar from "../../components/navbar";
import AppFooter from "../../components/footer";
import AboutImage from "../../assents/sportEquepments.jpg";
import AboutImage2 from "../../assents/AboutImage2.jpeg";
import AboutImage3 from "../../assents/AboutImage3.jpeg";
import AboutImage4 from "../../assents/AboutImage4_1.jpeg";
import AboutImage5 from "../../assents/AboutImage5.jpeg";
import AboutImage6 from "../../assents/AboutImage6.jpeg";
import { Image } from "antd";
import { Grid } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarLogin from "../../components/NavBarLogin";
import { usePlayer } from "../../context/player.context";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/userContext";

const About = () => {
  const about = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [about]);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);
  const { userDetails } = useUser();
  return (
    <div style={{}}>
      {userDetails.id !== "" ? <Navbar /> : <NavbarLogin />}
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
              fontWeight: 400,
              marginTop: lg ? "12%" : "10%",
              marginBottom: lg ? "0%" : "3%",
              fontStyle: "kanit",
              color: "#0E458E",
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
              borderRadius: "10px",
            }}
            width={460}
            height={440}
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
            <p> Welcome to Spotzi! </p>
            <div
              style={{
                display: "Flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "5%",
              }}
            >
              At SpotZi, we are dedicated to transforming the way sports
              facilities are managed. Our mission is to empower sports venues of
              all sizes with state-of-the-art, user-friendly technology, making
              complex operational challenges a thing of the past. From local
              community gyms to prestigious world-class stadiums, SpotZi
              provides innovative solutions that streamline every aspect of
              facility management.
            </div>
            <div>
              <p> Our Vision</p>
              <p style={{ fontSize: "20px" }}>
                Efficient Operations, Exceptional Experiences
              </p>
            </div>
            <div
              style={{
                display: "Flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              We believe in the power of efficiency to enhance experiences. By
              integrating our advanced management system into your operations,
              we simplify tasks such as booking, maintenance, and resource
              management. This allows you to focus on what truly
              matters—creating outstanding experiences for athletes, coaches,
              and sports enthusiasts alike.
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
          Join Us on the Journey
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
            At SpotZi, we're not just about managing facilities; we're about
            pioneering a new era of sports venue management. Our commitment to
            innovation and excellence drives us to constantly evolve and
            improve, providing our clients with the tools they need to succeed.
            Discover how SpotZi can redefine your facility’s operations and
            elevate your venue to new heights.{" "}
          </div>
        </Col>
        <Col lg={4} xs={0} md={3}></Col>
      </Row>

      <Row
        style={{
          display: "flex",
          marginBottom: "5%",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <p style={{ color: "#0E458E", fontFamily: "kanit" }}>Meet Our Team</p>
      </Row>
      <Row
        style={{
          marginBottom: "5%",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          textAlign: "center",
          flexWrap: "wrap",
        }}
      >
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Col lg={3} md={8} xs={12}>
            {" "}
            <Image
              style={{
                borderRadius: "100%",
                width: lg ? "140px" : "130px",
                border: "6px solid #0E458E",

                boxShadow: "0 4px 8px rgba(2, 2, 2, 2)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              src={AboutImage5}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              Thisara
            </div>
          </Col>

          <Col lg={3} md={8} xs={12}>
            <Image
              style={{
                borderRadius: "100%",
                width: lg ? "140px" : "140px",
                border: "6px solid #0E458E",

                boxShadow: "0 4px 8px rgba(2, 2, 2, 2)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              src={AboutImage4}
            />
            <div style={{ marginTop: "10px" }}>Bhathiya</div>
          </Col>

          <Col lg={3} md={8} xs={12}>
            {" "}
            <Image
              style={{
                borderRadius: "100%",
                width: lg ? "140px" : "140px",
                border: "6px solid #0E458E",

                boxShadow: "0 4px 8px rgba(2, 2, 2, 2)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              src={AboutImage2}
            />
            <div style={{ marginTop: "10px" }}>Navindu</div>
          </Col>

          <Col lg={3} md={8} xs={12}>
            <Image
              style={{
                borderRadius: "100%",
                width: lg ? "140px" : "140px",
                border: "6px solid #0E458E",

                boxShadow: "0 4px 8px rgba(2, 2, 2, 2)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              src={AboutImage3}
            />

            <div style={{ marginTop: "10px" }}>Niweesha</div>
          </Col>

          <Col lg={3} md={8} xs={12}>
            {" "}
            <Image
              style={{
                borderRadius: "100%",
                width: lg ? "140px" : "140px",
                border: "6px solid #0E458E",

                boxShadow: "0 4px 8px rgba(2, 2, 2, 2)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              src={AboutImage6}
            />
            <div style={{ marginTop: "10px" }}>Kanishka</div>
          </Col>
        </Image.PreviewGroup>
      </Row>

      {<AppFooter />}
    </div>
  );
};

export default About;

/////
