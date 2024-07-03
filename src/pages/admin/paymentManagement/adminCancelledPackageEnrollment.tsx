import { Col, Row, Button, Modal, Empty, Checkbox } from "antd";
import { useEffect, useState } from "react";
import {
  PackageEnroolDetailsForPlayer,
  ZoneBookingDetails,
} from "../../../types";
import axios from "axios";
import { Spin } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const AdminCanceledPackageEnrollment = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [zoneBookingDetails, setZoneBookingDetails] = useState([]);
  const [adminCanceled, setAdminCanceled] = useState<
    PackageEnroolDetailsForPlayer[]
  >([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageEnrollmentPlayerDetails`
        );
        const data = await res.data;
        setZoneBookingDetails(data);
        console.log(data);

        // console.log(arcadeBookings.filter((arcadeBooking) => arcadeBooking.);

        const adminCanceled = data.filter(
          (arcadeBooking: PackageEnroolDetailsForPlayer) =>
            arcadeBooking.status === "canceled_By_Admin"
        );
        console.log(adminCanceled);

        setAdminCanceled(adminCanceled);
        console.log(adminCanceled);
      };
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  });

  const handleRefresh = async () => {
    setLoading(true);

    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageEnrollmentPlayerDetails`
        );
        const data = await res.data;
        setZoneBookingDetails(data);
        console.log(data);

        // console.log(arcadeBookings.filter((arcadeBooking) => arcadeBooking.);

        const adminCanceled = data.filter(
          (arcadeBooking: PackageEnroolDetailsForPlayer) =>
            arcadeBooking.status === "canceled_By_Admin"
        );
        console.log(adminCanceled);

        setAdminCanceled(adminCanceled);
        console.log(adminCanceled);
      };
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Col
      span={19}
      style={{ backgroundColor: "#EFF4FA", padding: "2%", marginLeft: "21%" }}
    >
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Cancelled By Admin - Package Enrollment</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <input
              style={{ width: "100%", height: "40px" }}
              type="search"
              placeholder="Search here"
            />
          </Col>
        </Row>
        <Row style={{}}>
          <Col span={21}></Col>
          <Col span={2}>
            <Button
              type="primary"
              onClick={handleRefresh}
              loading={loading}
              style={{
                backgroundColor: "#0E458E",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "5px",
              }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
        <Col
          style={{ marginTop: "20px", maxHeight: "75vh", overflowY: "auto" }}
        >
          {adminCanceled.length === 0 ? <Empty /> : null}
          {adminCanceled.map(
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

export default AdminCanceledPackageEnrollment;

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
      {" "}
      <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
        <Checkbox></Checkbox>
      </Col>
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
      <Col span={7}>
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
