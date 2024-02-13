import React from "react";
import { Flex } from "antd";
import { Image } from "antd";
import { Col, Row } from "antd";
// import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select, DatePicker } from "antd";
import { Link } from "react-router-dom";

//form
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 24,
      offset: 0,
    },
    md: {
      span: 24,
      offset: 6,
    },
    lg: {
      span: 24,
      offset: 2,
    },
    xl: {
      span: 24,
      offset: 5,
    },
  },
};

const buttonFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 24,
      offset: 0,
    },
    md: {
      span: 24,
      offset: 8,
    },
    lg: {
      span: 24,
      offset: 8,
    },
    xl: {
      span: 24,
      offset: 8,
    },
  },
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





// function  starting
const SignupCoach = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row>
        <Col sm={24} md={24} lg={12} xl={12} style={{ padding: 50 }}>
          <div style={{ textAlign: "center" }}>
            <Flex vertical gap="small" style={{ width: "100%" }}>
            <Link to="/signupPlayer">
              <Button type="default" block className="animated-button">
                I'm an Athlete
              </Button>
              </Link>
              <Button type="default" block>
                I'm a Coach
              </Button>
              <Button type="default" block>
                I'm an Arcade Manager
              </Button>
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
              src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
            />
          </div>

          {/* description */}
          <div style={{ textAlign: "center", width: "100%" }}>
            Maximize your athletic journey – sign up now! Join our vibrant
            community, access a platform tailored for athletes. Whether you're a
            seasoned pro or just starting, our easy sign-up connects you with
            opportunities to showcase your skills, connect with mentors, and
            thrive in your athletic pursuits. Don't miss your chance to make a
            lasting impact – sign up today for an exhilarating athletic
            adventure!
          </div>
        </Col>

        <Col sm={24} md={24} lg={12} xl={12} style={{ padding: 50 }}>
          {/* form */}
          <div
            style={{
              padding: 50,
              paddingLeft: 0,
              // border: "2px solid #000",
              // borderRadius: "10px",
            }}
          >
            <div style={{ textAlign: "center", paddingBottom: 20 }}>
              <h3>
                Join Us and Unleash Your Potential with Our Expert Coaches
              </h3>
            </div>

            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "94",
              }}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >


              {/* name */}
              <Form.Item
                name="firstname"
                label="Firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                />
                
              </Form.Item>

              <Form.Item
                name="lastname"
                label="Lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter your last name"/>
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
                <Input placeholder="Enter your email"/>
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
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Enter a new password"/>
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
                <Input.Password placeholder="Confirm your password"/>
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
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <Input placeholder="Enter your contact number"/>
              </Form.Item>

              {/* DOB */}
              <Form.Item name="date-picker" label="DOB" {...config}>
                <DatePicker />
              </Form.Item>

              {/* gender */}
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
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
                <Input placeholder="Enter your sport"/>
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
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I agree to the <a href="">Terms and Conditions</a> and
                  <a href=""> Privacy Policy</a>
                </Checkbox>
              </Form.Item>

              <Form.Item {...buttonFormItemLayout}>
                <Button type="primary" htmlType="submit">
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
