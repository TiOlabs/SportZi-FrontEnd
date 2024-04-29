import { StarFilled, StarTwoTone } from "@ant-design/icons";
import { Col, List, Row, Typography, Image, Button } from "antd";
import { Grid } from "antd";

import backgroundImg from "../../assents/background2.png";
import profileBackground from "../../assents/profileBackground.png";
import profilePic from "../../assents/pro.png";
import CoachCard from "../../components/CoachCard";
import AddPhotoButton from "../../components/addPhotoButton";
import PhotoCollage from "../../components/photoCollage";
import ArcadeZoneCard from "../../components/ArcadeZoneCard";
import AddZone from "../../components/AddZone";
import ArcadePackages from "../../components/ArcadePackages";
import AddPackage from "../../components/AddPackage";
import { useEffect, useState } from "react";
import AvailableBookingsArcade from "../../components/AvailableBookingsArcade";
import CoachReqestForArcade from "../../components/CoachReqestForArcade";
import ReviewCard from "../../components/ReviewCard";
import AppFooter from "../../components/footer";
import reviewBacground from "../../assents/ReviewBackground.png";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import React from "react";

const ArcadeProfileArcade = () => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();
  const [showMore, setShowMore] = useState(true);
  const [numberOfItemsShown, setNumberOfItemsShown] = useState(4);
  const AvailableBookings = [
    <AvailableBookingsArcade />,
    <AvailableBookingsArcade />,
    <AvailableBookingsArcade />,
    <AvailableBookingsArcade />,
    <AvailableBookingsArcade />,
    <AvailableBookingsArcade />,
    <AvailableBookingsArcade />,
  ];

  const CoachReqestToArchade = [
    <CoachReqestForArcade />,
    <CoachReqestForArcade />,
    <CoachReqestForArcade />,
    <CoachReqestForArcade />,
  ];

  const toggleItems = () => {
    setShowMore(!showMore);
    if (showMore) {
      setNumberOfItemsShown(AvailableBookings.length); // Show all items
    } else {
      setNumberOfItemsShown(4); // Show only the first 5 items
    }
  };

  const { ArcadeId } = useParams();
  console.log("in the arcade", ArcadeId);

  const [arcadeDetails, setArcadeDetails] = useState<any>(null);

  useEffect(() => {
    axiosInstance
      .get("/api/auth/getarchadedetails", {
        params: {
          ArcadeId: ArcadeId,
        },
      })
      .then((res) => {
        console.log("aaaaaaaaaaaaaaaa", res.data);
        setArcadeDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
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
                  marginTop: "20px",
                  fontSize: lg ? "18px" : "14px",
                }}
              >
                {arcadeDetails && arcadeDetails.distription}
              </Typography>
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
                {arcadeDetails && arcadeDetails.arcade_name}
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
                cricket, baseball,Swimming
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
                {arcadeDetails &&
                  arcadeDetails.address
                    .split(",")
                    .map((line: string, index: number) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
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
              Qulifications
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
              Payment Types Types
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
              dataSource={[
                "Cricket net for 30 MINS $100",
                "Cricket net for 30 MINS $100",
                "Cricket net for 30 MINS $100",
              ]}
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
              marginLeft: "5%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CoachCard />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CoachCard />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CoachCard />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 5 }}
              xl={{ span: 5 }}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CoachCard />
            </Col>
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
              marginBottom: "20px",
            }}
          >
            <AddZone />
          </div>
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
            <ArcadeZoneCard />
          </Col>
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
            <ArcadeZoneCard />
          </Col>
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
            <ArcadeZoneCard />
          </Col>
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
            Book Our Zones
          </Typography>
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <AddPackage />
          </div>
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
            <ArcadePackages />
          </Col>
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
            <ArcadePackages />
          </Col>
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
            <ArcadePackages />
          </Col>
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
          Availale bookings for suberb box complex
        </Typography>
      </Row>
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

        {AvailableBookings.slice(0, numberOfItemsShown).map(
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
        )}

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
          Coach Request For Join Arcade
        </Typography>
      </Row>

      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {CoachReqestToArchade.slice(0, numberOfItemsShown).map(
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
        )}

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
      </Row>

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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};

export default ArcadeProfileArcade;
