import {
  AuditOutlined,
  DollarOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuProps["items"] = [
  getItem("Dashboard", "1"),  
  getItem("User manegment", "sub4", <UserOutlined />, [
    getItem("Coaches Management", "/coaches"),
    getItem("Player Management", "10"),
    getItem("Arcade Manegement", "11"),
  ]),
  getItem("Payment Manegement", "sub5", <DollarOutlined />, [
    getItem("completed Booking", "12"),
    getItem("Player Canceled", "13"),
    getItem("Coach/Arcade Canceled", "14"),
    getItem("Admin Canceled", "15"),
  ]),
  getItem("Booking Management", "sub6", <AuditOutlined />, [
    getItem("Booked Arena", "16"),
    getItem("Booked Coaches ", "17"),
    getItem("Package Enrolled", "18"),
  ]),
];
const AdminDashboard = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Row>
      <Col
        span={5}
        style={{ backgroundColor: "#051F43", color: "white", padding: "2%" }}
      >
        <Row>
          {" "}
          <MenuOutlined />
        </Row>
        <Row style={{ marginTop: "5%" }}>
          <h3>
            <Link to="/">Dashboard</Link>
          </h3>
        </Row>
        <Row>
          {" "}
          <Menu
            onClick={onClick}
            style={{ width: 256, backgroundColor: "#051F43" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            items={items}
          />
        </Row>
      </Col>
      <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Booked Arena</h2>
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
          <Col span={6}>
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
              Super Box Complex
            </div>
          </Col>
          <Col span={6}>
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
              {" "}
              100$
            </div>
          </Col>
          <Col span={6}>
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
              Sasindu Daluwatta
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
                  View
                </div>
              </Button>
              <Button danger style={{ width: "100px" }}>
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
    </Row>
  );
};

export default AdminDashboard;
