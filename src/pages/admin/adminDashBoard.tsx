import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Table, Button } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useReactToPrint } from "react-to-print";
import { CoachBookingDetails, ZoneBookingDetails } from "../../types";
import { ColumnType } from "antd/es/table";

interface PrintableContentProps {
  zoneData: { name: string; value: number }[];
  coachData: { name: string; value: number }[];
  COLORS: string[];
  tableColumns: ColumnType<{ name: string; value: number }>[];
}

const PrintableContent = React.forwardRef<
  HTMLDivElement,
  PrintableContentProps
>(({ zoneData, coachData, COLORS, tableColumns }, ref) => (
  <Col
    span={24}
    style={{ backgroundColor: "#EFF4FA", padding: "2%",maxHeight:"80vh",overflow:"auto" }}
    ref={ref}
  >
    <Row style={{ marginBottom: "2rem", animation: "fadeIn 1s ease-in-out" }}>
      <Col
        span={16}
        style={{
          animation: "blowUp 0.5s ease-in-out",
          transform: "scale(1)",
          opacity: 1,
        }}
      >
        <Row>
          <Col
            style={{
              color: "#0E458E",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h3>Arena Bookings</h3>
          </Col>
        </Row>
        <PieChart width={700} height={400}>
          <Pie
            data={zoneData}
            cx={300}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {zoneData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="top" align="right" />
        </PieChart>
      </Col>
      <Col
        span={8}
        style={{
          padding: "20px",
          animation: "fadeIn 1s ease-in-out",
          opacity: 1,
        }}
      >
        <Table
          columns={tableColumns}
          dataSource={zoneData}
          pagination={false}
          bordered
          title={() => <h3>Arena Booking Counts</h3>}
        />
      </Col>
    </Row>
    <Row>
      <Col
        style={{
          color: "#0E458E",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h3>Coach Bookings</h3>
      </Col>
    </Row>
    <Row style={{ marginBottom: "2rem", animation: "fadeIn 1s ease-in-out" }}>
      <Col
        span={8}
        style={{
          padding: "20px",
          animation: "fadeIn 1s ease-in-out",
          opacity: 1,
        }}
      >
        <Table
          columns={tableColumns}
          dataSource={coachData}
          pagination={false}
          bordered
          title={() => <h3>Coach Booking Counts</h3>}
        />
      </Col>
      <Col
        span={16}
        style={{
          animation: "blowUp 0.5s ease-in-out",
          transform: "scale(1)",
          opacity: 1,
        }}
      >
        <PieChart width={700} height={400}>
          <Pie
            data={coachData}
            cx={300}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {coachData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="top" align="right" />
        </PieChart>
      </Col>
    </Row>
  </Col>
));

const AdminPannel = () => {
  const [zoneBookings, setZoneBookings] = useState<ZoneBookingDetails[]>([]);
  const [coachBookings, setCoachBookings] = useState<CoachBookingDetails[]>([]);

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

  useEffect(() => {
    const fetchCoachBookings = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/getCoachBookings`);
        const data = await res.json();
        setCoachBookings(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoachBookings();
  }, []);

  const bookingStatusCounts = {
    success: 0,
    canceled_By_Player: 0,
    canceled_By_Arcade: 0,
    canceled_By_Admin: 0,
  };
  const coachBookingStatusCounts = {
    success: 0,
    canceled_By_Player: 0,
    canceled_By_Arcade: 0,
    canceled_By_Admin: 0,
    canceled_By_Coach: 0,
  };

  zoneBookings.forEach((booking) => {
    if (booking.status.toString() in bookingStatusCounts) {
      bookingStatusCounts[
        booking.status.toString() as keyof typeof bookingStatusCounts
      ]++;
    }
  });

  coachBookings.forEach((booking) => {
    if (booking.status.toString() in coachBookingStatusCounts) {
      coachBookingStatusCounts[
        booking.status.toString() as keyof typeof coachBookingStatusCounts
      ]++;
    }
  });

  const zoneData = [
    { name: "Success", value: bookingStatusCounts.success },
    {
      name: "Canceled By Player",
      value: bookingStatusCounts.canceled_By_Player,
    },
    {
      name: "Canceled By Arcade",
      value: bookingStatusCounts.canceled_By_Arcade,
    },
    { name: "Canceled By Admin", value: bookingStatusCounts.canceled_By_Admin },
  ];

  const coachData = [
    { name: "Success", value: coachBookingStatusCounts.success },
    {
      name: "Canceled By Player",
      value: coachBookingStatusCounts.canceled_By_Player,
    },
    {
      name: "Canceled By Arcade",
      value: coachBookingStatusCounts.canceled_By_Arcade,
    },
    {
      name: "Canceled By Admin",
      value: coachBookingStatusCounts.canceled_By_Admin,
    },
    {
      name: "Canceled By Coach",
      value: coachBookingStatusCounts.canceled_By_Coach,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#333333"];

  const tableColumns: ColumnType<{ name: string; value: number }>[] = [
    {
      title: "Status",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Count",
      dataIndex: "value",
      key: "value",
    },
  ];

  const printableContentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printableContentRef.current,
  });

  return (
    <>
      <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
        <Row justify="space-between">
          <Col>NAV</Col>
          <Col>
            <Button type="primary" ghost onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>DashBoard</h2>
          </Col>
        </Row>
        <PrintableContent
          ref={printableContentRef}
          zoneData={zoneData}
          coachData={coachData}
          COLORS={COLORS}
          tableColumns={tableColumns}
        />
      </Col>
    </>
  );
};

export default AdminPannel;
