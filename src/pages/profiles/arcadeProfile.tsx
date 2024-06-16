import { StarFilled, StarTwoTone } from "@ant-design/icons";
import {
  Col,
  List,
  Row,
  Typography,
  Image,
  Button,
  ConfigProvider,
  Empty,
  Form,
  Input,
  Select,
  Rate,
} from "antd";
import { Grid, Radio } from "antd";
import backgroundImg from "../../assents/background2.png";
import profilePic from "../../assents/pro.png";
import CoachCard from "../../components/CoachCard";
import AddPhotoButton from "../../components/addPhotoButton";
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
import {
  Arcade,
  CoachAssignDetails,
  CoachBookingDetails,
  Package,
  PackageEnroolDetailsForPlayer,
  Zone,
  ZoneBookingDetails,
  PackageEnrollDetailsForCoach,
} from "../../types";
import axios from "axios";
import { useArcade } from "../../context/Arcade.context";
import { useArcadeEdit } from "../../context/ArcadeEdit.context";
import type { RadioChangeEvent } from "antd";
import PhotoCollageForArcade from "../../components/photoCollageForArcade";
import AvailableCoachBookingsArcade from "../../components/AvailableCoachBookingsArcade";
import NavbarProfile from "../../components/NavBarProfile";
import PhotoCollage from "../../components/photoCollage";
import PackageEnrollmentDetailsInArcadeProfile from "../../components/packageEnrollmentDetailsForArcadeProfile";
import { Option } from "antd/es/mentions";
import ArcadeEdit from "../../components/arcadeEdit";
import ArcadePackageCoachEnrollAccept from "../../components/arcadePackageCoachEnrollAccept";
import ReportGenarationForArcade from "../../components/reportGenarationForArcade";
import Notification from "../../components/notification";
import { ArcadeFeedback } from "../../types";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const ArcadeProfileArcade = () => {
  const [value, setValue] = useState(1);
  const [value2, setValue2] = useState(4);
  const [valueForCoachRequest, setValueForCoachRequest] = useState(10);
  const [packageDetail, setPackageDetail] = useState<Arcade>();
  const [packageEnrollmentForPlayer, setPackageEnrollmentForPlayer] = useState<
    PackageEnroolDetailsForPlayer[]
  >([]);
  const [packageEnrollmentForCoach, setPackageEnrollmentForCoach] = useState<
    PackageEnrollDetailsForCoach[]
  >([]);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChangeCoachBookings = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue2(e.target.value);
  };
  console.log("value", value);
  const { ArcadeId } = useParams();
  console.log("ArcadeId", ArcadeId);
  const { managerDetails } = useArcade();
  //const { arcadeEditDetails } = useArcadeEdit();
  const [arcade, setArcade] = useState<Arcade>();
  const [arcadeBookings, setArcadeBookings] = useState<Zone[]>([]);
  const [coachBookings, setCoachBookings] = useState<CoachBookingDetails[]>([]);
  const [coachAssignRequest, setCoachAssignRequest] = useState<
    CoachAssignDetails[]
  >([]);
  const [arcadeCoaches, setArcadeCoaches] = useState<CoachAssignDetails[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageEnrollmentCoachDetails`
        );
        const data = await res.data;
        console.log(data);
        setPackageEnrollmentForCoach(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
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
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageDetails/${ArcadeId}`
        );
        const data = await res.data;
        console.log(data);
        setPackageDetail(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    axios
      .get<Arcade>(
        process.env.REACT_APP_API_URL +
          `api/getarcadebookingForArcade/${ArcadeId}`
      )
      .then((res) => {
        console.log("Response data:", res.data);

        // Get the current date in the format YYYY-MM-DD
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split("T")[0];

        // Filter bookings with status "success" and booking dates based on value
        const filteredBookings: Zone[] = res.data.zone.reduce(
          (accumulator: Zone[], zone: Zone) => {
            console.log("Zone:", zone);
            const targetBookings = zone.zoneBookingDetails.filter((booking) => {
              if (value === 1) {
                return (
                  booking.status === "success" &&
                  booking.date > formattedCurrentDate &&
                  booking.booking_type === "zone"
                );
              } else if (value === 2) {
                return (
                  booking.status === "success" &&
                  booking.date < formattedCurrentDate &&
                  booking.booking_type === "zone"
                );
              } else if (value === 3) {
                return (
                  booking.status === "canceled_By_Arcade" ||
                  (booking.status === "canceled_By_Player" &&
                    booking.booking_type === "zone")
                );
              }
            });
            if (targetBookings.length > 0) {
              accumulator.push({
                ...zone,
                zoneBookingDetails: targetBookings,
              });
            }
            return accumulator;
          },
          []
        );

        setArcadeBookings(filteredBookings);
        console.log("Filtered bookings:", filteredBookings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ArcadeId, value]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getCoachBookingByArcadeId/${ArcadeId}`
      )
      .then((res) => {
        console.log("Response data:", res.data);

        // Get the current date in the format YYYY-MM-DD
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split("T")[0];
        console.log("Current date:", formattedCurrentDate);
        console.log(value2);
        // Filter bookings based on value2
        const filteredBookings = res.data.filter(
          (booking: { status: string; date: string }) => {
            if (value2 === 4) {
              return (
                booking.status === "success" &&
                booking.date > formattedCurrentDate
              );
            } else if (value2 === 5) {
              return (
                booking.status === "success" &&
                booking.date < formattedCurrentDate
              );
            } else if (value2 === 6) {
              return (
                booking.status === "canceled_By_Arcade" ||
                booking.status === "canceled_By_Player" ||
                booking.status === "canceled_By_Coach"
              );
            }
            return false;
          }
        );

        setCoachBookings(filteredBookings);
        console.log("Filtered bookings:", filteredBookings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ArcadeId, value2]);

  const handleFilterChange = (value: React.SetStateAction<string>) => {
    setFilterValue(value);
  };

  // const onChangeCoachBookings = (e) => {
  //   setCoachBookings([]);
  //   // Logic to change value2
  // };
  console.log("valueForCoachRequest", valueForCoachRequest);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getCoachApplyingDetailsById/${ArcadeId}`,
        {}
      )
      .then((res) => {
        // Filter data where status is "success"
        console.log("res.data", res.data);
        const filteredData = res.data.filter(
          (item: { status: string }) => item.status === "pending"
        );
        const filteredAssignedCoaches = res.data.filter(
          (item: { status: string }) => item.status === "success"
        );
        setArcadeCoaches(filteredAssignedCoaches);
        console.log("res.data", res.data);
        const filteredDataForCoachRequest = res.data.filter(
          (item: { status: string }) => {
            console.log("item", item);
            if (valueForCoachRequest === 10) {
              return item.status === "pending";
            } else if (valueForCoachRequest === 11) {
              return item.status === "success";
            } else if (valueForCoachRequest === 12) {
              return (
                item.status === "canceled_By_Arcade" ||
                item.status === "canceled_By_Coach"
              );
            }
            return false;
          }
        );
        console.log("filteredDataForCoachRequest", filteredDataForCoachRequest);
        setCoachAssignRequest(filteredDataForCoachRequest);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ArcadeId, valueForCoachRequest]);

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
              playerEnrollDetails.package.arcade_id === ArcadeId
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ArcadeId]);

  const { useBreakpoint } = Grid;
  const { lg, md } = useBreakpoint();
  const [showMore, setShowMore] = useState(true);
  const [numberOfItemsShown, setNumberOfItemsShown] = useState(4);
  const AvailableBookings = [
    (arcadeBookings || []).map((zone: Zone) =>
      (zone.zoneBookingDetails || []).map((booking: ZoneBookingDetails) => (
        <AvailableBookingsArcade
          booking_id={booking.zone_booking_id}
          booked_by={`${booking.user.firstname} ${booking.user.lastname}`}
          zoneName={zone.zone_name}
          time={booking.time}
          date={booking.date}
          rate={zone.rate}
          zoneImage={zone.zone_image}
          booking_type={booking.booking_type}
        />
      ))
    ),
  ];

  const CoachReqestToArchade = [
    (coachAssignRequest || []).map(
      (coachAssign: CoachAssignDetails) => (
        console.log("coachAssign", coachAssign),
        (
          <CoachReqestForArcade
            coach_id={coachAssign.coach_id}
            coach_Email={coachAssign.coach.user.email}
            coach_name={`${coachAssign.coach.user.firstname} ${coachAssign.coach.user.lastname}`}
            coach_image={coachAssign.coach.user.user_image}
            coach_discription={coachAssign.description}
            date={coachAssign.assigned_date}
            arcade_name={arcade?.arcade_name}
            description={coachAssign.description}
            duration={coachAssign.duration}
            sport={coachAssign.coach.sport.sport_name}
          />
        )
      )
    ),
  ];
  const CoachReqestToEnrollPackage = [
    (packageEnrollmentForCoach || []).map(
      (coachEnrollDetails: PackageEnrollDetailsForCoach) => (
        <ArcadePackageCoachEnrollAccept
          package_name={coachEnrollDetails.package.package_name}
          package_image={coachEnrollDetails.package.package_image}
          zone_name={coachEnrollDetails.package.zone.zone_name}
          rate={coachEnrollDetails.rate}
          duration={coachEnrollDetails.duration}
          enrolled_date={coachEnrollDetails.enrolled_date}
          arcade_name={arcade?.arcade_name}
          coach_name={`${coachEnrollDetails.coach.user.firstname} ${coachEnrollDetails.coach.user.lastname}`}
          coach_image={coachEnrollDetails.coach.user.user_image}
          coach_id={coachEnrollDetails.coach_id}
          package_id={coachEnrollDetails.package_id}
          email={coachEnrollDetails.coach.user.email}
          status={coachEnrollDetails.status}
        />
      )
    ),
  ];

  const toggleItems = () => {
    setShowMore(!showMore);
    if (showMore) {
      setNumberOfItemsShown(AvailableBookings.length); // Show all items
    } else {
      setNumberOfItemsShown(4); // Show only the first 5 items
    }
  };

  console.log("in the arcade", ArcadeId);

  const [arcadeDetails, setArcadeDetails] = useState<Arcade>();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/getarcadeDetails/${ArcadeId}`,
        {}
      )
      .then((res) => {
        console.log("arcadeDetails", res.data);
        setArcadeDetails(res.data);

        //  console.log("arcadeDetails", arcadeEditDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ArcadeId]);

  console.log("arcadeDetails", packageDetail);
  const [filterBy, setFilterBy] = useState("date");
  const [filterValue, setFilterValue] = useState("");
  const [filterValue2, setFilterValue2] = useState("");
  const [filterByPackage, setFilterByPackage] = useState("enroll_date");
  const [filterValuePackage, setFilterValuePackage] = useState("");

  // const handleFilterChange = (value: React.SetStateAction<string>) => {
  //   setFilterValue(value);
  // };

  const handleFilterChange2 = (value: React.SetStateAction<string>) => {
    setFilterValue2(value);
  };
  const handleFilterChangePackage = (value: any) => {
    setFilterValuePackage(value);
  };

  const filteredArcadeBookings = arcadeBookings.filter((zone) =>
    zone.zoneBookingDetails.some((booking) => {
      const { user, time, date, zone_booking_id } = booking;
      const { rate, zone_name } = zone;
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();

      switch (filterBy) {
        case "date":
          return date.includes(filterValue2);
        case "time":
          return time.includes(filterValue2);
        case "rate":
          return rate.toString().includes(filterValue2);
        case "zoneName":
          return zone_name.toLowerCase().includes(filterValue2.toLowerCase());
        case "booked_by":
          return fullName.includes(filterValue2.toLowerCase());
        case "booking_id":
          return zone_booking_id.includes(filterValue2);
        case "status":
          return booking.status.includes(filterValue2);
        default:
          return true;
      }
    })
  );

  // const filteredBookings = coachBookings.filter((zone) =>
  //   zone.zoneBookingDetails.some((booking: { user: any; time: any; date: any; zone_booking_id: any; }) => {
  //     const { user, time, date, zone_booking_id } = booking;
  //     const { rate, zone_name } = zone;
  //     const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();

  //     switch (filterBy) {
  //       case "date":
  //         return date.includes(filterValue);
  //       case "time":
  //         return time.includes(filterValue);
  //       case "rate":
  //         return rate.toString().includes(filterValue);
  //       case "zoneName":
  //         return zone_name.toLowerCase().includes(filterValue.toLowerCase());
  //       case "booked_by":
  //         return fullName.includes(filterValue.toLowerCase());
  //       case "booking_id":
  //         return zone_booking_id.includes(filterValue);
  //       default:
  //         return true;
  //     }
  //   })
  // );

  const filteredPackageEnrollments = packageEnrollmentForPlayer.filter(
    (enroll) => {
      const { package: pkg, rate, duration, enrolled_date } = enroll;
      const { package_name, zone } = pkg;
      const zone_name = zone.zone_name.toLowerCase();

      switch (filterByPackage) {
        case "package_name":
          return package_name
            .toLowerCase()
            .includes(filterValuePackage.toLowerCase());
        case "zone_name":
          return zone_name.includes(filterValuePackage.toLowerCase());
        case "rate":
          return rate.toString().includes(filterValuePackage);
        case "duration":
          return duration.toString().includes(filterValuePackage);
        case "enroll_date":
          return enrolled_date.includes(filterValuePackage);
        case "status":
          return enroll.status.includes(filterValuePackage);
        default:
          return true;
      }
    }
  );

  const [arcadeName, setArcadeName] = useState<any>();
  const [discription, setDiscription] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [sport, setSport] = useState<any[]>([]);
  const [openTime, setOpenTime] = useState<any>();
  const [closeTime, setCloseTime] = useState<any>();
  const [managerName, setmanagerName] = useState<Arcade>();

  useEffect(() => {
    if (arcadeDetails) {
      setArcadeName(arcadeDetails.arcade_name);
      setDiscription(arcadeDetails.distription);
      setAddress(arcadeDetails.address);
      setOpenTime(arcadeDetails.open_time);
      setCloseTime(arcadeDetails.close_time);

      if (arcade?.zone) {
        const sports = Array.from(
          new Set(arcade.zone.map((zoneItem) => zoneItem.sport.sport_name))
        );
        setSport(sports);
      }
    }
  }, [arcadeDetails]);

  console.log("arcadeDetails", arcadeDetails);

  console.log(arcadeDetails?.arcade_name);
  // const arcadeName = arcadeDetails?.arcade_name;
  console.log(arcadeDetails);
  const [cloudName] = useState("dle0txcgt");

  //For display reviews and averageRate
  const [allFeedbacks, setAllFeedbacks] = useState<ArcadeFeedback[]>([]);
  const [averageRating, setAverageRating] = useState(0.0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0.0);

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

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const onChangeCoachRequests = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValueForCoachRequest(e.target.value);
  };

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
            height: "650px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {" "}
          {/* {arcadeBookings.length === 0 ? <Empty /> : null} */}
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
                {discription}
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
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                position: "absolute",
                height: "0px",
              }}
            >
              <ArcadeEdit
                firstname={arcadeName}
                setFirstname={setArcadeName}
                discription={discription}
                setDiscription={setDiscription}
                address={address}
                setAddress={setAddress}
                openTime={openTime}
                setopenTime={setOpenTime}
                closeTime={closeTime}
                setCloseTime={setCloseTime}
                id={ArcadeId}
              />
            </div>
            <div>
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
                    {arcade && arcade?.arcade_name}
                  </h1>
                </Col>
                <Col span={2}></Col>
                <Col>
                  <h1>
                    <Notification userType="arcade" id={ArcadeId as string} />
                  </h1>
                </Col>
              </Row>
              <p
                style={{
                  color: "#000",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "350",
                  fontFamily: "kanit",
                  lineHeight: "normal",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              >
                Manager : {arcadeDetails?.manager.user.firstname}{" "}
                {arcadeDetails?.manager.user.lastname}
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
                {address &&
                  address

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
                      {/* 120 Feedbacks */}
                      {totalFeedbacks} Feedbacks)
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
              dataSource={["Online Payment"]}
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
                  Open Time : {openTime}
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
                  Close Time : {closeTime}
                </div>
              </List.Item>
            </List>
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
            {arcadeCoaches.map((coach: CoachAssignDetails) => (
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
                  coach_id={coach.coach_id}
                  sport={coach.coach.sport.sport_name}
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
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        {/* <AddPhotoButton />
      </div>
      <PhotoCollageForArcade /> */}

        <AddPhotoButton />
      </div>
      <PhotoCollageForArcade arcade_id={ArcadeId} />
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
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
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
              <ArcadeZoneCard
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
                full={zone.full_zone_rate}
                day={zone.zoneRejectDayAndTime.map((item) => item.day)}
                timeForDay={zone.zoneRejectDayAndTime.map((item) => item.time)}
                date={zone.zoneRejectDateAndTime.map((item) => item.date)}
                timeForDate={zone.zoneRejectDateAndTime.map(
                  (item) => item.time
                )}
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
            Our Packages For You
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
          {packageDetail?.package.map((pkg: Package) => (
            <Col
              key={pkg.package_id.toString()}
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
              <ArcadePackages
                packageName={pkg.package_name}
                packageDescription={pkg.description}
                rate={pkg.rate_per_person}
                package_id={pkg.package_id}
                ArcadeName={pkg.arcade.arcade_name}
                packageImage={pkg.package_image}
                CoachPrecentage={pkg.percentageForCoach}
                zoneName={pkg.zone.zone_name}
                zone_id={pkg.zone.zone_id}
                day={pkg.packageDayAndTime.map((item) => item.day)}
                time={pkg.packageDayAndTime.map((item) => item.time)}
              />
            </Col>
          ))}
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
        <Col>
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
            Availale bookings for your complex
          </Typography>
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
              fontSize: lg ? "16px" : "12px",
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
            style={{ width: 120, height: "40px" }}
            onChange={(value) => setFilterBy(value)}
          >
            <Option value="date">Date</Option>
            <Option value="time">Time</Option>
            <Option value="rate">Rate</Option>
            <Option value="zoneName">Zone Name</Option>
            <Option value="booked_by">Booked By</Option>
            <Option value="booking_id">Booking ID</Option>
            <Option value="status">Status</Option>
          </Select>
          <Input
            placeholder="Enter filter value"
            style={{ width: 200, marginLeft: 10, height: "40px" }}
            onChange={(e) => handleFilterChange2(e.target.value)}
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
        {filteredArcadeBookings.length > 0 ? (
          (console.log(filteredArcadeBookings),
          (
            <>
              {filteredArcadeBookings.map((zone) =>
                (zone.zoneBookingDetails || [])
                  .filter((booking) => booking.booking_type === "zone")
                  .map((booking) => (
                    <AvailableBookingsArcade
                      key={booking.zone_booking_id}
                      user_image={booking.user.user_image}
                      booking_id={booking.zone_booking_id}
                      booked_by={`${booking.user.firstname} ${booking.user.lastname}`}
                      zoneName={zone.zone_name}
                      time={booking.time}
                      date={booking.date}
                      rate={zone.rate}
                      zoneImage={zone.zone_image}
                      arcade_name={arcadeName}
                      email={booking.user.email}
                      status={booking.status}
                      full_amount={booking.full_amount}
                      user_id={booking.user.user_id}
                      arcade_id={ArcadeId}
                    />
                  ))
              )}
            </>
          ))
        ) : (
          <Empty />
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
        <Col>
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
            Available Coach bookings for your complex
          </Typography>
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
        {/* Radio button section */}
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
            <Radio.Group onChange={onChangeCoachBookings} value={value2}>
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
              token: { colorBorder: "#05a30a", colorPrimary: "#05a30a" },
            }}
          >
            <Radio.Group onChange={onChangeCoachBookings} value={value2}>
              <Radio value={5}></Radio>
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
            <Radio.Group onChange={onChangeCoachBookings} value={value2}>
              <Radio value={6}></Radio>
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
            <Option value="zoneName">Zone Name</Option>
            <Option value="booked_by">Booked By</Option>
            <Option value="booking_id">Booking ID</Option>
            <Option value="status">Status</Option>
          </Select>
          <Input
            placeholder="Enter filter value"
            style={{ width: 200, marginLeft: 10, height: "40px" }}
            onChange={(e) => handleFilterChange(e.target.value)}
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
            Coach
          </Col>
        </Row>
        {coachBookings.length > 0 ? (
          coachBookings
            .filter((booking) => {
              if (filterBy === "date") {
                return booking.date.includes(filterValue);
              } else if (filterBy === "time") {
                return booking.time.includes(filterValue);
              } else if (filterBy === "rate") {
                return booking.zone.rate.toString().includes(filterValue);
              } else if (filterBy === "zoneName") {
                return booking.zone.zone_name.includes(filterValue);
              } else if (filterBy === "booked_by") {
                return `${booking.player.user.firstname} ${booking.player.user.lastname}`.includes(
                  filterValue
                );
              } else if (filterBy === "booking_id") {
                return booking.booking_id.includes(filterValue);
              } else if (filterBy === "status") {
                return booking.status.includes(filterValue);
              }
              return true;
            })
            .map((booking) => (
              <AvailableCoachBookingsArcade
                key={booking.booking_id}
                user_image={booking.player.user.user_image}
                booking_id={booking.booking_id}
                booked_by={`${booking.player.user.firstname} ${booking.player.user.lastname}`}
                zoneName={booking.zone.zone_name}
                time={booking.time}
                date={booking.date}
                rate={booking.zone.rate}
                zoneImage={booking.zone.zone_image}
                booked_coach={`${booking.coach.user.firstname} ${booking.coach.user.lastname}`}
                player_email={booking.player.user.email}
                coach_email={booking.coach.user.email}
                coach_image={booking.coach.user.user_image}
                coach_id={booking.coach_id}
                status={booking.status}
                full_amount={booking.full_amount}
                player_id={booking.player_id}
                arcade_id={ArcadeId}
              />
            ))
        ) : (
          <Empty />
        )}
      </Row>
      {/* Package Enrollments Section */}
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <Col>
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
            Package Enrollments for your complex
          </Typography>
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
          <ConfigProvider
            theme={{
              token: {
                colorBorder: "#0E458E",
                colorPrimary: "#0E458E",
              },
            }}
          >
            <Radio.Group onChange={onChangeCoachBookings} value={value2}>
              <Radio value={7}></Radio>
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
            <Radio.Group onChange={onChangeCoachBookings} value={value2}>
              <Radio value={8}></Radio>
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
            <Radio.Group onChange={onChangeCoachBookings} value={value2}>
              <Radio value={9}></Radio>
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
              fontSize: lg ? "16px" : "12px",
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
            defaultValue="enroll_date"
            style={{ width: 120, height: "40px" }}
            onChange={(value) => setFilterByPackage(value)}
          >
            <Option value="package_name">Package Name</Option>
            <Option value="zone_name">Zone Name</Option>
            <Option value="rate">Rate</Option>
            <Option value="duration">Duration</Option>
            <Option value="enroll_date">Enroll Date</Option>
            <Option value="status">Status</Option>
          </Select>
          <Input
            placeholder="Enter filter value"
            style={{ width: 200, marginLeft: 10, height: "40px" }}
            onChange={(e) => handleFilterChangePackage(e.target.value)}
          />
          <Button
            style={{ marginLeft: 10, height: "40px" }}
            ghost
            type="primary"
            onClick={() => {
              setFilterValuePackage("");
              setFilterByPackage("enroll_date");
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
            Package Name
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
        {filteredPackageEnrollments.length > 0 ? (
          <>
            {filteredPackageEnrollments.map(
              (enroll: PackageEnroolDetailsForPlayer) => (
                <PackageEnrollmentDetailsInArcadeProfile
                  key={enroll.enrolled_date} // Make sure to provide a unique key
                  package_id={enroll.package_id}
                  package_image={enroll.package.package_image}
                  package_name={enroll.package.package_name}
                  enroll_date={enroll.enrolled_date}
                  venue={enroll.package.arcade.arcade_name}
                  rate={enroll.rate}
                  duration={enroll.duration}
                  zone_name={enroll.package.zone.zone_name}
                  player_id={enroll.player_id}
                  email={enroll.player.user.email}
                  role={"ARCADE"}
                />
              )
            )}
          </>
        ) : (
          <Empty description="No Package Enrollments Yet" />
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
            <Radio.Group
              onChange={onChangeCoachRequests}
              value={valueForCoachRequest}
            >
              <Radio value={10}></Radio>
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
            <Radio.Group
              onChange={onChangeCoachRequests}
              value={valueForCoachRequest}
            >
              <Radio value={11}></Radio>
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
            <Radio.Group
              onChange={onChangeCoachRequests}
              value={valueForCoachRequest}
            >
              <Radio value={12}></Radio>
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
              fontSize: lg ? "16px" : "12px",
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array.isArray(CoachReqestToArchade) &&
          CoachReqestToArchade.slice(0, numberOfItemsShown).map(
            (request, index) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
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
          Coach Request For Enroll Package
        </Typography>
      </Row>
      <Row
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Array.isArray(CoachReqestToEnrollPackage) &&
          CoachReqestToEnrollPackage.slice(0, numberOfItemsShown).map(
            (request, index) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
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
          {/* <Row
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
          </Row> */}

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
        <Col>
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
            Report Genaration
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "100px",
          }}
        >
          <ReportGenarationForArcade />
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};

export default ArcadeProfileArcade;
