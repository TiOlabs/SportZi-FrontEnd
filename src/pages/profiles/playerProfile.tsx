import {
  Button,
  Col,
  Form,
  Row,
  List,
  Grid,
  Empty,
  ConfigProvider,
  Radio,
  RadioChangeEvent,
  Select,
  Input,
  Typography
} from "antd";
import backgroundImg from "../../assents/background2.png";
import profileBackground from "../../assents/profileBackground.png";
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import AddPhotoButton from "../../components/addPhotoButton";
import CoachRequstRow from "../../components/coachrequstrow";
import { useState, useContext, useEffect, SetStateAction } from "react";
import AvailableMetingstoPlayer from "../../components/AvailableMetingtoPlayer";
import PhotoCollage from "../../components/photoCollage";
import NavbarProfile from "../../components/NavBarProfile";
import axiosInstance from "../../axiosInstance";
import { PlayerContext } from "../../context/player.context";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import {
  CoachBookingDetails,
  PackageEnroolDetailsForPlayer,
  ZoneBookingDetails,
} from "../../types";
import PlayerEdit from "../../components/playerEdit";
import axios from "axios";
import AppFooter from "../../components/footer";
import NavbarLogin from "../../components/NavBarLogin";
import PackageEnrollmentDetailsInPlayerProfile from "../../components/packageEnrollDetailsInPlayerProfile";
import { Option } from "antd/es/mentions";
import Notification from "../../components/notification";
import { Divider} from 'antd';



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

const PlayerProfile = () => {
  const [value, setValue] = useState(1);
  const [value2, setValue2] = useState(4);
  const [playerBookingsData, setPlayerBookingsData] = useState([]);
  const [packageEnrollmentForPlayer, setPackageEnrollmentForPlayer] = useState<
    PackageEnroolDetailsForPlayer[]
  >([]);
  const [coachBookingData, setCoachBookingData] = useState<
    CoachBookingDetails[]
  >([]);
  const { userDetails } = useContext(PlayerContext);
  const [numberOfItemsShown, setNumberOfItemsShown] = useState(4);
  const [showMore, setShowMore] = useState(true);
  const [firstname, setFirstname] = useState(userDetails?.firstName);
  const [lastname, setLastname] = useState(userDetails?.lastName);
  const [discription, setDiscription] = useState(userDetails?.discription);
  const [achivements, setAchivements] = useState(userDetails?.achivements);
  const [user_image, setUser_image] = useState(userDetails?.user_image);
  const [loading, setLoading] = useState(false);
  // achivements gets to string and spilt them
  const AchivementsGetToArry = (achivements: string) => {
    if (achivements) {
      return achivements.split(",");
    }
    return [];
  };
  // see more buttons
  const [playerBookingsData1, setPlayerBookingsData1] = useState<
    ZoneBookingDetails[]
  >([]);
  console.log(playerBookingsData);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  console.log("userDetails", userDetails);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChangeArcadeBookings = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue2(e.target.value);
  };
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  console.log(userDetails.id);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `api/getarcadebooking/${userDetails?.id}`
      )
      .then((res) => {
        console.log(res.data);
        setPlayerBookingsData(res.data);
        console.log("value2", value2);
        setPlayerBookingsData((prev: any) => {
          console.log("value2", value2);
          if (value2 === 4) {
            return prev.filter(
              (playerBookingDetails: ZoneBookingDetails) =>
                playerBookingDetails.status === "success" &&
                playerBookingDetails.date >= formattedCurrentDate
            );
          } else if (value2 === 5) {
            return prev.filter(
              (playerBookingDetails: ZoneBookingDetails) =>
                playerBookingDetails.status === "success" &&
                playerBookingDetails.date < formattedCurrentDate
            );
          } else if (value2 === 6) {
            return prev.filter(
              (playerBookingDetails: ZoneBookingDetails) =>
                playerBookingDetails.status === "canceled_By_Player" ||
                playerBookingDetails.status === "canceled_By_Arcade" ||
                playerBookingDetails.status === "canceled_By_Coach"
            );
          }
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userDetails, value2]);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + `api/getPackageEnrollmentPlayerDetails`
      )
      .then((res) => {
        console.log(res.data);
        setPackageEnrollmentForPlayer(res.data);
        setPackageEnrollmentForPlayer((prev: any) => {
          return prev.filter(
            (playerEnrollDetails: PackageEnroolDetailsForPlayer) =>
              playerEnrollDetails.status === "success" &&
              playerEnrollDetails.player_id === userDetails?.id
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userDetails]);
  console.log("userDetails", userDetails);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + `api/getCoachBooking/${userDetails?.id}`
      )
      .then((res) => {
        console.log(res.data);
        setCoachBookingData(res.data);
        setCoachBookingData((prev: any) => {
          if (value === 1) {
            return prev.filter(
              (coachBookingData: CoachBookingDetails) =>
                coachBookingData.status === "success" &&
                coachBookingData.player_id === userDetails?.id &&
                coachBookingData.date >= formattedCurrentDate
            );
          } else if (value === 2) {
            return prev.filter(
              (coachBookingData: CoachBookingDetails) =>
                coachBookingData.status === "success" &&
                coachBookingData.player_id === userDetails?.id &&
                coachBookingData.date < formattedCurrentDate
            );
          } else if (value === 3) {
            return prev.filter(
              (coachBookingData: CoachBookingDetails) =>
                coachBookingData.status === "canceled_By_Player" ||
                coachBookingData.status === "canceled_By_Coach" ||
                coachBookingData.status === "canceled_By_Arcade"
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userDetails, value]);
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
  // getting player details from backend
  useEffect(() => {
    axiosInstance
      .get(`/api/auth/getplayerdetails/${userDetails?.id}`, {})
      .then((res) => {
        setFirstname(res.data.firstname);
        setLastname(res.data.lastname);
        setDiscription(res.data.Discription);
        setUser_image(res.data.user_image);
        const achiv = res.data.achivement;
        let achiveArr: string[] = [];
        achiv.map((item: any) => {
          achiveArr.push(item.achivement_details as string);
        });
        setAchivements(achiveArr.join(","));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetails]);


  const setZoneBookingDetails1 = (
    updatedData: SetStateAction<ZoneBookingDetails[]>
  ) => {
    setPlayerBookingsData1(updatedData);
  };
  const [filterBy, setFilterBy] = useState("date");
  const [filterValue, setFilterValue] = useState("");

  // const onChangeCoachBookings = (e: RadioChangeEvent) => {
  //   console.log("radio checked", e.target.value);
  //   setValue2(e.target.value);
  // };
  const handleFilterChange1 = (value: React.SetStateAction<string>) => {
    setFilterValue(value);
  };

  const filteredBookings = coachBookingData.filter((booking) => {
    if (filterBy === "coach_name") {
      const coachName =
        booking.coach.user.firstname + " " + booking.coach.user.lastname;
      return coachName.toLowerCase().includes(filterValue.toLowerCase());
    } else if (filterBy === "date") {
      return booking.date.includes(filterValue);
    } else if (filterBy === "venue") {
      return booking.arcade.arcade_name
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    } else if (filterBy === "booking_id") {
      return booking.booking_id.includes(filterValue);
    } else if (filterBy === "status") {
      return booking.status.includes(filterValue);
    }
    return true;
  });
  const filteredBookingsForArcade = playerBookingsData.filter(
    (booking: ZoneBookingDetails) => {
      if (filterBy === "zone_name") {
        const zoneName = booking.zone.zone_name;
        return zoneName.toLowerCase().includes(filterValue.toLowerCase());
      } else if (filterBy === "date") {
        return booking.date.includes(filterValue);
      } else if (filterBy === "time") {
        return booking.time.includes(filterValue);
      } else if (filterBy === "arcade_name") {
        return booking.zone.arcade.arcade_name
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      } else if (filterBy === "booking_id") {
        return booking.zone_booking_id.includes(filterValue);
      } else if (filterBy === "status") {
        return booking.status.includes(filterValue);
      } else if (filterBy === "rate") {
        return booking.full_amount.toString().includes(filterValue);
      }
      return true;
    }
  );
  return (
    <>
      {userDetails.id !== "" ? <NavbarProfile /> : <NavbarLogin />}

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
            marginTop: "8%",
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
            style={{ height: "300px", width: "300px" }}
            cldImg={
              cld.image(user_image)
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
                {" "}
                <Row>
                  <Col>
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
                  </Col>
                  <Col span={2}></Col>
                  <Col>
                    <h1>
                      <Notification userType="player" id={userDetails?.id} />
                    </h1>
                  </Col>
                </Row>
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
                ></p>
              </div>
              {/* edit button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                }}
              >
                <PlayerEdit
                  firstname={firstname}
                  setFirstname={setFirstname}
                  lastname={lastname}
                  setLastname={setLastname}
                  discription={discription}
                  setDiscription={setDiscription}
                  achivements={achivements}
                  setAchivements={setAchivements}
                  user_image={user_image}
                  setUser_image={setUser_image}
                />
              </div>
            </div>
            
            {/* <div
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
            </div> */}
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
          width:"100%",
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

            marginBottom: "2%",

          }}
        >
          Request for Coaching
        </p>

{/* ////////////////////////////////////////////////// */}
        <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",  // For wrapping in small viewports
        }}
      >
        {/* Available Radio Button */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-10%" : "5%",  // Margin to help with wrapping in smaller viewports
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
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

        {/* Completed Radio Button */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-10%" : "5%"  // Margin to help with wrapping in smaller viewports
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
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={2}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

        {/* Canceled Radio Button */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-10%" : "5%"// Margin to help with wrapping in smaller viewports
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorBorder: "#ad0508",
                colorPrimary: "#ad0508",
              },
            }}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={3}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

        {/* Spacer for larger screens */}
        <Col xs={0} sm={0} md={0} lg={16}></Col>
      </Row>

      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",  // For wrapping in small viewports
          marginTop: "2px", // Space between the two rows
        }}
      >
        {/* Available Label */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-5%" : "5%", // Margin to help with wrapping in smaller viewports
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#0E458E",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "16px",
              paddingBottom: "5px",
              marginBottom: "0px",
              display: "flex",
            }}
          >
            Available
          </Typography>
        </Col>

        {/* Completed Label */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-5%" : "5%",   // Margin to help with wrapping in smaller viewports
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#05a30a",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "16px",
              paddingBottom: "5px",
              marginBottom: "0px",
              display: "flex",
            }}
          >
            Completed
          </Typography>
        </Col>

        {/* Canceled Label */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-5%" : "5%",  // Margin to help with wrapping in smaller viewports
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#ad0508",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "16px",
              paddingBottom: "5px",
              display: "flex",
            }}
          >
            Canceled
          </Typography>
        </Col>

        {/* Spacer for larger screens */}
        <Col xs={0} sm={0} md={8} lg={8}></Col>

        {/* Filter Section */}
        <Col xs={24} sm={24} md={24} lg={8} 
        style={{ marginBottom: "2%", 
                 display: "flex", 
                 justifyContent: "center", 
                 alignItems: "center", 
                 flexDirection: "row", 
                 flexWrap: "wrap",
                 marginTop:"3%"}}>
          <Select
            defaultValue="date"
            style={{ width: "100%", maxWidth: "120px", height: "40px", marginLeft: "15px", marginBottom: "10px" }}
            onChange={(value) => setFilterBy(value)}
          >
            <Option value="date">Date</Option>
            <Option value="time">Time</Option>
            <Option value="coach_name">Coach Name</Option>
            <Option value="venue">Venue</Option>
            <Option value="booking_id">Booking ID</Option>
            <Option value="status">Status</Option>
          </Select>
          <Input
            placeholder="Enter filter value"
            style={{ width: "100%", maxWidth: "120px", marginLeft: "15px", marginBottom: "10px", height: "40px" }}
            onChange={(e) => handleFilterChange1(e.target.value)}
          />
          <Button
            style={{ width: "100%", maxWidth: "120px", height: "40px", marginLeft: "15px", marginBottom: "10px" }}
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



        {/* <Row

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
                token: {
                  colorBorder: "#05a30a",
                  colorPrimary: "#05a30a",
                },
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
                token: {
                  colorBorder: "#ad0508",
                  colorPrimary: "#ad0508",
                },
              }}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={3}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>

          <Col xs={0} sm={3} md={3} lg={17}></Col>
        </Row>


















        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}

        <Row

          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1%",
     
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
                
                display: "flex",
              }}
            >
              Canceled
            </Typography>
          </Col>
          <Col span={8}></Col>



          <Col span={8}>
            <Select
              defaultValue="date"
              style={{ width: 120, height: "40px",marginLeft: "10px"}}

          <Col span={8} style={{marginBottom:"5%"}}>
            <Select
              defaultValue="date"
              style={{ width: 120, height: "40px", marginLeft:"10px" }}

              onChange={(value) => setFilterBy(value)}
            >
              <Option value="date">Date</Option>
              <Option value="time">Time</Option>
              <Option value="coach_name">Coach Name</Option>
              <Option value="venue">Venue</Option>
              <Option value="booking_id">Booking ID</Option>
              <Option value="status">Status</Option>
            </Select>
            <Input
              placeholder="Enter filter value"
              style={{ width: 200, marginLeft: 10, height: "40px" }}
              onChange={(e) => handleFilterChange1(e.target.value)}
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

        </Row> */}


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
          >
            Venue
          </Col>
        </Row>



        <div
          style={{
            width: "100%",
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {filteredBookings && filteredBookings.length > 0 ? (
              filteredBookings.map((booking: CoachBookingDetails) => (
                <CoachRequstRow
                  key={booking.booking_id} // Make sure to provide a unique key
                  booking_id={booking.booking_id}
                  coach_image={booking.coach.user.user_image}
                  coach_name={
                    booking.coach.user.firstname +
                    " " +
                    booking.coach.user.lastname
                  }
                  booking_date={booking.date}
                  booking_time={booking.time}
                  venue={booking.arcade.arcade_name}
                  user_id={booking.player.user.user_id}
                  created_at={booking.created_at}
                  setZoneBookingDetails={setZoneBookingDetails1}
                  email={booking.coach.user.email}
                  role={booking.player.user.role}
                  player_name={
                    booking.player.user.firstname +
                    " " +
                    booking.player.user.lastname
                  }
                  zone_name={booking.zone.zone_name}
                  arcade_email={booking.arcade.arcade_email}
                  status={booking.status}
                  full_amount={booking.full_amount}
                  player_id={booking.player_id}
                  coach_id={booking.coach_id}
                  arcade_id={booking.arcade_id}
                />
              ))
            ) : (
              <Empty description="No Bookings Available" />
            )}
          </div>
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
            marginBottom: "2%",
          }}
        >
          Available Meetings For You
        </p>


        <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap", // Ensures wrapping on smaller screens
        }}
      >
        {/* Radio button section */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-10%" : "5%", // Added margin for better spacing on smaller screens
          }}
        >
          <ConfigProvider
            theme={{
              token: { colorBorder: "#0E458E", colorPrimary: "#0E458E" },
            }}
          >
            <Radio.Group onChange={onChangeArcadeBookings} value={value2}>
              <Radio value={4}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-10%" : "5%" // Added margin for better spacing on smaller screens
          }}
        >
          <ConfigProvider
            theme={{
              token: { colorBorder: "#05a30a", 
                       colorPrimary: "#05a30a" },
            }}
          >
            <Radio.Group onChange={onChangeArcadeBookings} value={value2}>
              <Radio value={5}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-10%" : "5%" // Added margin for better spacing on smaller screens
          }}
        >
          <ConfigProvider
            theme={{
              token: { colorBorder: "#ad0508", 
                colorPrimary: "#ad0508" },
            }}
          >
            <Radio.Group onChange={onChangeArcadeBookings} value={value2}>
              <Radio value={6}></Radio>
            </Radio.Group>
          </ConfigProvider>
        </Col>

   {/* Spacer for larger screens */}
   <Col xs={0} sm={0} md={0} lg={16}></Col>
      </Row>

      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap", // Ensures wrapping on smaller screens
          marginTop: "2px",  // Added margin for separation from the previous row
        }}
      >
        {/* Available Label */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-5%" : "5%",  // Added margin for better spacing on smaller screens
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#0E458E",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "16px",
              paddingBottom: "5px",
              marginBottom: "0px",
              display: "flex",
            }}
          >
            Available
          </Typography>
        </Col>

        {/* Completed Label */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-5%" : "5%", // Added margin for better spacing on smaller screens
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#05a30a",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "16px",
              paddingBottom: "5px",
              marginBottom: "0px",
              display: "flex",
            }}
          >
            Completed
          </Typography>
        </Col>

        {/* Canceled Label */}
        <Col
          xs={6} sm={6} md={6} lg={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: lg ?  "-5%" : "5%",// Added margin for better spacing on smaller screens
          }}
        >
          <Typography
            style={{
              alignItems: "center",
              color: "#ad0508",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "16px",
              paddingBottom: "5px",
              display: "flex",
            }}
          >
            Canceled
          </Typography>
        </Col>

        {/* Spacer for alignment */}
        <Col xs={0} sm={0} md={8} lg={8}></Col>


{/* Filter section */}
<Col
          xs={24} sm={24} md={24} lg={8}
          style={{
            marginBottom: "2%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexDirection: "row", 
            flexWrap: "wrap",
            marginTop:"3%" // Added top margin for separation from the radio buttons
          }}
        >
          <Select
            defaultValue="date"
            style={{ width: "100%", maxWidth: "120px", height: "40px", marginLeft: "15px", marginBottom: "10px"}}
            onChange={(value) => setFilterBy(value)}
          >
            <Option value="date">Date</Option>
            <Option value="time">Time</Option>
            <Option value="rate">Rate</Option>
            <Option value="zone_name">Zone Name</Option>
            <Option value="arcade_name">Arcade Name</Option>
            <Option value="status">Status</Option>
          </Select>
          <Input
            placeholder="Enter filter value"
            style={{ width: "100%", maxWidth: "120px", height: "40px",marginLeft: "15px", marginBottom: "10px"}}
            onChange={(e) => handleFilterChange1(e.target.value)}
          />
          <Button
            style={{ width: "100%", maxWidth: "120px", height: "40px", marginLeft: "15px", marginBottom: "10px" }}
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

        {/* <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap:"wrap",

          }}
        >
  
          <Col
           xs={6} sm={6} md={6} lg={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: lg? "-10%":"5%",
            }}
          >
            <ConfigProvider
              theme={{
                token: { colorBorder: "#0E458E", 
                        colorPrimary: "#0E458E"
                       },
              }}
            >
              <Radio.Group onChange={onChangeArcadeBookings} value={value2}>
                <Radio value={1}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>

          <Col
              xs={6} sm={6} md={6} lg={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: lg? "-10%":"5%",
            }}
          >
            <ConfigProvider
              theme={{
                token: { colorBorder: "#05a30a", 
                        colorPrimary: "#05a30a" },
              }}
            >
              <Radio.Group onChange={onChangeArcadeBookings} value={value2}>
                <Radio value={2}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>

          <Col
              xs={6} sm={6} md={6} lg={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: lg? "-10%":"5%",
            }}
          >
            <ConfigProvider
              theme={{
                token: { colorBorder: "#ad0508", 
                         colorPrimary: "#ad0508" },
              }}
            >
              <Radio.Group onChange={onChangeArcadeBookings} value={value2}>
                <Radio value={3}></Radio>
              </Radio.Group>
            </ConfigProvider>
          </Col>

        
         

          <Col span={8}>
            <Select
              defaultValue="date"
              style={{ width: 120, height: "40px",marginLeft:"10px" }}
              onChange={(value) => setFilterBy(value)}
            >
              <Option value="date">Date</Option>
              <Option value="time">Time</Option>
              <Option value="rate">Rate</Option>
              <Option value="zone_name">Zone Name</Option>
              <Option value="arcade_name">Arcade Name</Option>
              <Option value="status">Status</Option>
            </Select>
            <Input
              placeholder="Enter filter value"
              style={{ width: 200, marginLeft: 10, height: "40px" }}
              onChange={(e) => handleFilterChange1(e.target.value)}
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



        <Row gutter={{ xs: 8, sm: 16, md: 0, lg: 24 }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1%",
           
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

          <Col span={8}></Col>

          <Col span={8}>
            <Select
              defaultValue="date"
              style={{ width: 120, height: "40px" ,marginLeft: "10px"}}
              onChange={(value) => setFilterBy(value)}
            >
              <Option value="date">Date</Option>
              <Option value="time">Time</Option>
              <Option value="rate">Rate</Option>
              <Option value="zone_name">Zone Name</Option>
              <Option value="arcade_name">Arcade Name</Option>
              <Option value="status">Status</Option>
            </Select>
            <Input
              placeholder="Enter filter value"
              style={{ width: 200, marginLeft: 10, height: "40px" }}
              onChange={(e) => handleFilterChange1(e.target.value)}
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


          <Col span={16}></Col>
        </Row> 
 */}



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
        <div
          style={{
            width: "100%",
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {filteredBookingsForArcade &&
            filteredBookingsForArcade.length > 0 ? (
              // Sort the bookings by date and time in descending order
              filteredBookingsForArcade
                .sort((a: ZoneBookingDetails, b: ZoneBookingDetails) => {
                  const dateTimeA: Date = new Date(`${a.date}T${a.time}`);
                  const dateTimeB: Date = new Date(`${b.date}T${b.time}`);
                  return dateTimeB.getTime() - dateTimeA.getTime(); // For descending order
                })
                .map(
                  (booking: ZoneBookingDetails) =>
                    // Check if booking type is "zone"
                    booking.booking_type === "zone" ? (
                      <AvailableMetingstoPlayer
                        key={booking.zone_booking_id} // Make sure to provide a unique key
                        booking_id={booking.zone_booking_id}
                        zone_image={booking.zone.zone_image}
                        zone_name={booking.zone.zone_name}
                        booking_date={booking.date}
                        booking_time={booking.time}
                        venue={booking.zone.arcade.arcade_name}
                        setZoneBookingDetails={setZoneBookingDetails1}
                        email={booking.zone.arcade.arcade_email}
                        role="PLAYER"
                        player_name={
                          userDetails.firstName + " " + userDetails.lastName
                        }
                        status={booking.status}
                        full_amount={booking.full_amount}
                        user_id={booking.user.user_id}
                        arcade_id={booking.zone.arcade.arcade_id}
                      />
                    ) : null // Return null for bookings that are not of type "zone"
                )
            ) : (
              <Empty description="No Bookings Available" />
            )}
          </div>
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
          Package Enrollments
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
            Package
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
            Rate
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
            Duration
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
          {packageEnrollmentForPlayer &&
          packageEnrollmentForPlayer.length > 0 ? (
            packageEnrollmentForPlayer.map(
              (enroll: PackageEnroolDetailsForPlayer) => (
                // Check if booking type is "zone"

                <PackageEnrollmentDetailsInPlayerProfile
                  key={enroll.enrolled_date} // Make sure to provide a unique key
                  package_id={enroll.package_id}
                  package_image={enroll.package.package_image}
                  package_name={enroll.package.package_name}
                  enroll_date={enroll.enrolled_date}
                  venue={enroll.package.arcade.arcade_name}
                  rate={enroll.rate}
                  duration={enroll.duration}
                  zone_name={enroll.package.zone.zone_name}
                  player_id={userDetails.id}
                  // zone={enroll.package.}
                />
              )
            ) // Return null for bookings that are not of type "zone"
          ) : (
            <Empty description="You not Enroll to any Package" />
          )}
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
      <Row>
        <Col sm={24}xs={24} 
        style={{
        display:"flex",        
        justifyContent:"center",
        alignItems:"center",
        backgroundSize: "cover",
        width:200,
        marginRight: "10%",
     
        }}>
      <AppFooter />
      </Col>
      </Row>
    </>
  );
};

export default PlayerProfile;
