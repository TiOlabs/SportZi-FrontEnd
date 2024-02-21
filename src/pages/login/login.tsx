import "../../styles/login.css";
import AppFooter from "../../components/footer";
import { Form, Input, Row, Col, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import img1 from "./images/img1.png";
import { off } from "process";
import axios, { AxiosResponse } from "axios";

const commonInputStyle = {
  height: "40px",
};

const Login = () => {
  //   const onFinish = async (values: { username: string; password: string }) => {
  //     try {
  //       // Send login request to backend
  //       const response: AxiosResponse<{ token: string }> = await axios.post(
  //         "https://localhost:8000/api/login",
  //         values,
  //         {
  //           // Make sure to send over HTTPS
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       // Store token in local storage
  //       localStorage.setItem("token", response.data.token);
  //       alert("login successful!");

  //       // Redirect or perform any necessary action upon successful login
  //       // Example: Redirect to dashboard
  //       // history.push("/dashboard");
  //     } catch (error) {
  //       console.error("Login error:", error);
  //       alert("login Error!");
  //       // Handle login error
  //     }
  //   };

  

  

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
          {/* image */}
          <div style={{ textAlign: "center", paddingBottom: "50px" }}>
            <img
              src={img1}
              alt=""
              width={385}
              height={514}
              style={{ marginBottom: "20px" }} // Add some spacing between image and text
            />
            <div
              style={{
                fontSize: "18px",
                padding: "0px 80px 20px 80px ",
              }}
            >
              From cricket to volleyball and beyond, our skilled coaches pave
              your path to greatness. Embrace the opportunity to excel and
              evolve with our dedicated team guiding your journey.
            </div>

            <div
              style={{
                fontSize: "18px",
              }}
            >
              <a href=""> Privacy And Policy </a>
            </div>
          </div>
        </Col>

        {/* form */}
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
            // onFinish={onFinish}
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
                // prefix={<LockOutlined className="site-form-item-icon" />}
                style={commonInputStyle}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

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
                Don't have an account <a href="">sign up here!</a>
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
