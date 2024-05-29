import { Col, Row, Modal, Button, Empty, RadioChangeEvent, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CoachBookingDetails, ZoneBookingDetails } from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { SearchProps } from "antd/es/input";
const CoachCancelCoachBookins = () => {
  const [ArcadeBookingDetails, setArcadeBookingDetails] = useState<
    CoachBookingDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [canceledByArcade, setCanceledByArcade] = useState<
    CoachBookingDetails[]
  >([]);
  const [arcadeCanceled, setArcadeCanceled] = useState<CoachBookingDetails[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/getCoachBookings"
        );
        const data = await res.data;
        setArcadeCanceled(data);

        let sortedBookings = data.filter(
          (coachBooking: { status: string }) =>
            coachBooking.status === "canceled_By_Coach"
        );

        // Filter based on search string and status
        sortedBookings = sortedBookings.filter(
          (coachBooking: CoachBookingDetails) =>
            (search === "" || coachBooking.status === "canceled_By_Coach") &&
            (coachBooking.zone.zone_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
              coachBooking.player.user.firstname
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              coachBooking.date.includes(search) ||
              (
                Number(coachBooking.zone.rate) *
                  Number(coachBooking.participant_count) +
                Number(coachBooking.zone.rate) *
                  Number(coachBooking.participant_count)
              )
                .toString()
                .includes(search))
        );

        setArcadeCanceled(sortedBookings);
        setArcadeCanceled(sortedBookings);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [search]);

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    setSearch(value.trim());
  };

  const onChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue === 1) {
      const below24Hours = arcadeCanceled.filter(
        (coachBooking: CoachBookingDetails) => {
          const canceledTime = new Date(
            coachBooking.canceled_at as string
          ).getTime();
          const createdTime = new Date(
            coachBooking.created_at as string
          ).getTime();
          const timeDifference = canceledTime - createdTime;
          const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
          return timeDifference < twentyFourHoursInMillis;
        }
      );
      setArcadeCanceled(below24Hours);
    } else if (newValue === 2) {
      const above24Hours = arcadeCanceled.filter(
        (coachBooking: CoachBookingDetails) => {
          const canceledTime = new Date(
            coachBooking.canceled_at as string
          ).getTime();
          const createdTime = new Date(
            coachBooking.created_at as string
          ).getTime();
          const timeDifference = canceledTime - createdTime;
          const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
          return timeDifference >= twentyFourHoursInMillis;
        }
      );
      setArcadeCanceled(above24Hours);
    }
  };

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Cancelled By Coach - Coach Bookings</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          {" "}
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Before 24 hours</Radio>
            <Radio value={2}>After 24 hours</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Col style={{ marginTop: "20px", maxHeight: "75vh", overflowY: "auto" }}>
        {arcadeCanceled.length === 0 ? <Empty /> : null}
        {arcadeCanceled.map((CoachBookingDetails: CoachBookingDetails) => (
          <DataRow
            booking_id={CoachBookingDetails.booking_id} // Fix: Access the zone_booking_id property from ZoneBookingDetails
            booked_Arena={CoachBookingDetails.zone.zone_name}
            booked_by={CoachBookingDetails.player.user.firstname}
            rate={
              Number(CoachBookingDetails.zone.rate) *
                Number(CoachBookingDetails.participant_count) +
              Number(CoachBookingDetails.zone.rate) *
                Number(CoachBookingDetails.participant_count)
            }
            user_id={CoachBookingDetails.player.player_id}
            zone_id={CoachBookingDetails.zone.zone_id}
            zone={CoachBookingDetails.zone.zone_name}
            booking_date={CoachBookingDetails.date}
            booking_time={CoachBookingDetails.time}
            participant_count={CoachBookingDetails.participant_count}
            created_at={CoachBookingDetails.created_at}
            canceled_at={CoachBookingDetails.canceled_at}
            image={CoachBookingDetails.player.user.user_image}
            coach_Image={CoachBookingDetails.coach.user.user_image}
            coach_id={CoachBookingDetails.coach.coach_id}
            coach_name={`${CoachBookingDetails.coach.user.firstname} ${CoachBookingDetails.coach.user.lastname}`}
          />
        ))}
      </Col>
    </Col>
  );
};

export default CoachCancelCoachBookins;

function DataRow(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(props);
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/CoachUser/:${props.coach_id}`);
  };
  return (
    <Row
      style={{
        backgroundColor: "white",
        padding: "1%",
        marginTop: "63px",
      }}
    >
      <Col span={8} style={{}}>
        <AdvancedImage
          onClick={handleClick}
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "80px",
            height: "80px",
          }}
          cldImg={
            cld.image(props?.coach_Image)
            // .resize(Resize.crop().width(200).height(200).gravity('auto'))
            // .resize(Resize.scale().width(200).height(200))
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {props.coach_name}
        </div>
      </Col>
      <Col span={2} style={{}}>
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
          {" "}
          Rs.{props.rate}
        </div>
      </Col>
      <Col span={8}>
        <Link to={`/profile/`}>
          <AdvancedImage
            style={{
              borderRadius: "50%",
              position: "absolute",
              width: "80px",
              height: "80px",
            }}
            cldImg={
              cld.image(props?.image)
              // .resize(Resize.crop().width(200).height(200).gravity('auto'))
              // .resize(Resize.scale().width(200).height(200))
            }
          />
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "80px",
            fontSize: "16px",
          }}
        >
          {props.booked_by}
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
            onClick={showModal}
            style={{ width: "100px", backgroundColor: "#0E458E" }}
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
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ lineHeight: 3.0, fontSize: "160px" }}>
              <Row>
                <div style={{ fontSize: "28px", color: "#0E458E" }}>
                  Booking Details
                </div>
                <Col span={24}>
                  <b>Booking ID :</b> {props.booking_id}
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={16}>
                      <b>Booked By : </b> {props.booked_by}
                    </Col>
                    <Col span={8}>
                      <b>User_ID : </b> {props.user_id}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={16}>
                      <b>Arcade :</b> Super Box Complex
                    </Col>
                    <Col span={8}>
                      <b>User_ID</b> : C000189
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={24}>
                      <b>Zone :</b> {props.zone}
                    </Col>
                    <Col span={24}>
                      <b>Zone_ID :</b> {props.zone_id}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <b>Booking Date :</b> {props.booking_date}
                </Col>
                <Col span={24}>
                  <b>Booking Time :</b> {props.booking_time}
                </Col>
                <Col span={24}>
                  <b>Participant Count :</b> {props.participant_count}
                </Col>
                <Col span={24}>
                  <b>Created at :</b> {props.created_at}
                </Col>
                <Col span={24}>
                  <b>Canceled at :</b> {props.canceled_at}
                </Col>
              </Row>
            </div>
          </Modal>
          <Button
            type="primary"
            ghost
            style={{ width: "130px", marginLeft: "20px" }}
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
              Return Money
            </div>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
