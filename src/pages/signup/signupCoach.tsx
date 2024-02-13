import { Flex } from "antd";
import { Image } from "antd";
import { Col, Row } from "antd";
import "./signup.css";
// import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import { Link } from "react-router-dom";
import img1 from "./images/img1.png";


//form
const { Option } = Select;

//responsiveness
const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8 },
  // },
  wrapperCol: {
    xl: { span: 24 },
    lg: { span: 24 },
    md: { span: 24 },
    sm: { span: 16 },
  },
};

const agreebtnLayout = {
  wrapperCol: {
    xl: { span: 20, offset: 4 },
    lg: { span: 22, offset: 2 },
    md: { span: 24 },
    sm: { span: 24 },
  },
};

const buttonFormItemLayout = {
  wrapperCol: {
    xl: { span: 24, offset: 8 },
    lg: { span: 24, offset: 8 },
    md: { span: 24, offset: 8 },
    sm: { span: 24, offset: 0 },
  },
};

//css


const commonInputStyle = {
  backgroundColor: "#d2f0ef",
  height: "40px",
};

const commonLabelStyle = {
  color: "blue",
  fontSize: "16px",
};

const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select Date!" },
  ],
};

const validatePhoneNumber = (_: any, value: string) => {
  // Use a regular expression to validate the phone number format
  const phoneRegex = /^[0-9]{10}$/; // Adjust the regex based on your specific requirements

  if (phoneRegex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject("Invalid phone number");
};

// function starting
const SignupCoach = () => {
  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };

  const onFinish = async (values: any) => {
    try {
      // Send form data to backend endpoint
      const response = await fetch("http://localhost:5000/signupCoach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup success:", data);
        alert("Form submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal server error");
    }
  };

  const customFontStyle = {
    fontFamily: "'YourFontFamily', sans-serif", // Replace 'YourFontFamily' with the actual font name
  };

  const validatePassword = async (_: any, value: string) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    }
    return Promise.resolve();
  };

  return (
    <>
      <Row>
        <Col
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ padding: 50, backgroundColor: "#c6d0d3" }}
        >

          {/* left column */}
          <div style={{ textAlign: "center" }}>
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <Link to="/signupPlayer">
              <Button
                type="default"
                block
                className="animated-button"
                style={{ color: "#125485", fontFamily: "sans-serif",fontWeight:"bold" }}
              >
                I'm an Athlete
              </Button>
              </Link>

              {/* <Link to="/signupCoach"> */}
                <Button
                  type="default"
                  block
                  className="animated-button"
                  style={{ color: "#125485", fontFamily: "sans-serif",fontWeight:"bold" }}
                >
                  I'm a Coach
                </Button>
              {/* </Link> */}

              <Link to="/signupArcadeManager">
                <Button
                  type="default"
                  block
                  className="animated-button"
                  style={{ color: "#125485", fontFamily: "sans-serif",fontWeight:"bold" }}
                >
                  I'm an Arcade Manager
                </Button>
              </Link>
            </Flex>
          </div>

          {/* image */}
          <div
            style={{
              textAlign: "center",
              paddingTop: 50,
              paddingBottom: 50,
              width: "100%",
            }}
          >
            <Image
              width={400}
              // src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
              src={img1}
            />
          </div>

          {/* description */}
          <Col span={20} offset={2}>
            <div
              style={{
                textAlign: "center",
                width: "100%",
                fontFamily: "'Open Sans', serif",
                fontWeight: "bold",
              }}
            >
              Maximize your athletic journey – sign up now! Join our vibrant
              community, access a platform tailored for athletes. Whether you're
              a seasoned pro or just starting, our easy sign-up connects you
              with opportunities to showcase your skills, connect with mentors,
              and thrive in your athletic pursuits. Don't miss your chance to
              make a lasting impact – sign up today for an exhilarating athletic
              adventure!
            </div>
          </Col>
        </Col>




        {/* right column */}
        <Col sm={24} md={24} lg={12} xl={12} style={{ padding: 50 }}>
          {/* form */}
          <div
            style={{
              padding: 50,
              // paddingLeft: 0,
              // border: "2px solid #000",
              // borderRadius: "10px",
            }}
          >
            <Form
              {...formItemLayout}
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "94",
              }}
              style={{ maxWidth: "100%" }}
              scrollToFirstError
              colon={false}
            >
              <Col span={18} offset={3}>
                <div
                  style={{
                    textAlign: "center",
                    paddingBottom: 20,
                    fontFamily: "'Open Sans', serif",
                    fontSize: 20,
                    color: "#125485",
                  }}
                >
                  <h3>
                    Join Us and Unleash Your Potential with Our Expert Coaches
                  </h3>
                </div>
              </Col>

              {/* name */}
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname",
                    whitespace: true,
                  },
                ]}
                style={{ ...commonLabelStyle }}
              >
                <Input
                  placeholder="Enter your first name"
                  style={commonInputStyle}
                />
              </Form.Item>

              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  style={commonInputStyle}
                />
              </Form.Item>

              {/* email */}
              <Form.Item
                name="email"
                label="E-mail"
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
                  placeholder="Enter your email"
                  style={commonInputStyle}
                />
              </Form.Item>

              {/* password */}
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { validator: validatePassword },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter a new password"
                  style={commonInputStyle}
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  style={commonInputStyle}
                />
              </Form.Item>

              {/* phone number */}
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    // required: true,
                    // message: "Please input your phone number!",
                  },
                  {
                    required: true,
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your contact number"
                  style={commonInputStyle}
                />
              </Form.Item>

              {/* DOB */}
              <Form.Item name="dob" label="DOB" {...config}>
                <DatePicker style={commonInputStyle} />
              </Form.Item>

              {/* gender */}
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select
                  placeholder="select your gender"
                  style={{
                    ...commonInputStyle,
                    border: "1px solid #ccc",
                    padding: "4px",
                    backgroundColor: "#d2f0ef"
                  }}
                >
                  <Option
                    value="male"
                    style={{ ...commonInputStyle, border: "1px solid #ccc" }}
                  >
                    Male
                  </Option>
                  <Option
                    value="female"
                    style={{ ...commonInputStyle, border: "1px solid #ccc" }}
                  >
                    Female
                  </Option>
                </Select>
              </Form.Item>


                {/* sport */}
              <Form.Item
                name="sport"
                label="Sport"
                rules={[
                  {
                    required: true,
                    message: "Enter your sport",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter your sport" style={commonInputStyle}/>
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...agreebtnLayout}
              >
                <Checkbox>
                  I agree to the <a href="">Terms and Conditions</a> and
                  <a href=""> Privacy Policy</a>
                </Checkbox>
              </Form.Item>

              <Form.Item {...buttonFormItemLayout}>
                <Button htmlType="submit" className="animated-button">
                  Sign Up
                </Button>
              </Form.Item>

              <Form.Item {...buttonFormItemLayout}>
                <div style={{}}>
                  Already have an account <a href="">Sign in here</a>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SignupCoach;
