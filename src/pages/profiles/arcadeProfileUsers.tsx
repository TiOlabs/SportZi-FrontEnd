import {
  ExclamationCircleTwoTone,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import {
  Col,
  List,
  Row,
  Typography,
  Image,
  Button,
  Modal,
  Form,
  Select,
  Flex,
  Rate,
  message,
  Spin,
} from "antd";
import { Grid } from "antd";

import backgroundImg from "../../assents/background2.png";

import profilePic from "../../assents/pro.png";
import CoachCard from "../../components/CoachCard";
import AddPhotoButton from "../../components/addPhotoButton";
import PhotoCollage from "../../components/photoCollage";
import ArcadeZoneCard from "../../components/ArcadeZoneCard";
import AddZone from "../../components/AddZone";
import ArcadePackages from "../../components/ArcadePackages";
import AddPackage from "../../components/AddPackage";
import { useContext, useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import AppFooter from "../../components/footer";
import reviewBacground from "../../assents/ReviewBackground.png";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { Arcade, CoachAssignDetails, Package, Zone } from "../../types";
import axios from "axios";
import NavbarProfile from "../../components/NavBarProfile";
import NavbarLogin from "../../components/NavBarLogin";
import { PlayerContext } from "../../context/player.context";
import { CoachContext } from "../../context/coach.context";
import { ArcadeContext } from "../../context/Arcade.context";
import ArcadeZoneCardUserView from "../../components/arcadeZoneCard(UserView)";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import CoachApplyForm from "../../components/coachApplyForArcade";
import ArcadePackageUserView from "../../components/arcadePackageUserView";
import TextArea from "antd/es/input/TextArea";
import PhotoCollageForUsers from "../../components/photoCollageForUsers";
import PhotoCollageForArcadeUsers from "../../components/photoCollageForArcadeUserViee";
import { ArcadeFeedback } from "../../types";
import { UserContext } from "../../context/userContext";
import React from "react";

const ArcadeProfileUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  const { ArcadeId } = useParams();
  console.log("ArcadeId", ArcadeId);
  const [arcadeDetails1, setArcadeDetails] = useState<any>(null);
  const [arcade, setArcade] = useState<Arcade>();

  const { userDetails } = useContext(UserContext);
  const { coachDetails } = useContext(CoachContext);
  const { managerDetails } = useContext(ArcadeContext);

  const [coachesInArcade, setCoachesInArcade] = useState<CoachAssignDetails[]>(
    []
  );
  const [isModalOpenForReport, setismodelopenForReport] = useState(false);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [arcadePackages, setArcadePackages] = useState<Arcade>();
  console.log("userDetails", userDetails);
  console.log("coachDetails", coachDetails);

  const [ismodelopen, setismodelopen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0.0);
  const [allFeedbacks, setAllFeedbacks] = useState<ArcadeFeedback[]>([]);
  const [averageRating, setAverageRating] = useState(0.0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0.0);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/api/auth/getarchadedetails", {
        params: {
          ArcadeId: ArcadeId,
        },
      })
      .then((res) => {
        setArcadeDetails(res.data);
        console.log("dataaaaaa", res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("daddds", err);
      });
  }, [ArcadeId]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getZoneDetailsForArcade/${ArcadeId}`
        );
        const data = await res.data;
        console.log(data);
        setArcade(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [ArcadeId]);

  console.log(arcade);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageDetails/${ArcadeId}`
        );
        const data = await res.data;
        console.log(data);
        setArcadePackages(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [ArcadeId]);

  console.log(arcadePackages);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getCoachApplyingDetailsById/${ArcadeId}`,
        {}
      )
      .then((res) => {
        const filteredData = res.data.filter(
          (item: { status: string }) => item.status === "success"
        );
        console.log("filteredData", filteredData);
        setCoachesInArcade(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ArcadeId]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/getarcadefeedbacks/${ArcadeId}`
        );
        // const fName = response.data[0].feedback.user.firstname;
        // console.log("Fname ----------------:",fName);
        const allFeedbackDetails = response.data;
        console.log("Feedback Data---------------:", allFeedbackDetails);
        setAllFeedbacks(allFeedbackDetails);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/getaverageratingbyarcadeId/${ArcadeId}`
        );
        console.log("response:", response.data);

        const averageRate = response.data.averageRating.averageRate;
        const totalFeedbacks = response.data.totalFeedbacks;
        // console.log("averageRating:::", averageRate);
        const roundedRating = Math.round(averageRate * 2) / 2;

        setAverageRating(roundedRating);
        setTotalFeedbacks(totalFeedbacks);

        // console.log("roundedRating", roundedRating);
        // console.log("totalFeedbacks", totalFeedbacks);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [ArcadeId]);

  console.log("arcade", arcade?.arcade_image);
  const [cloudName] = useState("dle0txcgt");

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const showModalForReport = () => {
    setismodelopenForReport(true);
  };

  const handleOkForReport = () => {
    setismodelopenForReport(false);
  };

  const handleCancelForReport = () => {
    setismodelopenForReport(false);
  };

  const handleFinishForReport = async () => {
    try {
      console.log("userDetails", userDetails);
      console.log("coachDetails", coachDetails);
      console.log("arcadeDetails", managerDetails);
      console.log(description, reason);
      let id;
      if (userDetails.id !== "") {
        id = userDetails.id;
      } else if (coachDetails.id !== "") {
        id = coachDetails.id;
      } else if (managerDetails.id !== "") {
        id = managerDetails.id;
      }
      console.log(id);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addreportarcade`,
        {
          reporter_user_id: id,
          victim_arcade_id: ArcadeId,
          report_reason: reason,
          description: description,
        }
      );
      console.log(res.data);
      message.info("Reported Successfully");
    } catch (e) {
      console.log(e);
    }
    setismodelopenForReport(false);
  };

  console.log("arcadeDetails1");

  const submitFeedback = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}api/addarcadefeedbacks/${ArcadeId}`,
        {
          comment,
          rating,
        }
      );
      console.log("Feedback data:", response.data);

      setComment("");
      setRating(0);
      // alert("feedback was submitted successfully");
      message.success("feedback submitted successfully");
      setismodelopen(false);
      // setAverageRating(response.data.averageRating); // Update average rating
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }
  };

  const showModal = () => {
    setismodelopen(true);
  };
  const handleOk = () => {
    setismodelopen(false);
  };
  const handleCancel = () => {
    setismodelopen(false);
  };

  const [sport, setSport] = useState<string[]>([]);
  useEffect(() => {
    if (arcade?.zone) {
      const sports = Array.from(
        new Set(
          arcade.zone.map((zoneItem) => zoneItem.sport.sport_name.toString())
        )
      );
      setSport(sports);
    }
  }, [arcadeDetails1]);
  console.log("sport", sport);
  console.log("arcade", arcade);
  console.log("arcadeDetails1", arcadeDetails1);
  return (
    <>
      {userDetails.id === "" ? <NavbarLogin /> : <NavbarProfile />}

      <Row>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={10}
          xl={10}
          style={{
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
              <AdvancedImage
                style={{ height: "300px", width: "300px" }}
                cldImg={
                  cld.image(arcade?.arcade_image.toString())
                  // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                  // .resize(Resize.scale().width(200).height(200))
                }
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
                  marginTop: "20px",
                  fontSize: lg ? "18px" : "14px",
                }}
              >
                {arcadeDetails1 && arcadeDetails1.distription}
              </Typography>
              <div
                style={{
                  marginTop: "30px",
                }}
              >
                {" "}
                <CoachApplyForm />
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#EFF4FA",
                    color: "#0E458E",
                    borderRadius: "3px",
                    fontFamily: "kanit",
                    borderColor: "#0E458E",
                    marginTop: "10px",
                    marginBottom: "45%",
                  }}
                  onClick={() => {
                    if (userDetails.id === "") {
                      message.error("Please Login First");
                    } else if (
                      userDetails.id === arcadeDetails1?.manager.user_id
                    ) {
                      message.error("You can't report your own arcade");
                    } else {
                      showModalForReport();
                    }
                  }}
                >
                  Report User
                </Button>
                <Modal
                  visible={isModalOpenForReport}
                  onCancel={handleCancelForReport}
                  okText="Report"
                  onOk={() => handleFinishForReport()}
                >
                  <Form
                    layout="vertical"
                    style={{ marginTop: "10%", margin: "2%" }}
                    onFinish={() => handleFinishForReport()}
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
            <Spin spinning={isLoading}>
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
                  {arcadeDetails1 && arcadeDetails1.arcade_name}
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
                  Manager : {arcadeDetails1?.manager.user.firstname}{" "}
                  {arcadeDetails1?.manager.user.lastname}
                </p>
                <p
                  style={{
                    margin: "0px",
                    color: "#000",
                    fontFamily: "kanit",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "300",
                    lineHeight: "normal",
                    width: "150px",
                  }}
                >
                  {arcadeDetails1?.address &&
                    arcadeDetails1?.address

                      .split(",")
                      .map(
                        (
                          line:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | null
                            | undefined,
                          index: React.Key | null | undefined
                        ) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        )
                      )}
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
                      {/* 5.0 */}
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
                          defaultValue={0}
                          value={averageRating}
                          style={{
                            scale: "0.7",
                            display: "flex",
                            flexDirection: "row",
                            color: "#0E458E",
                            fillOpacity: "0.8",
                            borderBlockEnd: "dashed",
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
                        {/* 120 Feedbacks */}({totalFeedbacks} Feedbacks)
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
                dataSource={sport}
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
                Payment Types
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
                dataSource={["Online payment"]}
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
              >
                <List.Item
                  style={{
                    position: "relative",
                    listStyle: "dotted",
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
                    <span
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      &#8226;
                    </span>
                    Open Time : {arcadeDetails1?.open_time}
                  </div>
                </List.Item>
                <List.Item
                  style={{
                    position: "relative",
                    listStyle: "dotted",
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
                    <span
                      style={{
                        fontSize: "30px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      &#8226;
                    </span>
                    Close Time : {arcadeDetails1?.close_time}
                  </div>
                </List.Item>
              </List>
            </Spin>
          </div>
        </Col>
      </Row>

      <Row
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(27, 93, 183, 0.07)",
          minHeight: "500px",
        }}
      >
        <Row
          style={{
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            marginTop: "40px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Typography
            style={{
              color: " #0E458E",
              fontSize: md ? "30px" : "20px",
              fontFamily: "Kanit",
              marginBottom: "30px",
            }}
          >
            Our Best Coaches
          </Typography>
        </Row>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Row
            style={{
              overflowX: "hidden",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "450px",
              overflowY: "scroll",
              flexWrap: "nowrap",
            }}
          >
            {coachesInArcade.map((coach: CoachAssignDetails) => (
              <Col
                lg={{ span: 5 }}
                md={{ span: 8 }}
                sm={{ span: 12 }}
                xs={{ span: 24 }}
                style={{
                  display: "flex",
                }}
              >
                <CoachCard
                  coachName={`${coach.coach.user.firstname} ${coach.coach.user.lastname}`}
                  coachImage={coach.coach.user.user_image}
                  short_description={coach.description}
                  date={coach.assigned_date}
                  rate={coach.coach.rate}
                  sport={coach.coach.sport.sport_name}
                  role={userDetails.role}
                  coach_id={coach.coach_id}
                />
              </Col>
            ))}
          </Row>
        </div>
        <Button
          style={{
            color: "#1B5DB7",
            background: "none",
            border: "none",
            fontFamily: "Kanit",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          See More
        </Button>
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

      <PhotoCollageForArcadeUsers />

      <Row
        style={{
          paddingTop: "100px",
          marginTop: "100px",
          width: "100%",
          background: "rgba(27, 93, 183, 0.07)",
          minHeight: "600px",
        }}
      >
        <Row
          style={{
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              color: " #0E458E",
              fontSize: md ? "30px" : "20px",
              fontFamily: "Kanit",
            }}
          >
            Book Our Zones
          </Typography>
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "60px",
            }}
          ></div>
        </Row>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {arcade?.zone.map((zone: Zone) => (
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {" "}
              <ArcadeZoneCardUserView
                zoneName={zone.zone_name}
                rate={zone.rate}
                zoneImage={zone.zone_image}
                description={zone.description}
                id={zone.zone_id}
                capacity={zone.capacity}
                open_time={zone.open_time}
                close_time={zone.close_time}
                way_of_booking={zone.way_of_booking}
                sport={zone.sport.sport_name}
                sport_id={zone.sport.sport_id}
              />
            </Col>
          ))}
          <Col
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
            xs={24}
          >
            <Button
              style={{
                color: "#1B5DB7",
                background: "none",
                border: "none",
                fontFamily: "Kanit",
                fontSize: "18px",
                marginBottom: "30px",
              }}
            >
              See More
            </Button>
          </Col>
        </Row>
      </Row>

      <Row
        style={{
          paddingTop: "100px",

          width: "100%",
          background: "white",
          minHeight: "600px",
        }}
      >
        <Row
          style={{
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              color: " #0E458E",
              fontSize: md ? "30px" : "20px",
              fontFamily: "Kanit",
            }}
          >
            Enroll To Our Packages
          </Typography>
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "60px",
            }}
          ></div>
        </Row>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {arcadePackages?.package.map((package1: Package) => (
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <ArcadePackageUserView
                packageName={package1.package_name}
                packageDescription={package1.description}
                ArcadeName={package1.arcade.arcade_name}
                rate={package1.rate_per_person}
                package_image={package1.package_image}
                package_id={package1.package_id}
                player_id={userDetails.id}
                zone_id={package1.zone_id}
                arcade_id={ArcadeId}
                coachPresentage={package1.percentageForCoach}
                zone_name={package1.zone.zone_name}
                day={package1.packageDayAndTime.map((item) => item.day)}
                time={package1.packageDayAndTime.map((item) => item.time)}
              />
            </Col>
          ))}

          <Col
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
            xs={24}
          >
            <Button
              style={{
                color: "#1B5DB7",
                background: "none",
                border: "none",
                fontFamily: "Kanit",
                fontSize: "18px",
                marginBottom: "30px",
              }}
            >
              See More
            </Button>
          </Col>
        </Row>
      </Row>

      {/* feedbacks */}

      <Row
        style={{
          minWidth: "100%",
          minHeight: "650px",
          height: "max-content",
          marginTop: "100px",
          backgroundImage: `url(${reviewBacground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "100px",
        }}
      >
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "5%",
            paddingBottom: "100px",
            // backgroundColor:"#453245"
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
              paddingBottom: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {allFeedbacks.map((feedback: any) =>
              feedback.feedback.feedbackComments.map((comment: any) => (
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3%",
                  }}
                  xl={6}
                  lg={8}
                  xs={24}
                  md={12}
                  key={feedback.feedback.feedbacks_id}
                >
                  <div
                    style={{
                      marginTop: "0vh",
                      marginRight: "10vh",
                      marginBottom: "10vh",
                    }}
                  >
                    <ReviewCard
                      key={comment.feedback_id}
                      image={feedback.feedback.user.user_image}
                      rate={feedback.rate}
                      userName={`${feedback.feedback.user.firstname} ${feedback.feedback.user.lastname}`}
                      comment={comment.comment}
                    />
                  </div>
                </Col>
              ))
            )}
          </Row>

          <Row>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
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
                onClick={() => {
                  if (userDetails.id === "") {
                    message.error("Please Login First");
                  } else {
                    showModal();
                  }
                }}
              >
                {" "}
                Give an Feedback
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
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
            onClick={submitFeedback}
          >
            Give Reveiw
          </Button>,
        ]}
      >
        <Flex vertical gap={32}>
          <Rate
            style={{
              display: "flex",
              flexDirection: "row",
              // color:"#0E458E",
              // borderBlock: "dashed #0E458E",
              opacity: "1",
            }}
            value={rating}
            onChange={(value) => setRating(value)}
          />
          <TextArea
            showCount
            maxLength={300}
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder="Write your feedback"
            style={{ height: 120, resize: "none", marginBottom: "20px" }}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default ArcadeProfileUser;
