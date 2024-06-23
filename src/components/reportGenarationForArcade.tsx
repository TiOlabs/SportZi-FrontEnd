import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Table, Button } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import { useReactToPrint } from "react-to-print";
import {
  Arcade,
  CoachBookingDetails,
  PackageEnroolDetailsForPlayer,
  ZoneBookingDetails,
} from "../types";
import { ColumnType } from "antd/es/table";
import { useParams } from "react-router-dom";

interface PrintableContentProps {
  zoneData: { name: string; value: number }[];
  coachData: { name: string; value: number }[];
  packageData: { name: string; value: number }[];
  bookingData: { name: string; value: number }[];
  COLORS: string[];
  tableColumns: ColumnType<{ name: string; value: number }>[];
  tableColumnsForZone: ColumnType<{ name: string; value: number }>[];
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
      bookingData,
      COLORS,
      tableColumns,
      tableColumnsForZone,
    },
    ref
  ) => (
    <div ref={ref} style={{ padding: "2%", backgroundColor: "#EFF4FA" }}>
      {/* Zone Bookings Section */}
      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ color: "#0E458E", textAlign: "center" }}>
          Arena Bookings
        </h2>

        <Row>
          <Col span={16}>
            <PieChart width={500} height={400}>
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
              <Legend layout="vertical" verticalAlign="bottom" align="right" />
            </PieChart>
          </Col>
          <Col span={8}>
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
      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ color: "#0E458E", textAlign: "center" }}>
          Coach Bookings
        </h2>
        <Row>
          <Col span={16}>
            <PieChart width={500} height={400}>
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
              <Legend layout="vertical" verticalAlign="bottom" align="right" />
            </PieChart>
          </Col>
          <Col span={8}>
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
      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ color: "#0E458E", textAlign: "center" }}>
          Package Enrollments
        </h2>
       
        <Row>
          <Col span={16}>
            <PieChart width={500} height={400}>
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
              <Legend layout="vertical" verticalAlign="bottom" align="right" />
            </PieChart>
          </Col>
          <Col span={8}>
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

      <div style={{ marginBottom: "4rem" }}>
      <hr />
        <h2 style={{ color: "#0E458E", textAlign: "center" }}>
          Booking Details
        </h2>
        <Row>
          <Col span={16}>
            <BarChart
              width={500}
              height={400}
              data={bookingData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {bookingData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </Col>
          <Col span={8}>
            <Table
              columns={tableColumnsForZone}
              dataSource={bookingData}
              pagination={false}
              bordered
              title={() => <h3>Booking Counts</h3>}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
);

const ReportGenarationForArcade = () => {
  const [zoneBookings, setZoneBookings] = useState<ZoneBookingDetails[]>([]);
  const [filteredArcadeBookings, setFilteredArcadeBookings] = useState<
    ZoneBookingDetails[]
  >([]);
  const [coachBookings, setCoachBookings] = useState<CoachBookingDetails[]>([]);
  const [packageEnrollments, setPackageEnrollments] = useState<any[]>([]);
  const [zoneDetails, setZoneDetails] = useState<Arcade>();
  const { ArcadeId } = useParams();

  useEffect(() => {
    const fetchZoneBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadebookings`
        );
        const data = await res.json();

        setFilteredArcadeBookings(data);
        const filteredData = data.filter(
          (booking: ZoneBookingDetails) =>
            booking.zone.arcade.arcade_id === ArcadeId
        );
        console.log(filteredData);
        setZoneBookings(filteredData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchZoneBookings();
  }, []);

  useEffect(() => {
    const fetchZoneDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails/${ArcadeId}`
        );
        const data = await res.json();
        setZoneDetails(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchZoneDetails();
  }, []);

  useEffect(() => {
    const fetchCoachBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getCoachBookingByArcadeId/${ArcadeId}`
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
        const filteredData = data.filter(
          (enrollment: PackageEnroolDetailsForPlayer) =>
            enrollment.package.arcade_id === ArcadeId
        );
        setPackageEnrollments(filteredData);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPackageEnrollment();
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
  const packageBookingStatusCounts = {
    success: 0,
    canceled_By_Player: 0,
    canceled_By_Arcade: 0,
    canceled_By_Admin: 0,
    canceled_By_Coach: 0,
  };
  const zonebookingStatusCounts: { [key: string]: number } = {};
  zoneDetails?.zone.forEach((zone) => {
    zonebookingStatusCounts[zone.zone_id.toString()] = 0;
  });

  zoneBookings.forEach((booking) => {
    if (booking.status.toString() in bookingStatusCounts) {
      bookingStatusCounts[
        booking.status.toString() as keyof typeof bookingStatusCounts
      ]++;
    }
  });

  zoneDetails?.zone.forEach((zone) => {
    zone.zoneBookingDetails.forEach((booking) => {
      if (booking.zone.zone_id.toString() in zonebookingStatusCounts) {
        zonebookingStatusCounts[
          booking.zone.zone_id.toString() as keyof typeof zonebookingStatusCounts
        ]++;
      }
    });
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

  const bookingData = zoneDetails?.zone
    ? zoneDetails.zone.map((zone) => ({
        name: zone.zone_name as string,
        value: zonebookingStatusCounts
          ? zonebookingStatusCounts[zone.zone_id.toString()]
          : 0,
      }))
    : [];
  //   const bookingData = [
  //     { name: "Success", value: bookingStatusCounts.success },
  //     {
  //       name: "Canceled by Player",
  //       value: bookingStatusCounts.canceled_By_Player,
  //     },
  //     {
  //       name: "Canceled by Arcade",
  //       value: bookingStatusCounts.canceled_By_Arcade,
  //     },
  //     { name: "Canceled by Admin", value: bookingStatusCounts.canceled_By_Admin },
  //   ];
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

  const tableColumnsForZone: ColumnType<{ name: string; value: number }>[] = [
    {
      title: "Zone",
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
      <Col span={24} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
        <Row justify="space-between">
          <Col></Col>
          <Col>
            <Button type="primary" ghost onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>

        <PrintableContent
          ref={printableContentRef}
          zoneData={zoneData}
          coachData={coachData}
          packageData={packageData}
          bookingData={bookingData}
          COLORS={COLORS}
          tableColumns={tableColumns}
          tableColumnsForZone={tableColumnsForZone}
        />
      </Col>
    </>
  );
};

export default ReportGenarationForArcade;
