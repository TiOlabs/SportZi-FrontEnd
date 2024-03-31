import { Button, Col, Modal, Row, Typography, Upload } from "antd";
import backgroundImg from "../../assents/background2.png";
import profileBackground from "../../assents/profileBackground.png";
import { PlusOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { List, Alert } from "antd";
import { Image } from "antd";
import AddPhotoButton from "../../components/addPhotoButton";
import CoachRequstRow from "../../components/coachrequstrow";
import { Grid } from "antd";
import { useState, useContext } from "react";
import AvailableMetingstoPlayer from "../../components/AvailableMetingtoPlayer";
import PhotoCollage from "../../components/photoCollage";
import NavbarProfile from "../../components/NavBarProfile";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { EditFilled } from "@ant-design/icons";
import { Drawer, Form, Input, Select, Space } from "antd";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
import TextArea from "antd/es/input/TextArea";
import axiosInstance from "../../axiosInstance";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { PlayerContext } from "../../context/player.context";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { User, ZoneBookingDetails } from "../../types";

//photo upload button
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const requestList = [
  <CoachRequstRow />,
  <CoachRequstRow />,
  <CoachRequstRow />,
  <CoachRequstRow />,
  <CoachRequstRow />,
  <CoachRequstRow />,
  <CoachRequstRow />,
  <CoachRequstRow />,
];

// interface PlayerData {
//   role?: string;
//   firstname?: string;
//   lastname?: string;
//   email?: string;
//   phoneNumbers?: { phone_number: string }[];

//   // add other properties as needed
// }
const PlayerProfile = () => {
  const { userDetails } = useContext(PlayerContext);
  const [numberOfItemsShown, setNumberOfItemsShown] = useState(4);
  const [showMore, setShowMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState(userDetails?.firstName);
  const [lastname, setLastname] = useState(userDetails?.lastName);
  const [email, setEmail] = useState(userDetails?.email);
  const [discription, setDiscription] = useState(userDetails?.discription);
  const [achivements, setAchivements] = useState(userDetails?.achivements);
  const [user_image, setUser_image] = useState(userDetails?.image);
  //the changing the user details then use effect is running
  useEffect(() => {
    setFirstname(userDetails?.firstName);
    setLastname(userDetails?.lastName);
    setEmail(userDetails?.email);
    setDiscription(userDetails?.discription);
    // setAchivements(userDetails?.achivements);
    setUser_image(userDetails?.image);
  }, [userDetails]);

  // achivements gets to string and spilt them
  const AchivementsGetToArry = (achivements: string) => {
    return achivements.split(",");
  };
  // drwer open close functions
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // see more buttons
  const [playerBookingsData, setPlayerBookingsData] = useState<
    ZoneBookingDetails[]
  >([]);
  console.log(playerBookingsData);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `api/getarcadebooking/${userDetails?.id}`
      )
      .then((res) => {
        console.log(res.data);
        setPlayerBookingsData(res.data);
       setPlayerBookingsData((prev: any) => {
          return prev.filter(
            (playerBookingDetails: ZoneBookingDetails) =>
               playerBookingDetails.status === "success"
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const toggleItems = () => {
    setShowMore(!showMore);
    if (showMore) {
      setNumberOfItemsShown(requestList.length); // Show all items
    } else {
      setNumberOfItemsShown(4); // Show only the first 5 items
    }
  };
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  const [playerData, setPlayerData] = useState<User | null>(null);
  const formItemLayout = {
    wrapperCol: {
      xl: { span: 24 },
      lg: { span: 24 },
      md: { span: 24 },
      sm: { span: 16 },
    },
  };
  // function to the edit profiles
  const onFinish = () => {
    try {
      axiosInstance
        .post("api/auth/updateplayerdetails", {
          firstname: firstname,
          lastname: lastname,
          discription: discription,
          achivements: achivements,
          image: user_image,
        })
        .then((res) => {
          console.log("inside then", res.data);

          setPlayerData(res.data);
        })
        .catch(() => {});
    } catch (error) {
      onClose();
    }
  };
  // getting player details from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getplayerdetails")
      .then((res) => {
        console.log(res.data);
        setPlayerData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const [form] = Form.useForm();

  //photo upload button properties
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancell = () => {
    setIsModalOpen(false);
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <NavbarProfile />
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
      </style>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={10}
          xl={10}
          style={{
            marginTop: "30px",
            backgroundImage: `url(${profileBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AdvancedImage
            style={{ height: "auto", width: "300px" }}
            cldImg={
              cld.image(userDetails?.image)
              // .resize(Resize.crop().width(200).height(200).gravity('auto'))
              // .resize(Resize.scale().width(200).height(200))
            }
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={14}
          xl={14}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "800px",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                }}
              >
                <h1
                  style={{
                    color: "#000",
                    fontSize: "32px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontFamily: "kanit",
                    lineHeight: "normal",
                    marginBottom: "0px",
                  }}
                >
                  {firstname} {lastname}
                </h1>
                <p
                  style={{
                    margin: "0px",
                    color: "#000",
                    fontFamily: "kanit",

                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  {firstname}
                </p>
              </div>
              {/* edit button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                }}
              >
                <Button
                  style={{
                    color: "#0E458E",
                    fontFamily: "kanit",
                    fontWeight: md ? "400" : "300",
                    fontSize: md ? "14px" : "12px",
                    borderRadius: "3px",

                    height: "30px",
                  }}
                  onClick={showDrawer}
                  icon={<EditFilled />}
                >
                  Edit
                </Button>
                <Drawer
                  title={
                    <>
                      <Typography
                        style={{
                          color: "#000",
                          fontFamily: "kanit",
                          fontSize: "20px",
                          fontStyle: "normal",
                          fontWeight: "500",
                        }}
                      >
                        Edit Your Profile
                      </Typography>
                    </>
                  }
                  width={500}
                  onClose={onClose}
                  open={open}
                  styles={{
                    body: {
                      paddingBottom: 80,
                    },
                  }}
                  extra={
                    <Space>
                      <Button
                        style={{
                          color: "#fff",
                          backgroundColor: "#0E458E",
                          fontFamily: "kanit",
                          fontWeight: md ? "400" : "300",
                          fontSize: md ? "14px" : "12px",
                          borderRadius: "3px",
                          height: "30px",
                        }}
                        onClick={onFinish}
                      >
                        Submit
                      </Button>
                    </Space>
                  }
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
                    {/* first name */}
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
                      style={{}}
                    >
                      <Input
                        placeholder="Enter your first name"
                        value={userDetails?.firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </Form.Item>
                    {/* last name */}
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
                        value={userDetails?.lastName}
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
                        value={userDetails?.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    {/* Discrption */}
                    <Form.Item
                      name="Discription"
                      label="Discription"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Discription",
                          whitespace: true,
                        },
                      ]}
                      style={{}}
                    >
                      <TextArea
                        value={userDetails?.discription}
                        onChange={(e) => setDiscription(e.target.value)}
                        placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 4 }}
                      />
                    </Form.Item>
                    {/* Achivements */}
                    <Form.Item
                      name="Achivements"
                      label="Achivements"
                      rules={[
                        {
                          required: true,
                          message:
                            "Input your Achivements Using Comma Seprated",
                          whitespace: true,
                        },
                      ]}
                      style={{}}
                    >
                      <Input
                        // value={}
                        placeholder="Input your Achivements Using Comma Seprated"
                        onChange={(e) => setAchivements(e.target.value)}
                      />
                    </Form.Item>
                    {/* photo upload */}
                    <Form.Item
                      name="Upload profile picture"
                      label="Upload profile picture"
                      rules={[
                        {
                          required: true,
                          message: "upload profile picture",
                          whitespace: true,
                        },
                      ]}
                      style={{}}
                    >
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>
                    </Form.Item>
                  </Form>
                </Drawer>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <p
                    style={{
                      color: "#0E458E",
                      fontFamily: "kanit",
                      fontSize: "39px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      margin: "0px",
                    }}
                  >
                    5.0
                  </p>
                </Col>

                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: "auto",
                      position: "relative",
                      width: "max-content",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <StarFilled style={{ color: "#0E458E" }} />
                      <StarFilled style={{ color: "#0E458E" }} />
                      <StarFilled style={{ color: "#0E458E" }} />
                      <StarTwoTone twoToneColor="#0E458E" />
                      <StarTwoTone twoToneColor="#0E458E" />
                    </div>
                    <p
                      style={{
                        color: "#000",
                        opacity: "0.64",
                        fontFamily: "kanit",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        margin: "0px",
                      }}
                    >
                      120 Feedbacks
                    </p>
                  </div>{" "}
                </Col>
              </Row>
            </div>
            <p
              style={{
                color: "#000",
                fontFamily: "kanit",
                opacity: ".96",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "300",
                lineHeight: "normal",
                marginTop: "0px",
              }}
            >
              {discription}
            </p>
            <p
              style={{
                color: "#000",
                fontFamily: "kanit",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginTop: "0px",
              }}
            >
              Sports
            </p>
            <List
              style={{
                padding: "0px",
                fontWeight: "200",
                color: "#000",
                fontFamily: "kanit",
                lineHeight: "0.5",
              }}
              itemLayout="horizontal"
              dataSource={["T20", "T20", "T20"]}
              renderItem={(item) => (
                <List.Item
                  style={{
                    position: "relative",

                    listStyle: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontFamily: "kanit",
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      &#8226;
                    </span>
                    {item}
                  </div>
                </List.Item>
              )}
            />

            <p
              style={{
                color: "#000",
                fontFamily: "kanit",

                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginTop: "0px",
              }}
            >
              Achivements
            </p>
            <List
              style={{
                padding: "0px",
                fontWeight: "200",
                color: "#000",
                fontFamily: "kanit",
                lineHeight: "0.4",
              }}
              itemLayout="horizontal"
              dataSource={AchivementsGetToArry(achivements)}
              renderItem={(item) => (
                <List.Item
                  style={{
                    position: "relative",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "kanit",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      &#8226;
                    </span>
                    {item}
                  </div>
                </List.Item>
              )}
            />
          </div>
          {/* <div>
            <Button
              style={{
                color: "#0E458E",
                fontFamily: "kanit",
                fontWeight: md ? "400" : "300",
                fontSize: md ? "14px" : "12px",
                borderRadius: "3px",

                height: "30px",
              }}
              onClick={showDrawer}
              icon={<EditFilled />}
            >
              Edit
            </Button>
            <Drawer
              title="Create a new account"
              width={500}
              onClose={onClose}
              open={open}
              styles={{
                body: {
                  paddingBottom: 80,
                },
              }}
              extra={
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={onClose} type="primary">
                    Submit
                  </Button>
                </Space>
              }
            ></Drawer>
          </div> */}
        </Col>
      </Row>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <p
          style={{
            alignItems: "center",
            color: "#0E458E",
            fontFamily: "kanit",
            fontWeight: "500",
            fontSize: "32px",
            paddingBottom: "10px",
            marginBottom: "0px",
          }}
        >
          Photos
        </p>
      </div>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <AddPhotoButton />
      </div>
      <PhotoCollage />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            marginTop: "50px",
            alignItems: "center",
            color: "#0E458E",
            fontFamily: "kanit",
            fontWeight: "500",
            fontSize: "32px",
            paddingBottom: "10px",
          }}
        >
          Requset for Coaching
        </p>
        <Row
          style={{
            borderRadius: "3px 3px 0px 0px",
            width: "90%",
            height: "97px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#EFF4FA",
            alignItems: "center",
          }}
        >
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Coach
          </Col>
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Date
          </Col>
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Time
          </Col>
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          ></Col>
        </Row>

        {requestList.slice(0, numberOfItemsShown).map((request, index) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            key={index}
          >
            {request}
          </div>
        ))}

        {showMore ? (
          <Button
            style={{
              alignItems: "center",
              color: "#062C60",
              fontFamily: "kanit",
              fontWeight: "500",
              fontSize: "18px",
            }}
            type="link"
            onClick={toggleItems}
          >
            See More
          </Button>
        ) : (
          <Button
            style={{
              alignItems: "center",
              color: "#062C60",
              fontFamily: "kanit",
              fontWeight: "500",
              fontSize: "18px",
            }}
            type="link"
            onClick={toggleItems}
          >
            See Less
          </Button>
        )}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            marginTop: "80px",
            alignItems: "center",
            color: "#0E458E",
            fontFamily: "kanit",
            fontWeight: "500",
            fontSize: "32px",
            paddingBottom: "10px",
          }}
        >
          Available Meetings For You
        </p>

        <Row
          style={{
            borderRadius: "3px 3px 0px 0px",
            width: "90%",
            height: "97px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#EFF4FA",
            alignItems: "center",
          }}
        >
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Zone
          </Col>
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Date
          </Col>
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={8}
            sm={8}
            md={8}
            lg={6}
            xl={6}
          >
            Time
          </Col>
          {lg && (
            <Col
              style={{
                color: "#000",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={8}
              sm={8}
              md={8}
              lg={6}
              xl={6}
            >
              Venue
            </Col>
          )}
        </Row>

        {/* {AvailableMeetingList.slice(0, numberOfItemsShown).map(
          (request, index) => (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
              {request}
            </div>
          )
        )} */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {playerBookingsData?.map((booking: ZoneBookingDetails) => (
            <AvailableMetingstoPlayer 
            booking_id={booking.zone_booking_id}
            zone_image={booking.zone.zone_image}
            zone_name={booking.zone.zone_name}
            booking_date={booking.date} 
            booking_time={booking.time}
            venue={booking.zone.arcade.arcade_name}/>
          ))}
        </div>

        {showMore ? (
          <Button
            style={{
              alignItems: "center",
              color: "#062C60",
              fontFamily: "kanit",
              fontWeight: "500",
              fontSize: "18px",
            }}
            type="link"
            onClick={toggleItems}
          >
            See More
          </Button>
        ) : (
          <Button
            style={{
              alignItems: "center",
              color: "#062C60",
              fontFamily: "kanit",
              fontWeight: "500",
              fontSize: "18px",
            }}
            type="link"
            onClick={toggleItems}
          >
            See Less
          </Button>
        )}
      </div>
    </>
  );
};

export default PlayerProfile;
