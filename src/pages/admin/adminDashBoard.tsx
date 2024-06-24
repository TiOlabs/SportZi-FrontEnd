import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Table, Button } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useReactToPrint } from "react-to-print";
import { CoachBookingDetails, ZoneBookingDetails } from "../../types";
import { ColumnType } from "antd/es/table";

interface PrintableContentProps {
  zoneData: { name: string; value: number }[];
  coachData: { name: string; value: number }[];
  packageData: { name: string; value: number }[];
  totalRevenue: number;
  canceledByArcadeRevenue: number;
  canceledByCoachRevenue: number;
  canceledByPlayerRevenue: number;
  COLORS: string[];
  tableColumns: ColumnType<{ name: string; value: number }>[];
  revenueTableColumns: ColumnType<{ name: string; value: number }>[];
}

const PrintableContent = React.forwardRef<
  HTMLDivElement,
  PrintableContentProps
>(
  (
    {
      zoneData,
      coachData,
      packageData,
      totalRevenue,
      canceledByArcadeRevenue,
      canceledByCoachRevenue,
      canceledByPlayerRevenue,
      COLORS,
      tableColumns,
      revenueTableColumns,
    },
    ref
  ) => (
    <div ref={ref} style={{ padding: "2%", backgroundColor: "#EFF4FA" }}>
      {/* Zone Bookings Section */}
      <div style={{ marginBottom: "2rem" }}>
        <hr />
        <h3 style={{ color: "#0E458E", textAlign: "center" }}>
          Arena Bookings
        </h3>
        <hr />
        <Row>
          <Col span={12}>
            <PieChart width={500} height={300}>
              <Pie
                data={zoneData}
                cx={150}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
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
          <Col span={12}>
            <Table
              columns={tableColumns}
              dataSource={zoneData}
              pagination={false}
              bordered
              title={() => <h3>Arena Booking Counts</h3>}
            />
          </Col>
        </Row>
      </div>
      <hr />
      {/* Coach Bookings Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0E458E", textAlign: "center" }}>
          Coach Bookings
        </h3>
        <Row>
          <Col span={12}>
            <PieChart width={500} height={300}>
              <Pie
                data={coachData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
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
          <Col span={12}>
            <Table
              columns={tableColumns}
              dataSource={coachData}
              pagination={false}
              bordered
              title={() => <h3>Coach Booking Counts</h3>}
            />
          </Col>
        </Row>
      </div>
      <hr />
      {/* Package Enrollments Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0E458E", textAlign: "center" }}>
          Package Enrollments
        </h3>
        <Row>
          <Col span={12}>
            <PieChart width={500} height={300}>
              <Pie
                data={packageData}
                cx={100}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {packageData.map((entry, index) => (
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
          <Col span={12}>
            <Table
              columns={tableColumns}
              dataSource={packageData}
              pagination={false}
              bordered
              title={() => <h3>Package Enrollment Counts</h3>}
            />
          </Col>
        </Row>
      </div>
      <hr />
      {/* Revenue Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#0E458E", textAlign: "center" }}>Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Total Revenue", value: totalRevenue },
              { name: "Canceled by Arcade", value: canceledByArcadeRevenue },
              { name: "Canceled by Coach", value: canceledByCoachRevenue },
              { name: "Canceled by Player", value: canceledByPlayerRevenue },
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <Table
          columns={revenueTableColumns}
          dataSource={[
            { name: "Total Revenue", value: totalRevenue },
            { name: "Canceled by Arcade", value: canceledByArcadeRevenue },
            { name: "Canceled by Coach", value: canceledByCoachRevenue },
            { name: "Canceled by Player", value: canceledByPlayerRevenue },
          ]}
          pagination={false}
          bordered
          title={() => <h3>Revenue Details</h3>}
        />
      </div>
    </div>
  )
);

const AdminPannel = () => {
  const [zoneBookings, setZoneBookings] = useState<ZoneBookingDetails[]>([]);
  const [coachBookings, setCoachBookings] = useState<CoachBookingDetails[]>([]);
  const [packageEnrollments, setPackageEnrollments] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [canceledByArcadeRevenue, setCanceledByArcadeRevenue] =
    useState<number>(0);
  const [canceledByCoachRevenue, setCanceledByCoachRevenue] =
    useState<number>(0);
  const [canceledByPlayerRevenue, setCanceledByPlayerRevenue] =
    useState<number>(0);

  useEffect(() => {
    const fetchZoneBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadebookings`
        );
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
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getCoachBookings`
        );
        const data = await res.json();
        setCoachBookings(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoachBookings();
  }, []);

  useEffect(() => {
    const fetchPackageEnrollment = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getPackageEnrollmentPlayerDetails`
        );
        const data = await res.json();
        setPackageEnrollments(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPackageEnrollment();
  }, []);

  useEffect(() => {
    // Calculate total revenue from successful bookings
    const totalZoneRevenue = zoneBookings
      .filter((booking) => booking.status === "success")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const totalCoachRevenue = coachBookings
      .filter((booking) => booking.status === "success")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const totalPackageRevenue = packageEnrollments
      .filter((enrollment) => enrollment.status === "success")
      .reduce((acc, enrollment) => acc + Number(enrollment.total_amount), 0);

    setTotalRevenue(totalZoneRevenue + totalCoachRevenue + totalPackageRevenue);

    // Calculate revenue lost due to cancellations
    const canceledByArcadeZoneRevenue = zoneBookings
      .filter((booking) => booking.status === "canceled_By_Arcade")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const canceledByArcadeCoachRevenue = coachBookings
      .filter((booking) => booking.status === "canceled_By_Arcade")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const canceledByArcadePackageRevenue = packageEnrollments
      .filter((enrollment) => enrollment.status === "canceled_By_Arcade")
      .reduce((acc, enrollment) => acc + Number(enrollment.total_amount), 0);

    setCanceledByArcadeRevenue(
      canceledByArcadeZoneRevenue +
        canceledByArcadeCoachRevenue +
        canceledByArcadePackageRevenue
    );

    const canceledByCoachCoachRevenue = coachBookings
      .filter((booking) => booking.status === "canceled_By_Coach")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const canceledByCoachPackageRevenue = packageEnrollments
      .filter((enrollment) => enrollment.status === "canceled_By_Coach")
      .reduce((acc, enrollment) => acc + Number(enrollment.total_amount), 0);

    setCanceledByCoachRevenue(
      canceledByCoachCoachRevenue + canceledByCoachPackageRevenue
    );

    const canceledByPlayerZoneRevenue = zoneBookings
      .filter((booking) => booking.status === "canceled_By_Player")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const canceledByPlayerCoachRevenue = coachBookings
      .filter((booking) => booking.status === "canceled_By_Player")
      .reduce((acc, booking) => acc + Number(booking.full_amount), 0);

    const canceledByPlayerPackageRevenue = packageEnrollments
      .filter((enrollment) => enrollment.status === "canceled_By_Player")
      .reduce((acc, enrollment) => acc + Number(enrollment.total_amount), 0);

    setCanceledByPlayerRevenue(
      canceledByPlayerZoneRevenue +
        canceledByPlayerCoachRevenue +
        canceledByPlayerPackageRevenue
    );
  }, [zoneBookings, coachBookings, packageEnrollments]);

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

  const packageBookingStatusCounts = {
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

  packageEnrollments.forEach((enrollment) => {
    if (enrollment.status.toString() in packageBookingStatusCounts) {
      packageBookingStatusCounts[
        enrollment.status.toString() as keyof typeof packageBookingStatusCounts
      ]++;
    }
  });

  const zoneData = [
    { name: "Success", value: bookingStatusCounts.success },
    {
      name: "Canceled by Player",
      value: bookingStatusCounts.canceled_By_Player,
    },
    {
      name: "Canceled by Arcade",
      value: bookingStatusCounts.canceled_By_Arcade,
    },
    { name: "Canceled by Admin", value: bookingStatusCounts.canceled_By_Admin },
  ];

  const coachData = [
    { name: "Success", value: coachBookingStatusCounts.success },
    {
      name: "Canceled by Player",
      value: coachBookingStatusCounts.canceled_By_Player,
    },
    {
      name: "Canceled by Arcade",
      value: coachBookingStatusCounts.canceled_By_Arcade,
    },
    {
      name: "Canceled by Admin",
      value: coachBookingStatusCounts.canceled_By_Admin,
    },
    {
      name: "Canceled by Coach",
      value: coachBookingStatusCounts.canceled_By_Coach,
    },
  ];

  const packageData = [
    { name: "Success", value: packageBookingStatusCounts.success },
    {
      name: "Canceled by Player",
      value: packageBookingStatusCounts.canceled_By_Player,
    },
    {
      name: "Canceled by Arcade",
      value: packageBookingStatusCounts.canceled_By_Arcade,
    },
    {
      name: "Canceled by Admin",
      value: packageBookingStatusCounts.canceled_By_Admin,
    },
    {
      name: "Canceled by Coach",
      value: packageBookingStatusCounts.canceled_By_Coach,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

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

  const revenueTableColumns: ColumnType<{ name: string; value: number }>[] = [
    {
      title: "Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Revenue",
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
      <Col
        span={19}
        style={{ backgroundColor: "#EFF4FA", padding: "2%", marginLeft: "21%" }}
      >
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
            <h2>Dashboard</h2>
          </Col>
        </Row>
        <PrintableContent
          ref={printableContentRef}
          zoneData={zoneData}
          coachData={coachData}
          packageData={packageData}
          totalRevenue={totalRevenue} // Pass totalRevenue prop
          canceledByArcadeRevenue={canceledByArcadeRevenue}
          canceledByCoachRevenue={canceledByCoachRevenue}
          canceledByPlayerRevenue={canceledByPlayerRevenue}
          COLORS={COLORS}
          tableColumns={tableColumns}
          revenueTableColumns={revenueTableColumns}
        />
      </Col>
    </>
  );
};

export default AdminPannel;
