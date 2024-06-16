import { Col, Row, Modal, Button, Empty, Radio, RadioChangeEvent } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ZoneBookingDetails } from "../../../types";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { SearchProps } from "antd/es/input";

const CoachArcadeCancel = () => {
  const [ArcadeBookingDetails, setArcadeBookingDetails] = useState<
    ZoneBookingDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [canceledByArcade, setCanceledByArcade] = useState<
    ZoneBookingDetails[]
  >([]);
  const [arcadeCanceled, setArcadeCanceled] = useState<ZoneBookingDetails[]>(
    []
  );
  const [value, setValue] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [filteredArcadeCanceled, setFilteredArcadeCanceled] = useState<
    ZoneBookingDetails[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getarcadebookings`
        );
        const data = await res.data;
        setArcadeBookingDetails(data);

        let sortedBookings = data.filter(
          (arcadeBooking: { booking_type: string; status: string }) =>
            arcadeBooking.status === "canceled_By_Arcade" &&
            arcadeBooking.booking_type === "zone"
        );

        // Filter based on search string and status
        sortedBookings = sortedBookings.filter(
          (arcadeBooking: ZoneBookingDetails) =>
            (search === "" || arcadeBooking.status === "canceled_By_Player") &&
            (arcadeBooking.zone.zone_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
              arcadeBooking.user.firstname
                .toLowerCase()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              arcadeBooking.date.includes(search) ||
              (
                Number(arcadeBooking.zone.rate) *
                Number(arcadeBooking.participant_count)
              )
                .toString()
                .includes(search))
        );

        setArcadeCanceled(sortedBookings);
        // Set initial filtered data for value 1
        setFilteredArcadeCanceled(
          sortedBookings.filter((coachBooking: ZoneBookingDetails) => {
            const canceledTime = new Date(
              coachBooking.canceled_at as string
            ).getTime();
            const createdTime = new Date(
              coachBooking.created_at as string
            ).getTime();
            const timeDifference = canceledTime - createdTime;
            const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
            return timeDifference < twentyFourHoursInMillis;
          })
        );
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
    console.log(value);
    const newValue = e.target.value;
    console.log(newValue);
    setValue(newValue);

    if (newValue === 1) {
      const below24Hours = arcadeCanceled.filter(
        (coachBooking: ZoneBookingDetails) => {
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
      setFilteredArcadeCanceled(below24Hours);
    } else if (newValue === 2) {
      const above24Hours = arcadeCanceled.filter(
        (coachBooking: ZoneBookingDetails) => {
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
      setFilteredArcadeCanceled(above24Hours);
    }
  };

  useEffect(() => {
    console.log("Filtered Data:", filteredArcadeCanceled);
  }, [filteredArcadeCanceled]);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Cancelled By Arcade - Arena Bookings</h2>
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
        {filteredArcadeCanceled.length === 0 ? <Empty /> : null}
        {filteredArcadeCanceled.map(
          (ZoneBookingDetails: ZoneBookingDetails) => (
            <DataRow
              booking_id={ZoneBookingDetails.zone_booking_id}
              booked_Arena={ZoneBookingDetails.zone.zone_name}
              booked_by={ZoneBookingDetails.user.firstname}
              rate={
                Number(ZoneBookingDetails.zone.rate) *
                Number(ZoneBookingDetails.participant_count)
              }
              user_id={ZoneBookingDetails.user.user_id}
              zone_id={ZoneBookingDetails.zone.zone_id}
              zone={ZoneBookingDetails.zone.zone_name}
              booking_date={ZoneBookingDetails.date}
              booking_time={ZoneBookingDetails.time}
              participant_count={ZoneBookingDetails.participant_count}
              created_at={ZoneBookingDetails.created_at}
              canceled_at={ZoneBookingDetails.canceled_at}
              image={ZoneBookingDetails.user.user_image}
              zone_image={ZoneBookingDetails.zone.zone_image}
            />
          )
        )}
      </Col>
    </Col>
  );
};

export default CoachArcadeCancel;

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
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "80px",
            height: "80px",
          }}
          cldImg={cld.image(props?.zone_image)}
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
          {props.booked_Arena}
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
          LKR {props.rate}
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
            cldImg={cld.image(props?.image)}
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
