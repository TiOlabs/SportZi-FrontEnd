import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
// import axiosInstance from '../axiosInstance';
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ResendVerification = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log(email);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/resend-verification`,
        { email }
      );
      message.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      message.error("Failed to send verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "24px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          Send Verification Email
        </Title>
        <Form name="send_verification" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResendVerification;
