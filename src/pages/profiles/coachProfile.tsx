import { StarFilled, StarTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  ConfigProvider,
  Empty,
  Grid,
  Input,
  List,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Typography,
} from "antd";
import backgroundImg from "../../assents/background2.png";
import profileBackground from "../../assents/profileBackground.png";
import profilePic from "../../assents/pro.png";
import { Image } from "antd";
import PhotoCollage from "../../components/photoCollage";
import AddPhotoButton from "../../components/addPhotoButton";
import CoachAccepteLst from "../../components/CoachAcceptedList";
import { SetStateAction, useContext, useEffect, useState } from "react";
import CoachReqestList from "../../components/CoachRequestList";
import reviewBacground from "../../assents/ReviewBackground.png";
import ReviewCard from "../../components/ReviewCard";
import AppFooter from "../../components/footer";
import NavbarProfile from "../../components/NavBarProfile";
import axiosInstance from "../../axiosInstance";
import { CoachContext } from "../../context/coach.context";
import {
  Arcade,
  CoachAssignDetails,
  CoachBookingDetails,
  Zone,
} from "../../types";
import axios from "axios";
import { Option } from "antd/es/mentions";

const RequestedMeetings = [<CoachReqestList />];

const CoachProfile = () => {
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChange2 = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue2(e.target.value);
  };
  const [value, setValue] = useState(1);
  const [value2, setValue2] = useState(4);
  const [coachBookings, setCoachBookings] = useState<CoachBookingDetails[]>([]);
  const [coachAssignDetails, setCoachAssignDetails] = useState<
    CoachAssignDetails[]
  >([]);
  const { coachDetails } = useContext(CoachContext);
  console.log("coachDetails", coachDetails);
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [numberOfItemsShown, setNumberOfItemsShown] = useState(4);
  const [showMore, setShowMore] = useState(true);

  const [Details, setDetails] = useState<any>(null);
  console.log("coach detailsssss", coachDetails.id);
  const coachId = coachDetails?.id;
  useEffect(() => {
    axiosInstance
      .get(
        `${process.env.REACT_APP_API_URL}api/auth/getcoachDetailsForCoach/${coachId}`
      )
      .then((res) => {
        setDetails(res.data);
        console.log("responsedataaaa", res.data);
      })
      .catch((err) => {
        console.log("errorrrrrrrrrrrrrrrr", err);
      });
  }, [coachDetails?.id]);
  useEffect(() => {
    console.log("coach detailsssss", Details);
  }, [Details]);

  // useEffect(() => {
  //   axios
  //     .get<Arcade>(
  //       process.env.REACT_APP_API_URL +
  //         `api/getCoachBookingForCoach/${coachDetails?.id}`
  //     )
  //     .then((res) => {
  //       console.log("Response data:", res.data);

  //       // Get the current date in the format YYYY-MM-DD
  //       const currentDate = new Date();
  //       const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  //       // Filter bookings with status "success" and booking dates based on value
  //       const filteredBookings: CoachBookingDetails[] = (
  //         booking: CoachBookingDetails
  //       ) => {
  //         if (value === 1) {
  //           return (
  //             booking.status === "success" &&
  //             booking.date > formattedCurrentDate
  //           );
  //         } else if (value === 2) {
  //           return (
  //             booking.status === "success" &&
  //             booking.date < formattedCurrentDate
  //           );
  //         } else if (value === 3) {
  //           return booking.status === "canceled_By_Arcade";
  //         }
  //         return false;
  //       };

  //       setCoachBookings(filteredBookings);
  //       console.log("Filtered bookings:", filteredBookings);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [coachDetails, value]);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getcoachDetailsForCoachByCoachId/${coachDetails?.id}`
      )
      .then((res) => {
        console.log("Response data:", res.data);
        let filteredBookings = [];
        if (value === 1) {
          // Filter for status = "success"
          filteredBookings = res.data.filter(
            (booking: { status: string; date: string }) => {
              const bookingDate = new Date(booking.date);
              return booking.status === "success" && bookingDate > currentDate;
            }
          );
        } else if (value === 2) {
          // Filter for status = "success" and date < current date
          filteredBookings = res.data.filter(
            (booking: { status: string; date: string }) => {
              const bookingDate = new Date(booking.date);
              return booking.status === "success" && bookingDate < currentDate;
            }
          );
        } else if (value === 3) {
          // Filter for status = "canceled_By_Coach"
          filteredBookings = res.data.filter(
            (booking: { status: string; date: string }) => {
              const bookingDate = new Date(booking.date);
              return (
                booking.status === "canceled_By_Coach" &&
                bookingDate > currentDate
              );
            }
          );
        }
        setCoachBookings(filteredBookings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [coachDetails, value]);

  const toggleItems = () => {
    setShowMore(!showMore);
    if (showMore) {
      setNumberOfItemsShown(coachBookings.length); // Show all items
    } else {
      setNumberOfItemsShown(4); // Show only the first 5 items
    }
  };
  const acceptedMeetings = [<CoachAccepteLst />];

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getcoachassignvaluesById/${coachDetails?.id}`
        );
        const data = res.data;

        if (value2 === 4) {
          // Filter for status = "success"
          const successData = data.filter(
            (item: { status: string }) => item.status === "pending"
          );
          setCoachAssignDetails(successData);
        } else if (value2 === 5) {
          // Filter for status = "pending"
          const pendingData = data.filter(
            (item: { status: string }) => item.status === "success"
          );
          setCoachAssignDetails(pendingData);
        }

        console.log(data);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [coachDetails, value2]);

  const [filterBy, setFilterBy] = useState("date");
  const [filterValue, setFilterValue] = useState(""); // Assuming value is for Radio.Group

  const handleFilterChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setFilterValue(e.target.value);
  };

  const filteredBookings = coachBookings.filter((booking) => {
    if (filterBy === "player_name") {
      return booking.player.user.firstname
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    } else if (filterBy === "arcade_name") {
      return booking.arcade.arcade_name
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    } else if (filterBy === "date") {
      return booking.date.includes(filterValue);
    } else if (filterBy === "time") {
      return booking.time.includes(filterValue);
    } else if (filterBy === "rate") {
      return booking.rate && booking.rate.toString().includes(filterValue);
    } else if (filterBy === "booking_id") {
      return booking.booking_id.toString().includes(filterValue);
    }
    return true;
  });

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

                  fontSize: lg ? "18px" : "14px",
                }}
              >
                {Details?.Discription}
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
                  fontStyle: "capitalize",
                  fontWeight: "500",
                  fontFamily: "kanit",
                  lineHeight: "normal",
                  marginBottom: "0px",
                }}
              >
                {Details?.firstname} {Details?.lastname}
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
              dataSource={["T20", "Cricket", "T20"]}
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
              fontSize: "32px",
              paddingBottom: "10px",
              marginBottom: "0px",
            }}
          >
            Available Meetings For You
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
          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ConfigProvider
              theme={{
                token: { colorBorder: "#0E458E", colorPrimary: "#0E458E" },
              }}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>

          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ConfigProvider
              theme={{
                token: { colorBorder: "#05a30a", colorPrimary: "#05a30a" },
              }}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={2}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>
          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ConfigProvider
              theme={{
                token: { colorBorder: "#ad0508", colorPrimary: "#ad0508" },
              }}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={3}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Select
              defaultValue="date"
              style={{ width: 120, height: "40px" }}
              onChange={(value) => setFilterBy(value)}
            >
              <Option value="date">Date</Option>
              <Option value="time">Time</Option>
              <Option value="rate">Rate</Option>
              <Option value="player_name">Player Name</Option>
              <Option value="arcade_name">Arcade Name</Option>
              <Option value="booking_id">Booking ID</Option>
            </Select>
            <Input
              placeholder="Enter filter value"
              style={{ width: 200, marginLeft: 10, height: "40px" }}
              onChange={handleFilterChange}
            />
            <Button
              style={{ marginLeft: 10, height: "40px" }}
              ghost
              type="primary"
              onClick={() => {
                setFilterValue("");
                setFilterBy("date");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>

        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{
                alignItems: "center",
                color: "#0E458E",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "16px",
                paddingBottom: "10px",
                marginBottom: "0px",
                display: "flex",
              }}
            >
              Available
            </Typography>
          </Col>
          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{
                alignItems: "center",
                color: "#05a30a",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "16px",
                paddingBottom: "10px",
                marginBottom: "0px",
                display: "flex",
              }}
            >
              Completed
            </Typography>
          </Col>
          <Col
            span={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{
                alignItems: "center",
                color: "#ad0508",
                fontFamily: "kanit",
                fontWeight: "400",
                fontSize: "16px",
                paddingBottom: "10px",
                marginBottom: "0px",
                display: "flex",
              }}
            >
              Canceled
            </Typography>
          </Col>
          <Col span={16}></Col>
        </Row>

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
            Athlete
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
          >
            Venue
          </Col>
        </Row>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking: CoachBookingDetails) => (
            <CoachAccepteLst
              key={booking.booking_id} // Make sure to provide a unique key
              booking_id={booking.booking_id}
              booked_by={booking.player.user.firstname}
              image={booking.player.user.user_image}
              date={booking.date}
              time={booking.time}
              venue={` ${booking.zone.zone_name} / ${booking.arcade.arcade_name} `}
              coach_name={`${booking.coach.user.firstname} ${booking.coach.user.lastname}`}
              role="COACH"
              email={booking.player.user.email}
              arcade_email={booking.arcade.arcade_email}
              arcade_name={booking.arcade.arcade_name}
            />
          ))
        ) : (
          <Empty description="No Bookings Available" />
        )}

        {/* {showMore ? (
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
      )} */}
      </div>

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
          Requests For Coaching
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
        <Col
          span={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorBorder: "#0E458E",
                colorPrimary: "#0E458E",
              },
            }}
          >
            <Radio.Group onChange={onChange2} value={value2}>
              <Radio value={4}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

        <Col
          span={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorBorder: "#05a30a",
                colorPrimary: "#05a30a",
              },
            }}
          >
            <Radio.Group onChange={onChange2} value={value2}>
              <Radio value={5}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>
        <Col span={16}></Col>
      </Row>
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col
          span={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#0E458E",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: lg ? "16px" : "12px",
              paddingBottom: "10px",
              marginBottom: "0px",
              display: "flex",
            }}
          >
            Availiable
          </Typography>
        </Col>
        <Col
          span={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#05a30a",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: lg ? "16px" : "12px",
              paddingBottom: "10px",
              marginBottom: "0px",
              display: "flex",
            }}
          >
            Assigned
          </Typography>
        </Col>
        <Col span={16}></Col>
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
              fontSize: md ? "28px" : "20px",
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
            Arena
          </Col>
          <Col
            style={{
              color: "#000",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: md ? "28px" : "20px",
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
            ></Col>
          )}
          {sm && (
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
          )}
        </Row>
        {coachAssignDetails.length > 0 ? (
          coachAssignDetails.map((booking: CoachAssignDetails) => (
            <CoachReqestList
              coach_id={coachDetails?.id}
              arcade_id={booking.arcade_id}
              arcade={booking.arcade.arcade_name}
              image={booking.arcade.arcade_image}
              date={booking.assigned_date}
              time={booking.created_at}
              coach_name={coachDetails.firstName + " " + coachDetails.lastName}
              role="COACH"
              arcade_email={booking.arcade.arcade_email}
              arcade_name={booking.arcade.arcade_name}
            />
          ))
        ) : (
          <Empty />
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
        <AppFooter />
      </Row>
    </>
  );
};

export default CoachProfile;
