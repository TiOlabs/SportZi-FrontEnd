import { Col, Row, Select, Input, Button } from "antd";
import FooterLogo from "../assents/FooterLogo.png";
import type { SearchProps } from "antd/es/input/Search";
import {
  MailOutlined,
  FacebookFilled,
  GoogleOutlined,
  LinkedinFilled,
  YoutubeFilled,
  InstagramOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { Space } from "antd";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap')
</style>;

const { Option } = Select;

const buttonStyle = {
  backgroundColor: " #9BBEED",
  borderRadius: 0,
  borderColor: "#9BBEED",
  color: "#666666",
  width: "120px",
};

const AppFooter = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  <Space>
    <FacebookFilled />
    <GoogleOutlined />
    <LinkedinFilled />
    <YoutubeFilled />
    <InstagramOutlined />
    <TwitterCircleFilled />
  </Space>;

  return (
    <Row
      style={{
        backgroundColor: "#EFF4FA",
        width: "100%",
      }}
    >
      <Col span={24}>
        <Row>
          <Col md={6} lg={0}></Col>
          <Col
            sm={24}
            md={12}
            lg={8}
            style={{ marginLeft: "3%", marginTop: "3%" }}
          >
            <img
              src={FooterLogo}
              style={{
                height: "auto",
                width: "20%",
                marginLeft: "40%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            />

            <div
              style={{
                lineHeight: 1.6,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                textAlign: "center",
                color: "#0E458E",
                fontFamily: "Kanit, sans-serif",
                fontWeight: 300,
                marginTop: "10%",
                marginRight: "3%",
              }}
            >
              {" "}
              Explore our expert coaches across various sports, each dedicated
              to enhancing your skills. Customize your search to meet your
              goals, ensuring a rewarding coaching experience that drives you
              towards success.
            </div>
          </Col>

          <Col sm={0} lg={6}></Col>
          <Col xs={23} sm={22} lg={8}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#0E458E",
                fontFamily: "Kanit, sans-serif",
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.1,
                marginTop: "10%",
                marginBottom: "5%",
                marginLeft: "8%",
              }}
            >
              <b>Subscribe For Our Newsletter</b>
            </h1>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "5%",
              }}
            >
              <Input
                prefix={<MailOutlined style={{ backgroundColor: "#9BBEED" }} />}
                type="email"
                placeholder="&emsp;  Email"
                style={{
                  backgroundColor: "white",
                  width: "60%",
                  color: "#666666",
                  marginRight: "12%",
                  border: "none",
                  borderRadius: 0,
                  height: 34,
                  marginLeft: "2%",
                }}
              />

              <Button type="primary" style={buttonStyle}>
                Subscribe
              </Button>
            </div>
          </Col>
          <Col md={6} lg={0}></Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-4%",
            
            
          }}
        >
          <Col sm={0} lg={12}></Col>
          <Col
            xs={12}
            md={6}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "center",
              
            }}
          >
            <div>
              <h4 style={{ fontSize: 16, color: "#646464", lineHeight: 0.3}}>
                {" "}
                Company
              </h4>
              <a
                href="/about"
                style={{ color: "#626262", textDecoration: "none" }}
              >
                <div
                  style={{ fontSize: 14, cursor: "pointer", lineHeight: 1.5 }}
                >
                  About us
                </div>
              </a>

              <a href="/Coaches" style={{ color: "#626262" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
               Coaches
                </div>
              </a>

              <a href="/Arcades" style={{ color: "#646464" }}>
                <div style={{ fontSize: 14, cursor: "pointer" }}>
                  {" "}
                  Arcades{" "}
                </div>
              </a>

              <a href="/" style={{ color: "#646464" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                 Home
                </div>
              </a>
            </div>
          </Col>

          <Col
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <h4 style={{ fontSize: 16, color: "#646464", lineHeight: 0.5 }}>
                {" "}
                Resources
              </h4>
              <a href="/FAQ" style={{ color: "#646464" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                   
                  }}
                >
                FAQ
                </div>
              </a>

              <a href="/Blog" style={{ color: "#646464" }}>
                <div
                  style={{ fontSize: 14, cursor: "pointer", lineHeight: 1.5 }}
                >
                  {" "}
                  Blog{" "}
                </div>
              </a>

              <a href="/Updates" style={{ color: "#646464" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                Updates
                </div>
              </a>
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <h4 style={{ fontSize: 16, color: "#646464", lineHeight: 0.5 }}>
                {" "}
                Support
              </h4>
              <a href="/Our story" style={{ color: "#646464" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                 Our story
                </div>
              </a>

              <a href="/Contact" style={{ color: "#646464" }}>
                <div style={{ fontSize: 14, cursor: "pointer" }}>
                  {" "}
                 Contact{" "}
                </div>
              </a>

              <a href="/News" style={{ color: "#646464" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                  {" "}
                  News
                </div>
              </a>

              <a href="/Team" style={{ color: "#646464" }}>
                <div
                  style={{ fontSize: 14, cursor: "pointer", lineHeight: 1.5 }}
                >
                  {" "}
                  Team{" "}
                </div>
              </a>
            </div>
          </Col>

          <Col
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <h4 style={{ fontSize: 16, color: "#646464", lineHeight: 0.5 }}>
                {" "}
                Site Map
              </h4>
              <a href="/Packages" style={{ color: "#646464" }}>
                <div
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                  {" "}
                 Packages
                </div>
              </a>

              <a href="/Meetings" style={{ color: "#646464" }}>
                <div style={{ fontSize: 14, cursor: "pointer" }}>
              Meetings
                </div>
              </a>
            </div>
          </Col>

          <Col sm={0} lg={0}></Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row>
          <Col
            span={24}
            sm={0}
            md={24}
            lg={9}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                marginTop: "-5%",
                color: "#484A4B",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                fontSize: 17,
                fontFamily: "Kanit, sans-serif",
              }}
            >
              <div
                style={{
                  width: "140%",
                  marginTop: "15%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <hr />{" "}
              </div>
              <div style={{ width: "120%", marginBottom: "0.5%" }}>
                {" "}
                <hr />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: "12%",
                }}
              >
                Follow us on
              </div>
              <div style={{ color: "#858484" }}>
                <FacebookFilled /> &emsp;
                <GoogleOutlined /> &emsp;
                <LinkedinFilled /> &emsp;
                <YoutubeFilled />
                &emsp;
                <InstagramOutlined />
                &emsp;
                <TwitterCircleFilled />
              </div>
            </div>
          </Col>
          <Col sm={0} md={0} lg={15}></Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row>
          <Col xs={0} lg={10}></Col>
          <Col xs={12} lg={10}>
            <div
              style={{
                display: "flex",
                alignItems: "right",
                justifyContent: "center",
                fontSize: 14,
                color: "#818487",
                fontFamily: "kanit,sans-serif",
              }}
            >
              privacy policy | copyrights
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <div
              style={{
                display: "flex",
                alignItems: "right",
                justifyContent: "center",
                fontSize: 14,
                color: "#818487",
                fontFamily: "kanit,sans-serif",
              }}
            >
              @powerd by batch21
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AppFooter;
