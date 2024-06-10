import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Table, Button } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useReactToPrint } from "react-to-print";
import {
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
  COLORS: string[];
  tableColumns: ColumnType<{ name: string; value: number }>[];
}

const PrintableContent = React.forwardRef<
  HTMLDivElement,
  PrintableContentProps
>(({ coachData, packageData, COLORS, tableColumns }, ref) => (
  <div ref={ref} style={{ padding: "2%", backgroundColor: "#EFF4FA" }}>
    {/* Zone Bookings Section */}

    {/* Coach Bookings Section */}
    <div style={{ marginBottom: "4rem" }}>
      <h2 style={{ color: "#0E458E", textAlign: "center" }}>Coach Bookings</h2>
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
  </div>
));

const ReportGenarationForCoach = (props: any) => {
  const [zoneBookings, setZoneBookings] = useState<ZoneBookingDetails[]>([]);
  const [filteredArcadeBookings, setFilteredArcadeBookings] = useState<
    ZoneBookingDetails[]
  >([]);
  const [coachBookings, setCoachBookings] = useState<CoachBookingDetails[]>([]);
  const [packageEnrollments, setPackageEnrollments] = useState<any[]>([]);
  const { ArcadeId } = useParams();

  //   useEffect(() => {
  //     const fetchZoneBookings = async () => {
  //       try {
  //         const res = await fetch(
  //           `${process.env.REACT_APP_API_URL}api/getarcadebookings`
  //         );
  //         const data = await res.json();

  //         setFilteredArcadeBookings(data);
  //         const filteredData = data.filter(
  //           (booking: ZoneBookingDetails) =>
  //             booking.zone.arcade.arcade_id === ArcadeId
  //         );
  //         console.log(filteredData);
  //         setZoneBookings(filteredData);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     fetchZoneBookings();
  //   }, []);

  useEffect(() => {
    const fetchCoachBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getcoachDetailsForCoachByCoachId/${props.coach_id}`
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
          coachData={coachData}
          packageData={packageData}
          COLORS={COLORS}
          tableColumns={tableColumns}
          zoneData={[]}
        />
      </Col>
    </>
  );
};

export default ReportGenarationForCoach;
