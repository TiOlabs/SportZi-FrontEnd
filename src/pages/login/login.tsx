import "../../styles/login.css";
import AppFooter from "../../components/footer";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  Modal,
  message as antMessage,
} from "antd";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
import img1 from "./images/img1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/login`,
        {
          email: email,
          password: password,
        }
      );

      Cookies.set("token", res.data.token, {
        expires: 1,
        httpOnly: false,
        secure: true,
      });
      message.success({
        type: "success",
        content: "Successfully Login!",
      });

      const user: any = jwtDecode(res.data.token);
      console.log(user.role);

      if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
        navigate("/admin", {
          replace: true,
          state: { loggedIn: true },
        });
        window.location.href = "/admin";
      } else {
        navigate("/", { replace: true, state: { loggedIn: true } });
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      message.error(
        (err as any).response
          ? (err as any).response.data.message
          : "Login failed"
      );
    }
  };

  //for forget password button
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/forgot-password`,
        { email: resetEmail }
      );
      antMessage.success("Password reset email sent successfully");
      setIsModalVisible(false);
    } catch (error: any) {
      console.log("Error sending password reset email::", error);
      antMessage.error("Something Error!");
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
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
              <Button
                onClick={showModal}
                style={{
                  border: "none",
                  fontSize: "14px",
                }}
              >
                Forgot password
              </Button>
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

      <Modal
        title="Reset Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Reset Password"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              placeholder="Enter the email"
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <AppFooter />
    </>
  );
};

export default Login;
