import { Col, Row, Button, Modal, Spin, Empty } from "antd";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import axios from "axios";
import {
  PackageEnroolDetailsForPlayer,
  ZoneBookingDetails,
} from "../../../types";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { any } from "prop-types";
const PlayerCanceledPackageEnrollment = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(1);
  const [playerBookingDetails, setPlayerBookingDetails] = useState<
    PackageEnroolDetailsForPlayer[]
  >([]);
  const [playerCanceled, setPlayerCanceled] = useState<
    PackageEnroolDetailsForPlayer[]
  >([]);
  const [canceledByPlayer, setCanceledByPlayer] = useState<
    PackageEnroolDetailsForPlayer[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageEnrollmentPlayerDetails`
        );
        const data = await res.data;
        setPlayerBookingDetails(data);
        console.log(data);

        // console.log(arcadeBookings.filter((arcadeBooking) => arcadeBooking.);

        const playerCanceledBookings = data.filter(
          (arcadeBooking: PackageEnroolDetailsForPlayer) =>
            arcadeBooking.status === "canceled_By_Player"
        );
        console.log(playerCanceledBookings);

        setCanceledByPlayer(playerCanceledBookings);
        setPlayerCanceled(playerCanceledBookings);
        console.log(playerCanceled);
        setLoading(false);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const onChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue === 1) {
      const below24Hours = canceledByPlayer.filter(
        (arcadeBooking: PackageEnroolDetailsForPlayer) => {
          const canceledTime = new Date(
            arcadeBooking.canceled_at as string
          ).getTime();
          const createdTime = new Date(
            arcadeBooking.enrolled_date as string
          ).getTime();
          const timeDifference = canceledTime - createdTime;
          const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
          return timeDifference < twentyFourHoursInMillis;
        }
      );
      console.log(below24Hours);
      setPlayerCanceled(below24Hours);
    } else if (newValue === 2) {
      const above24Hours = canceledByPlayer.filter(
        (arcadeBooking: PackageEnroolDetailsForPlayer) => {
          const canceledTime = new Date(
            arcadeBooking.canceled_at as string
          ).getTime();
          const createdTime = new Date(
            arcadeBooking.enrolled_date as string
          ).getTime();
          const timeDifference = canceledTime - createdTime;
          const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

          return timeDifference >= twentyFourHoursInMillis;
        }
      );
      console.log(above24Hours);
      setPlayerCanceled(above24Hours);
    }
  };
  const filteredBookings = playerBookingDetails.filter(
    (playerBookingDetails) =>
      playerBookingDetails.package_id
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      playerBookingDetails.player.user.firstname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      playerBookingDetails.player.user.lastname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      playerBookingDetails.package.arcade.arcade_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      playerBookingDetails.package.package_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  return (
    <Col
      span={19}
      style={{ backgroundColor: "#EFF4FA", padding: "2%", marginLeft: "21%" }}
    >
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Cancelled By Player - Package Enrollment</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <input
              style={{ width: "100%", height: "40px" }}
              type="search"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <Col
          style={{ marginTop: "20px", maxHeight: "75vh", overflowY: "auto" }}
        >
          {filteredBookings.length === 0 ? <Empty /> : null}
          {filteredBookings.map(
            (packageEnrollmentForPlayer: PackageEnroolDetailsForPlayer) => (
              <DataRow
                package_id={packageEnrollmentForPlayer.package_id} // Fix: Access the zone_booking_id property from ZoneBookingDetails
                booked_Arena={
                  packageEnrollmentForPlayer.package.arcade.arcade_name
                }
                booked_by={
                  packageEnrollmentForPlayer.player.user.firstname +
                  " " +
                  packageEnrollmentForPlayer.player.user.lastname
                }
                rate={Number(packageEnrollmentForPlayer.rate)}
                user_id={packageEnrollmentForPlayer.player_id}
                zone_id={packageEnrollmentForPlayer.package.zone_id}
                zone={packageEnrollmentForPlayer.package.zone.zone_name}
                package_image={packageEnrollmentForPlayer.package.package_image}
                // booking_date={packageEnrollmentForPlayer.date}
                // booking_time={packageEnrollmentForPlayer.time}
                // participant_count={packageEnrollmentForPlayer.participant_count}
                created_at={packageEnrollmentForPlayer.enrolled_date}
                canceled_at={packageEnrollmentForPlayer.canceled_at}
                image={packageEnrollmentForPlayer.player.user.user_image}
              />
            )
          )}
        </Col>
      </Spin>
    </Col>
  );
};

export default PlayerCanceledPackageEnrollment;

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
          cldImg={
            cld.image(props?.package_image)
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
