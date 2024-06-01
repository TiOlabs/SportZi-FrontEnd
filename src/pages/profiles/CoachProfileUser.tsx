import {
  Button,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  List,
  Modal,
  Row,
  Select,
  Typography,
  Rate,
  ConfigProvider,
} from "antd";
import PhotoCollage from "../../components/photoCollage";
import {
  ExclamationCircleTwoTone,
  StarFilled,
  StarTwoTone,
  StarOutlined
} from "@ant-design/icons";
import profilePic from "../../assents/pro.png";
import backgroundImg from "../../assents/background2.png";
import profileBackground from "../../assents/profileBackground.png";

import { Image } from "antd";
import ReviewCard from "../../components/ReviewCard";
import reviewBacground from "../../assents/ReviewBackground.png";
import AppFooter from "../../components/footer";



interface FeedbackData {
  feedback: string;
  rating: number;
}

import { useContext, useEffect, useState } from "react";
import NavbarProfile from "../../components/NavBarProfile";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Coach, User } from "../../types";
import { UserContext } from "../../context/userContext";
import PhotoCollageForUsers from "../../components/photoCollageForUsers";

const CoachProfileUser = () => {
  const { useBreakpoint } = Grid;
  const { coachId } = useParams();
  console.log(coachId);
  const { lg, md, sm, xs } = useBreakpoint();
  const { TextArea } = Input;
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };
  const { userDetails } = useContext(UserContext);
  const [ismodelopen, setismodelopen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0.0);

  const [averageRating, setAverageRating] = useState(0.0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0.0);

  const coachId = "C00001"; // Replace with actual coach ID

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/getaverageratingbycoachId/${coachId}`
        );

        const { averageRating, totalFeedbacks } = response.data;
        console.log("averageRating:", averageRating);
        const roundedRating = Math.round(averageRating * 2) / 2;

        setAverageRating(roundedRating);
        setTotalFeedbacks(totalFeedbacks);

        // console.log("roundedRating", roundedRating);
        // console.log("totalFeedbacks", totalFeedbacks);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [coachId]);

  const [isModalOpenForReport, setismodelopenForReport] = useState(false);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");


  const showModal = () => {
    setismodelopen(true);
  };
  const handleOk = () => {
    setismodelopen(false);
  };
  const handleCancel = () => {
    setismodelopen(false);
  };
  const [coachDetails, setCoachDetails] = useState<Coach>();
  useEffect(() => {
    axiosInstance
      .get(`/api/auth/getcoachDetailsForUsers`, {
        params: {
          coachId: coachId,
        },
      })

      .then((res) => {
        setCoachDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [coachId]);

  const showModalForReport = () => {
    setismodelopenForReport(true);
  };
  const handleOkForReport = () => {
    setismodelopenForReport(false);
  };
  const handleCancelForReport = () => {
    setismodelopenForReport(false);
  };
  console.log("coachDetails", coachDetails);
  console.log("userDetails", userDetails);
  const handleFinishForReport = async () => {
    try {
      console.log("userDetails", userDetails);
      console.log(description, reason);
      let id;
      id = userDetails?.id;

      console.log(id);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addreport`,
        {
          reporter_user_id: id,
          victim_user_id: coachDetails?.coach_id,
          report_reason: reason,
          description: description,
        }
      );
      console.log(res.data);
      alert("Reported Successfully");
    } catch (e) {
      console.log(e);
    }
    setismodelopenForReport(false);

    const submitFeedback = async () => {
    try {
      const response = await axiosInstance.post("/api/addcoachfeedbacks", {
        comment,
        rating,
      });
      console.log("Feedback data:", response.data); 

      setComment("");
      setRating(0);
      alert("feedback was submitted successfully");
      // setAverageRating(response.data.averageRating); // Update average rating
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }

  };
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
      </style>
      <NavbarProfile />
      <Row>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={10}
          xl={10}
          style={{
            backgroundImage: `url(${profileBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "650px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
            >
              {" "}
              <Image
                width={300}
                src={profilePic}
                preview={{ src: profilePic }}
              />
            </Col>
          </Row>

          <Row
            style={{
              position: "relative",
              top: "60px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
            >
              <Typography
                style={{
                  color: "#000",
                  fontFamily: "kanit",
                  opacity: ".96",
                  width: "80%",
                  fontStyle: "normal",
                  fontWeight: "300",
                  lineHeight: "normal",
                  textAlign: "center",
                  marginBottom: "40px",

                  fontSize: lg ? "18px" : "14px",
                }}
              >
                {coachDetails?.short_desctiption}
              </Typography>
              <Button
                style={{
                  backgroundColor: "#5587CC",
                  fontFamily: "kanit",
                  color: "#fff",
                  borderRadius: "3px",
                }}
              >
                {" "}
                Request for Booking
              </Button>
              <div>
                <Button
                  style={{
                    backgroundColor: "#EFF4FA",
                    color: "#0E458E",
                    borderRadius: "3px",
                    fontFamily: "kanit",
                    borderColor: "#0E458E",
                    marginTop: "20px",
                  }}
                  onClick={showModalForReport}
                >
                  Report User
                </Button>
                <Modal
                  visible={isModalOpenForReport}
                  onCancel={handleCancelForReport}
                  okText="Report"
                  onOk={handleFinishForReport}
                >
                  <Form
                    layout="vertical"
                    style={{ marginTop: "10%", margin: "2%" }}
                    onFinish={handleFinishForReport}
                  >
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        color: "#5587CC",
                        height: "100px",
                      }}
                    >
                      <ExclamationCircleTwoTone width={1000} /> Repot User
                    </div>
                    <Form.Item
                      name="Chooose_Why"
                      label="Choose Reason"
                      rules={[
                        {
                          required: true,
                          message: "Please select a Reason!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Reson"
                        onChange={(value) => setReason(value)}
                      >
                        <Select.Option value="Fake Profile">
                          Fake Profile
                        </Select.Option>
                        <Select.Option value="Cheating">Cheating</Select.Option>
                        <Select.Option value="Misbehavior">
                          Misbehavior
                        </Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="Report_reason"
                      label="Tell Us More About Why"
                      rules={[
                        {
                          type: "string",
                          message: "Please enter a valid Reason!",
                        },
                      ]}
                    >
                      <TextArea
                        rows={5}
                        placeholder="Add a little more about why you are reporting this user"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </Col>
          </Row>
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
            <div>
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
                {coachDetails?.user.firstname} {coachDetails?.user.lastname}
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
                First class rugby coach
              </p>
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
                    {averageRating.toFixed(1)}
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
                      {/* <StarFilled style={{ color: "#0E458E" }} />
                      <StarFilled style={{ color: "#0E458E" }} />
                      <StarFilled style={{ color: "#0E458E" }} />
                      <StarTwoTone twoToneColor="#0E458E" />
                      <StarTwoTone twoToneColor="#0E458E" /> */}

                      <Rate
                        allowHalf
                        disabled
                        value={averageRating}
                        style={{
                          scale: "0.7",
                          display: "flex",
                          flexDirection: "row",
                          color:"#0E458E",
                          fillOpacity:"0.8",
                          borderBlockEnd:"dashed",
                        }}
                        
                      />
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
                      ({totalFeedbacks} Feedbacks)
                    </p>
                  </div>{" "}
                </Col>
              </Row>
            </div>

            <Typography
              style={{
                color: "#000",
                fontFamily: "kanit",

                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginTop: "0px",
                fontSize: lg ? "24px" : "18px",
              }}
            >
              Qlifications
            </Typography>

            <List
              style={{
                padding: "0px",
                fontWeight: "200",
                color: "#000",
                fontFamily: "kanit",
                lineHeight: "1",
              }}
              itemLayout="horizontal"
              dataSource={["school rugby captan 2001- 2008", "T20", "T20"]}
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

            <Typography
              style={{
                color: "#000",
                fontFamily: "kanit",

                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginTop: "0px",
                fontSize: lg ? "24px" : "18px",
              }}
            >
              Expertise
            </Typography>

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
            <Typography
              style={{
                color: "#000",
                fontFamily: "kanit",

                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginTop: "0px",
                fontSize: lg ? "24px" : "18px",
              }}
            >
              Session Types
            </Typography>
            <List
              style={{
                padding: "0px",
                fontWeight: "200",
                color: "#000",
                fontFamily: "kanit",
                lineHeight: "0.4",
              }}
              itemLayout="horizontal"
              dataSource={["Physical"]}
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
            <Typography
              style={{
                color: "#000",
                fontFamily: "kanit",

                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginTop: "0px",
                fontSize: lg ? "24px" : "18px",
              }}
            >
              Available Times
            </Typography>
            <List
              style={{
                padding: "0px",
                fontWeight: "200",
                color: "#000",
                fontFamily: "kanit",
                lineHeight: "0.4",
              }}
              itemLayout="horizontal"
              dataSource={["Full day in sunday", "saturday 8-16 pm"]}
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
        </Col>
      </Row>

      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <Typography
          style={{
            alignItems: "center",
            color: "#0E458E",
            fontFamily: "kanit",
            fontWeight: "500",
            fontSize: lg ? "32px" : "24px",
            paddingBottom: "10px",
            marginBottom: "0px",
          }}
        >
          {" "}
          Photos
        </Typography>
      </Row>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        {" "}
      </div>
      <PhotoCollageForUsers id={coachId} role={"COACH"} />

      {/* feedback */}
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {/* <Col
          span={24}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        > */}
        <Col
          span={21}
          style={{
            width: "100%",
            paddingBottom: "10px",
          }}
        >
          <TextArea
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder="Enter your feedback here"
            rows={4}
          />
        </Col>

        <Col
          span={24}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          <Rate 
          style={{
            display: "flex",
            flexDirection: "row",
            // color:"#0E458E",
            borderBlock:"dashed #0E458E",
            opacity:"1",
            
          }} 
          value={rating} onChange={(value) => setRating(value)}
          />
        </Col>
        <Col
          span={24}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="primary" onClick={submitFeedback}>
            Submit
          </Button>
        </Col>
        {/* </Col> */}
      </Row>

      <Row
        style={{
          width: "100%",
          minHeight: "650px",
          marginTop: "100px",
        }}
      >
        <Col
          style={{
            backgroundImage: `url(${reviewBacground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "650px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "20px",
          }}
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
        >
          <Typography
            style={{
              marginTop: "50px",
              fontFamily: "kanit",
              fontWeight: md ? "400" : "300",
              fontSize: md ? "32px" : "24px",
              color: "#0E458E",
            }}
          >
            Reviews
          </Typography>

          <Row
            style={{
              width: "100%",
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              <ReviewCard />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              {" "}
              <ReviewCard />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              {" "}
              <ReviewCard />
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
              minHeight: "300px",
              paddingBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              <ReviewCard />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              {" "}
              <ReviewCard />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              {" "}
              <ReviewCard />
            </Col>
          </Row>
          <Row>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "90%",
              }}
            >
              {" "}
              <Button
                style={{
                  backgroundColor: "#5587CC",
                  fontFamily: "kanit",
                  color: "#fff",
                  borderRadius: "3px",
                }}
                onClick={showModal}
              >
                {" "}
                Request for Booking
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: "50px" }}></Row>
      <AppFooter />

      <Modal
        title="Give feedback "
        open={ismodelopen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            style={{
              backgroundColor: "#fff",
              color: "#0E458E",
              border: "1px solid #0E458E",
              fontFamily: "kanit",
            }}
            key="back"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: "#5587CC",
              fontFamily: "kanit",
              color: "#fff",
              borderRadius: "3px",
            }}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Give Reveiw
          </Button>,
        ]}
      >
        <Flex vertical gap={32}>
          <TextArea
            showCount
            maxLength={60}
            onChange={onChange}
            placeholder="Write your feedback"
            style={{ height: 120, resize: "none", marginBottom: "20px" }}
          />
        </Flex>
      </Modal>
    </>
  );
};
export default CoachProfileUser;
