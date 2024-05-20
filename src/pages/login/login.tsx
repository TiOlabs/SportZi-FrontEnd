import "../../styles/login.css";
import AppFooter from "../../components/footer";
import { Form, Input, Row, Col, Button, message } from "antd";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
import img1 from "./images/img1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

const commonInputStyle = {
  height: "40px",
};

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const login = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [login]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      Cookies.set("token", res.data.token, {
        expires: 1,
        httpOnly: false,
        secure: true,
      });
      messageApi.open({
        type: "success",
        content: "Successfully Login!",
      });

      navigate("/", { replace: true, state: { loggedIn: true } });
    } catch (err) {
      alert(
        (err as any).response
          ? (err as any).response.data.message
          : "Login failed"
      );
    }
    
  };

  return (
    <>
      <Row>
        <Col
          xl={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          md={{ span: 20, offset: 2 }}
          sm={{ span: 22, offset: 1 }}
          style={{
            backgroundColor: "#EFF4FA",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", paddingBottom: "50px" }}>
            <img
              src={img1}
              alt=""
              width={385}
              height={514}
              style={{ marginBottom: "20px" }}
            />
            <div style={{ fontSize: "18px", padding: "0px 80px 20px 80px " }}>
              From cricket to volleyball and beyond, our skilled coaches pave
              your path to greatness. Embrace the opportunity to excel and
              evolve with our dedicated team guiding your journey.
            </div>
            <div style={{ fontSize: "18px" }}>
              <a href=""> Privacy And Policy </a>
            </div>
          </div>
        </Col>

        <Col
          xl={{ span: 12, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          md={{ span: 20, offset: 2 }}
          sm={{ span: 22, offset: 1 }}
          style={{ padding: "80px" }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
          >
            <div
              style={{
                fontSize: "28px",
                textAlign: "center",
                paddingBottom: "20px",
                color: "#0E458E",
              }}
            >
              Unlock Your True Capabilities By Signing In To Access Our
              World-Class Coaching.
            </div>
            <Form.Item
              name="username"
              label="User Name"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                // prefix={<UserOutlined className="site-form-item-icon" />}
                style={commonInputStyle}
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                style={commonInputStyle}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="login-form-button"
                style={{
                  height: "40px",
                  width: "100%",
                  borderRadius: "0",
                  backgroundColor: "#2E5488",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <hr />
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                Don't have an account{" "}
                <Link to={"/signupPlayer"}>sign up here!</Link>
              </Form.Item>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};

export default Login;
