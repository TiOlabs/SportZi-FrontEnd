import { Col, Row, Select, Input } from "antd";
import CoachHeropic01 from "../../assents/CoachHeropic01.png";
import Search from "antd/es/input/Search";
import type { SearchProps } from "antd/es/input/Search";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
</style>;

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};
const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: "Coach-1",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Coach-2",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Coach-3",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "Coach-4",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const { Option } = Select;

const HeroSection = () => {
  const onSearch: SearchProps["onSearch"] = (value: any, _e: any, info: any) =>
    console.log(info?.source, value);

  return (
    <div style={{ margin: "2%" }}>
      <Row justify="center" align="middle">
        <Col xs={24} lg={8}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#0E458E",
              fontFamily: "Kanit, sans-serif",
              fontSize: 36,
              fontWeight: 200,
              lineHeight: 1.1,
              marginTop: "15%",
            }}
          >
            Discover Your Perfect Coach for Sporting Excellence
          </h1>
        </Col>
        <Col lg={11}></Col>
      </Row>

      <Row>
        <Col
          md={16}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 1.2,
          }}
        >
          <Col sm={16} xs={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontFamily: "Kanit, sans-serif",
                fontSize: 18,
                marginTop: "-8%",
              }}
            >
              Explore our expert coaches across various sports, each dedicated
              to enhancing your skills. Customize your search to meet your
              goals, ensuring a rewarding coaching experience that drives you
              towards success.
            </div>
          </Col>
          <Col></Col>
        </Col>

        <Col sm={0} xs={6}></Col>
        <Col md={8} xs={12} lg={6}>
          <div style={{ width: "100%",marginTop:"-5%" }}>
            <img
              src={CoachHeropic01}
              alt="coachpic"
              style={{ height: "auto", width: "100%", marginTop: "5%" }}
            />
          </div>
        </Col>
        <Col sm={0} xs={6}></Col>
      </Row>

      <Row>
        <Col sm={0} xs={2} lg={3} md={3}></Col>
        <Col
          md={10}
          xs={20}
          lg={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              marginTop: "-5%",
              height: "2.5 px",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            <Search
              placeholder=" Search Coaches"
              allowClear
              onSearch={onSearch}
              size="large"
            />

            <Dropdown menu={menuProps}>
              <Button style={{ height: 40 }}>
                <Space>
                  Coaches
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Col>
        <Col sm={0} xs={4}></Col>
      </Row>
    </div>
  );
};

export default HeroSection;
