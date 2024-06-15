import { Col, Row, Button, Modal, Form, message, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Admin } from "../../../types";

const agreebtnLayout = {
  wrapperCol: {
    xl: { span: 20, offset: 4 },
    lg: { span: 22, offset: 2 },
    md: { span: 24 },
    sm: { span: 24 },
  },
};

const SignUpAdmin = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const handleFinish = async () => {
    const generatedPassword = generatePassword();
    console.log(generatedPassword);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addAdmin`,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone_number: phone,
          password: generatedPassword,
        }
      );
      message.success("Added Successfully!");
      console.log(res);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
    setIsModalOpen(false);
  };

  const validateName = (_: any, value: string) => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!value || nameRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid name");
  };

  const validatePhoneNumber = (_: any, value: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Invalid phone number");
  };

  const validatePassword = async (_: any, value: string) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getadmin`
        );
        console.log(res);
        setAdminData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const showDetailsModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFirstname(admin.user.firstname as string);
    setLastname(admin.user.lastname as string);
    setEmail(admin.user.email as string);
    setPhone(admin.user.phone[0].phone_number as string);
    setIsShowDetailsModal(true);
  };

  const handleUpdateWithoutPassword = async () => {
    const updatedData = {
      firstname,
      lastname,
      email,
      phone,
      password: "",
    };
    console.log(updatedData);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/updateadmin/${selectedAdmin?.admin_id}`,
        updatedData
      );
      message.success("Updated Successfully!");
      setIsShowDetailsModal(false);
      // Refresh admin data
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getadmin`
      );
      setAdminData(res.data);
    } catch (e) {
      message.error("Failed to update admin details!");
      console.log(e);
    }
  };

  const handleUpdate = async () => {
    console.log(newPassword);
    const updatedData = {
      firstname,
      lastname,
      email,
      phone,
      password: newPassword,
      currentPassword:currentPassword // Add the 'password' property with an initial value
    };
    if (newPassword && newPassword === confirmPassword) {
      updatedData["password"] = newPassword;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/updateadmin/${selectedAdmin?.admin_id}`,
        updatedData
      );
      message.success("Updated Successfully!");
      setIsShowDetailsModal(false);
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Refresh admin data
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getadmin`
      );
      setAdminData(res.data);
    } catch (e) {
      message.error("Invalid username or password!");
      console.log(e);
    }
  };

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Admin - DashBoard</h2>
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
          marginTop: "30px",
        }}
      >
        <Col span={21}></Col>
        <Col span={3}>
          <Button
            onClick={showModal}
            style={{
              backgroundColor: "#EFF4FA",
              color: "#0E458E",
              borderRadius: "3px",
              fontFamily: "kanit",
              borderColor: "#0E458E",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            add +
          </Button>
        </Col>
      </Row>

      {adminData.map((admin) => (
        <Row
          key={admin.admin_id as string}
          style={{
            backgroundColor: "white",
            padding: "1%",
            marginTop: "50px",
          }}
        >
          <Col></Col>
          <Col span={6} style={{}}>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                textAlign: "center",
                height: "80px",
                fontSize: "16px",
              }}
            >
              {admin.user.firstname} {admin.user.lastname}
            </div>
          </Col>

          <Col span={6} style={{}}>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                textAlign: "center",
                height: "80px",
                fontSize: "16px",
              }}
            >
              {admin.user.email}
            </div>
          </Col>
          <Col span={6} style={{}}>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                textAlign: "center",
                height: "80px",
                fontSize: "16px",
              }}
            >
              {admin.user.phone[0].phone_number}
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
                style={{ width: "100px", backgroundColor: "#0E458E" }}
                onClick={() => showDetailsModal(admin)}
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
                  Details
                </div>
              </Button>
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
                  Remove
                </div>
              </Button>
            </div>
          </Col>
        </Row>
      ))}

      <Modal visible={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          layout="vertical"
          style={{ marginTop: "10%" }}
          onFinish={handleFinish}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "5%",
            }}
          >
            Admin SignUp Form
          </div>
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input firstname",
                whitespace: true,
              },
              {
                validator: validateName,
              },
            ]}
          >
            <Input
              placeholder="Enter first name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input lastname",
                whitespace: true,
              },
              {
                validator: validateName,
              },
            ]}
          >
            <Input
              placeholder="Enter last name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Item>

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
                message: "Please input E-mail!",
              },
            ]}
          >
            <Input
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
                validator: validatePhoneNumber,
              },
            ]}
          >
            <Input
              placeholder="Enter contact number"
              onChange={(e) => setPhone(e.target.value)}
            />
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
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={isShowDetailsModal}
        onCancel={() => setIsShowDetailsModal(false)}
        footer={null}
      >
        {selectedAdmin && (
          <Form layout="vertical">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
                marginBottom: "5%",
              }}
            >
              Admin Details
            </div>

            <Form.Item label="First Name">
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>

            {isChangingPassword ? (
              <>
                <Form.Item label="Current Password">
                  <Input.Password
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="New Password">
                  <Input.Password
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Confirm New Password">
                  <Input.Password
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Item>
                <Button type="primary" onClick={handleUpdate}>
                  Update
                </Button>
                <Button onClick={() => setIsChangingPassword(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleUpdateWithoutPassword}>Update</Button>
                <Button onClick={() => setIsChangingPassword(true)}>
                  Change Password
                </Button>
              </>
            )}
          </Form>
        )}
      </Modal>
    </Col>
  );
};

export default SignUpAdmin;