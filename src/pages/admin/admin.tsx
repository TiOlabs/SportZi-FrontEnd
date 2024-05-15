import {
  AuditOutlined,
  DollarOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Menu } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import BookedArena from "./bookingManagement/bookedArena";
import BookedCoaches from "./bookingManagement/bookedCoaches";
import PackageEnrolled from "./bookingManagement/packageEnrolled";
import PlayerManagement from "./userManagement/playerManagement";
import CoachManagement from "./userManagement/coachesManagement";
import ArcadeManagement from "./userManagement/arcadeManagement";
import CoachArcadeCancel from "./paymentManagement/arcadeCancel";
import PlayerCanceled from "./paymentManagement/playerCancelled";
import ComplitedBookings from "./paymentManagement/completedBookings";
import AdminCanceled from "./paymentManagement/adminCancelled";
import { ArcadeBookings } from "../../types";
import axios from "axios";
import { get } from "http";
import PlayerCanceledCoachBookings from "./paymentManagement/playerCancelledCoachBookings";
import PlayerCanceledPackageEnrollment from "./paymentManagement/playerCancelledPackageEnrollment";
import ArcadeCancelledCoachBookings from "./paymentManagement/arcadeCancelledCoachBookings";
import ArcadeCancelledPackageEnrollement from "./paymentManagement/arcadeCancelledPackageEnrollement";
import CoachCancelCoachBookins from "./paymentManagement/coachCancel";
import CoachCancelledPackageEnrollment from "./paymentManagement/coachCancelledPackageEnrollment";
import AdminCanceledCoachBookings from "./paymentManagement/adminCncelledCoachBookings";
import AdminCanceledPackageEnrollment from "./paymentManagement/adminCancelledPackageEnrollment";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuProps["items"] = [
  getItem("User manegment", "sub4", <UserOutlined />, [
    getItem("Coaches Management", "9"),
    getItem("Player Management", "10"),
    getItem("Arcade Manegement", "11"),
  ]),
  getItem("Payment Manegement", "sub5", <DollarOutlined />, [
    getItem("completed Booking", "12"),
    getItem("Player Canceled", "13", null, [
      getItem("Arena Bookings", "20"),
      getItem("Coach Bookings", "21"),
      getItem("Package Enrolled", "22"),
    ]),
    getItem("Arcade Canceled", "14", null, [
      getItem("Arena Bookings", "23"),
      getItem("Coach Bookings", "24"),
      getItem("Package Enrolled", "25"),
    ]),

    getItem("Coach Canceled", "15", null, [
      getItem("Coach Bookings", "27"),
      getItem("Package Enrolled", "28"),
    ]),
    getItem("Admin Canceled", "16", null, [
      getItem("Arena Bookings", "29"),
      getItem("Coach Bookings", "30"),
      getItem("Package Enrolled", "31"),
    ]),
  ]),
  getItem("Booking Management", "sub6", <AuditOutlined />, [
    getItem("Booked Arena", "17"),
    getItem("Booked Coaches ", "18"),
    getItem("Package Enrolled", "19"),
  ]),
];
const SideBarAdminPage = () => {
  const [stts, setstts] = useState("");
  const [arcadeBookings, setArcadeBookings] = useState<ArcadeBookings[]>([]);
  const [adminCanceled, setAdminCanceled] = useState<ArcadeBookings[]>([]);
  console.log(arcadeBookings);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8000/api/getarcadebookings"
        );
        const data = await res.data;

        // console.log(arcadeBookings.filter((arcadeBooking) => arcadeBooking.);
        const filteredData = data.filter(
          (arcadeBooking: ArcadeBookings) => !arcadeBooking.cancel_by_admin
        );
        const adminCanceled = data.filter(
          (arcadeBooking: ArcadeBookings) => arcadeBooking.cancel_by_admin
        );
        console.log(filteredData);
        console.log(adminCanceled);
        setArcadeBookings(filteredData);
        setAdminCanceled(adminCanceled);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if (e.key === "9") {
      setstts("CoachManagement");
    } else if (e.key === "10") {
      setstts("PlayerManagement");
    } else if (e.key === "11") {
      setstts("ArcadeManagement");
    } else if (e.key === "12") {
      setstts("completedBooking");
    } else if (e.key === "13") {
      setstts("playerCanceled");
    } else if (e.key === "14") {
      setstts("ArcadeCanceled");
    } else if (e.key === "15") {
      setstts("CoachCanceled");
    } else if (e.key === "16") {
      setstts("adminCanceled");
    } else if (e.key === "17") {
      setstts("bookedArena");
    } else if (e.key === "18") {
      setstts("bookedcoach");
    } else if (e.key === "19") {
      setstts("packageEnrolled");
    } else if (e.key === "20") {
      setstts("PlayerCanceledArena");
    } else if (e.key === "21") {
      setstts("PlayerCanceledCoach");
    } else if (e.key === "22") {
      setstts("PlayerCanceledPackage");
    } else if (e.key === "23") {
      setstts("ArcadeCanceledArena");
    } else if (e.key === "24") {
      setstts("ArcadeCanceledCoach");
    } else if (e.key === "25") {
      setstts("ArcadeCanceledPackage");
    } else if (e.key === "27") {
      setstts("CoachCanceledCoach");
    } else if (e.key === "28") {
      setstts("CoachCanceledPackage");
    } else if (e.key === "29") {
      setstts("AdminCanceledArena");
    } else if (e.key === "30") {
      setstts("AdminCanceledCoach");
    } else if (e.key === "31") {
      setstts("AdminCanceledPackage");
    }
  };
  return (
    <Row>
      <Col
        span={5}
        style={{
          backgroundColor: "#051F43",
          color: "white",
          padding: "2%",
          height: "100vh",
        }}
      >
        <Row>
          {" "}
          <MenuOutlined />
        </Row>
        <Row style={{ marginTop: "5%" }}>
          <h3>Dashboard</h3>
        </Row>
        <Row>
          {" "}
          <Menu
            onClick={onClick}
            style={{ width: 256, backgroundColor: "#051F43" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            items={items}
          />
        </Row>
      </Col>
      {stts === "bookedArena" && (
        <BookedArena
          setArcadeBookings={setArcadeBookings}
          arcadeBookings={arcadeBookings}
        />
      )}
      {stts === "AdminCanceledArena" && (
        <AdminCanceled
          setAdminCanceled={setAdminCanceled}
          adminCanceled={adminCanceled}
        />
      )}

      {/* arcadeBookings?.map((arcadeBooking: ArcadeBookings) => ( */}
      <>
        {/* <div> hello</div> */}
        {/* <BookedArena
              key={arcadeBooking.id}
              booking_id={arcadeBooking.id}
              booking_date={arcadeBooking.booking_date}
              booking_time={arcadeBooking.booking_time}
              participant_count={arcadeBooking.participant_count}
              created_at={arcadeBooking.created_at}
              zone={arcadeBooking.zone}
            /> */}
      </>
      {/* ))} */}

      {stts === "bookedcoach" && <BookedCoaches />}
      {stts === "packageEnrolled" && <PackageEnrolled />}
      {stts === "PlayerManagement" && <PlayerManagement />}
      {stts === "CoachManagement" && <CoachManagement />}
      {stts === "ArcadeManagement" && <ArcadeManagement />}
      {stts === "ArcadeCanceledArena" && <CoachArcadeCancel />}
      {stts === "ArcadeCanceledCoach" && <ArcadeCancelledCoachBookings />}
      {stts === "ArcadeCanceledPackage" && (
        <ArcadeCancelledPackageEnrollement />
      )}
      {stts === "PlayerCanceledArena" && <PlayerCanceled />}
      {stts === "PlayerCanceledCoach" && <PlayerCanceledCoachBookings />}
      {stts === "PlayerCanceledPackage" && <PlayerCanceledPackageEnrollment />}
      {stts === "CoachCanceledCoach" && <CoachCancelCoachBookins />}
      {stts === "CoachCanceledPackage" && <CoachCancelledPackageEnrollment />}
      {stts === "AdminCanceledCoach" && <AdminCanceledCoachBookings />}
      {stts === "AdminCanceledPackage" && <AdminCanceledPackageEnrollment />}
      {stts === "completedBooking" && <ComplitedBookings />}
    </Row>
  );
};

export default SideBarAdminPage;
