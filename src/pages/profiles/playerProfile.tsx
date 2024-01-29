import { Col, Row } from "antd";
import { url } from "inspector";
import backgroundImg from "../../assents/background2.png";
import profileBackground from "../../assents/profileBackground.png";
import profilePic from "../../assents/Home-pic-2.png.png";
const PlayerProfile = () => {
  return (
    <>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={10}
          xl={10}
          style={{
            backgroundImage: `url(${profileBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "345px",
              height: "327px",
              //   backgroundImage: `url(${profilePic})`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              background: "black",
            }}
          ></div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={14}
          xl={14}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "1000px",
          }}
        ></Col>
      </Row>
      <div
        style={{
          background: "white",
          height: "500px",
          backgroundSize: "cover",
          backgroundRepeat: "noRepeat",
          width: "100%",
        }}
      ></div>
    </>
  );
};

export default PlayerProfile;
