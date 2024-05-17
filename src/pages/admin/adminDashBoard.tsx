import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { ZoneBookingDetails } from "../../types";

const AdminPannel = () => {
  const [zoneBookings, setZoneBookings] = useState<ZoneBookingDetails[]>([]);

  useEffect(() => {
    const fetchZoneBookings = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/getarcadebookings`);
        const data = await res.json();

        setZoneBookings(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchZoneBookings();
  }, []);

  return (
    <>
      <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>DashBoard</h2>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default AdminPannel;
