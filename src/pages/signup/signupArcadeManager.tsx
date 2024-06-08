import "../../styles/signup.css";

import { Flex } from "antd";
import { Image } from "antd";
import { Col, Row } from "antd";
import { Button, Checkbox, Form, Input, TimePicker, Select } from "antd";
import { Link } from "react-router-dom";
import img1 from "./images/img1.png";
import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import axiosInstance from "../../axiosInstance";
import MapForSignUpForm from "../../components/mapForSignUpForm";
import { useLocation } from "../../context/location.context";

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
const SignupArcadeManager: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [arcadename, setArcadeName] = useState("");
  const [arcadeemail, setArcadeEmail] = useState("");
  const [opentime, setOpentime] = useState<string>("");
  const [closetime, setClosetime] = useState<string>("");
  // const [selectedLocation, setSelectedLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // } | null>(() => {
  //   const storedLocation = localStorage.getItem("selectedLocation");
  //   return storedLocation ? JSON.parse(storedLocation) : null;
  // });
  const { selectedLocation } = useLocation();
  useEffect(() => {
    // Log the initial stored location when the component mounts
    const storedLocation = localStorage.getItem("selectedLocation");
    console.log("Initial storedLocation", storedLocation);
  }, []);

  useEffect(() => {
    // Log the selected location whenever it changes
    console.log("Updated selectedLocation", selectedLocation);
  }, [selectedLocation]);

  const handleOpenTime = (
    time: Dayjs | null,
    timeString: string | string[]
  ) => {
    if (typeof timeString === "string") {
      setOpentime(timeString);
    }
  };

  const handleCloseTime = (
    time: Dayjs | null,
    timeString: string | string[]
  ) => {
    if (typeof timeString === "string") {
      setClosetime(timeString);
    }
  };

  const [form] = Form.useForm();

  const onFinish = async () => {
    console.log("selectedLocation", selectedLocation);
    const location = selectedLocation ? JSON.stringify(selectedLocation) : "";
    try {
      const res = await axiosInstance
        .post("api/addarcadeManager", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone: phone,
          gender: gender,
          arcade_name: arcadename,
          arcade_email: arcadeemail,
          location: location,
          open_time: opentime,
          close_time: closetime,
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
    if (!value || phoneRegex.test(value)) {
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

              <Link to="/signupCoach">
                <Button
                  type="default"
                  block
                  className="animated-button kanit-regular"
                >
                  I'm a Coach
                </Button>
              </Link>
              {/* <Link to="/signupArcadeManager"> */}
              <Button
                type="default"
                block
                className="animated-button kanit-regular"
                style={{
                  backgroundColor: "#2E5488",
                  color: "#fff",
                }}
              >
                I'm an Arcade Manager
              </Button>
              {/* </Link> */}
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

              {/* phone number */}
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
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

              {/* arcade name */}
              <Form.Item
                name="arcadename"
                label="Arcade Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your arcade name",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Enter your arcade name"
                  style={commonInputStyle}
                  onChange={(e) => setArcadeName(e.target.value)}
                />
              </Form.Item>

              {/* arcade email */}
              <Form.Item
                name="arcadeemail"
                label="Arcade E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your Arcade E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your arcade email"
                  style={commonInputStyle}
                  onChange={(e) => setArcadeEmail(e.target.value)}
                />
              </Form.Item>

              {/* location */}
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    whitespace: true,
                  },
                ]}
              >
                <MapForSignUpForm />
              </Form.Item>

              <Form.Item
                name="opentime"
                label="Open Time"
                rules={[
                  {
                    required: true,
                    message: "Please select Open Time!",
                  },
                ]}
              >
                <TimePicker
                  style={commonInputStyle}
                  onChange={(time) => {
                    if (time) {
                      const formattedTime = time.format("HH:mm:ss");
                      setOpentime(formattedTime);
                    } else {
                      setOpentime("");
                    }
                  }}
                />
              </Form.Item>

              <Form.Item
                name="closetime"
                label="Closed Time"
                rules={[
                  {
                    required: true,
                    message: "Please select Close Time!",
                  },
                ]}
              >
                <TimePicker
                  style={commonInputStyle}
                  onChange={(time) => {
                    if (time) {
                      const formattedTime = time.format("HH:mm:ss");
                      setClosetime(formattedTime);
                    } else {
                      setClosetime("");
                    }
                  }}
                />
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

export default SignupArcadeManager;
