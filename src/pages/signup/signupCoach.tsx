import "../../styles/signup.css";

import { Flex } from "antd";
import { Image } from "antd";
import { Col, Row } from "antd";
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import { Link } from "react-router-dom";
import img1 from "./images/img1.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Moment } from "moment";
import axiosInstance from "../../axiosInstance";
import { Sport } from "../../types";

//responsiveness
const formItemLayout = {
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

const { Option } = Select;

// function starting
const SignupCoach = () => {
  const [form] = Form.useForm();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDateString, setSelectedDateString] = useState<string>("");
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [sportDetails, setSportDetails] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getSportDetails`
        );
        setSportDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSports();
  }, []);
  const onFinish = async () => {
    try {
      const response = await axiosInstance
        .post("/api/addcoach", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone_number: phone,
          DOB: selectedDateString,
          gender: gender,
          sport_id: sport,
        })
        .then((res) => {
          console.log(res);
          alert("Form submitted successfully!");
          form.resetFields();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const validateName = (_: any, value: string) => {
    const phoneRegex = /^[a-zA-Z]+$/;
    if (!value || phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid name");
  };

  const validatePassword = async (_: any, value: string) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = (_: any, value: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  };

  return (
    <>
      <Row className="signupContainer">
        {/* left column */}
        <Col
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ padding: 50, backgroundColor: "#c6d0d3" }}
        >
          <div style={{ textAlign: "center" }}>
            <Flex vertical gap="large" style={{ width: "100%" }}>
              <Link to="/signupPlayer">
                <Button
                  type="default"
                  block
                  className="animated-button kanit-regular"
                >
                  I'm an Athlete
                </Button>
              </Link>

              {/* <Link to="/signupCoach"> */}
              <Button
                type="default"
                block
                className="animated-button kanit-regular"
                style={{
                  backgroundColor: "#2E5488",
                  color: "#fff",
                }}
              >
                I'm a Coach
              </Button>
              {/* </Link> */}
              <Link to="/signupArcadeManager">
                <Button
                  type="default"
                  block
                  className="animated-button kanit-regular"
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
            <Image className="img1" src={img1} />
          </div>

          {/* description */}
          <Col span={20} offset={2}>
            <div
              className="kanit-regular"
              style={{
                fontSize: "16px",
                textAlign: "center",
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
              padding: 20,
            }}
          >
            <Form
              {...formItemLayout}
              method="POST"
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
              labelCol={{
                className: "custom-label",
              }}
            >
              <Col span={24}>
                <div
                  className="kanit-regular"
                  style={{
                    fontSize: "28px",
                    textAlign: "center",
                    paddingBottom: "20px",
                  }}
                >
                  Join Us and Unleash Your Potential with Our Expert Coaches
                </div>
              </Col>

              {/*first name field*/}
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname",
                    whitespace: true,
                  },
                  {
                    validator: validateName,
                  },
                ]}
                // style={{ ...commonLabelStyle }}
              >
                <Input
                  placeholder="Enter your first name"
                  style={commonInputStyle}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Item>

              {/* last name field */}
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname",
                    whitespace: true,
                  },
                  {
                    validator: validateName,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  style={commonInputStyle}
                  onChange={(e) => setLastname(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* phone number field*/}
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your contact number"
                  style={commonInputStyle}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>

              {/* birthday field */}
              <Form.Item
                name="DOB"
                label="DOB"
                rules={[
                  {
                    required: true,
                    message: "Please select the birth date!",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    ...commonInputStyle,
                  }}
                  onChange={(date: Moment | null) => {
                    if (date) {
                      const formattedDate = date.format("YYYY-MM-DD");
                      setSelectedDateString(formattedDate);
                    } else {
                      setSelectedDateString("");
                    }
                  }}
                />
              </Form.Item>

              {/* gender field */}
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select
                  placeholder="select your gender"
                  onChange={(value) => setGender(value)}
                  style={{
                    ...commonInputStyle,
                    border: "1px solid #ccc",
                    padding: "4px",
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
                <Select
                  placeholder="select your Sport"
                  onChange={(value) => setSport(value)}
                  style={{
                    ...commonInputStyle,
                    border: "1px solid #ccc",
                    padding: "4px",
                  }}
                >
                  {sportDetails.map((sport) => (
                    <Option
                      value={sport.sport_id}
                      style={{ ...commonInputStyle, border: "1px solid #ccc" }}
                    >
                      {sport.sport_name}
                    </Option>
                  ))}
                </Select>
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
                <Checkbox className="kanit-regular">
                  I agree to the <a href="">Terms and Conditions</a> and
                  <a href=""> Privacy Policy</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="animated-button kanit-regular"
                  style={{
                    height: "40px",
                    fontSize: "16px",
                    width: "100%",
                    backgroundColor: "#2E5488",
                    color: "#fff",
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>

              <Form.Item {...buttonFormItemLayout}>
                <div className="kanit-regular">
                  Already have an account{" "}
                  <Link to={"/login"}>
                    <a href="">Sign in here</a>{" "}
                  </Link>
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
