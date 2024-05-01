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
    getItem("Player Canceled", "13"),
    getItem("Coach/Arcade Canceled", "14"),
    getItem("Admin Canceled", "15"),
  ]),
  getItem("Booking Management", "sub6", <AuditOutlined />, [
    getItem("Booked Arena", "16"),
    getItem("Booked Coaches ", "17"),
    getItem("Package Enrolled", "18"),
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
      setstts("coachArcadeCanceled");
    } else if (e.key === "15") {
      setstts("adminCanceled");
    } else if (e.key === "16") {
      setstts("bookedArena");
    } else if (e.key === "17") {
      setstts("bookedcoach");
    } else if (e.key === "18") {
      setstts("packageEnrolled");
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
      {stts === "adminCanceled" && (
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
      {stts === "coachArcadeCanceled" && <CoachArcadeCancel />}
      {stts === "playerCanceled" && <PlayerCanceled />}
      {stts === "completedBooking" && <ComplitedBookings />}
    </Row>
  );
};

export default SideBarAdminPage;
