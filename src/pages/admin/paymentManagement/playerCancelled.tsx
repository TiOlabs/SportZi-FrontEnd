import {
  Col,
  Row,
  Button,
  Modal,
  Spin,
  Empty,
  Checkbox,
  Dropdown,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import type { GetProp, MenuProps, RadioChangeEvent } from "antd";
import { Radio } from "antd";
import axios from "axios";
import { ZoneBookingDetails } from "../../../types";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { any } from "prop-types";
import {
  DollarOutlined,
  DownOutlined,
  SortAscendingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
const PlayerCanceled = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<number>(1);
  const [playerBookingDetails, setPlayerBookingDetails] = useState<
    ZoneBookingDetails[]
  >([]);
  const [playerCanceled, setPlayerCanceled] = useState<ZoneBookingDetails[]>(
    []
  );
  const [canceledByPlayer, setCanceledByPlayer] = useState<
    ZoneBookingDetails[]
  >([]);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getarcadebookings`
      );
      const data = await res.data;
      setPlayerBookingDetails(data);

      const playerCanceledBookings = data.filter(
        (arcadeBooking: ZoneBookingDetails) =>
          arcadeBooking.status === "canceled_By_Player" &&
          arcadeBooking.booking_type === "zone" &&
          (arcadeBooking.zone.zone_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            arcadeBooking.user.firstname
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

      setCanceledByPlayer(playerCanceledBookings);
      filterBookingsByTime(playerCanceledBookings, value);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const filterBookingsByTime = (
    bookings: ZoneBookingDetails[],
    filterValue: number
  ) => {
    if (filterValue === 1) {
      const below24Hours = bookings.filter(
        (arcadeBooking: ZoneBookingDetails) => {
          const createdAt = new Date(
            arcadeBooking.created_at as string
          ).getTime();
          const canceledTime = new Date(
            arcadeBooking.canceled_at as string
          ).getTime();
          const timeDifference = canceledTime - createdAt;
          const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
          return timeDifference < twentyFourHoursInMillis;
        }
      );
      setPlayerCanceled(below24Hours);
    } else if (filterValue === 2) {
      const above24Hours = bookings.filter(
        (arcadeBooking: ZoneBookingDetails) => {
          const createdAt = new Date(
            arcadeBooking.created_at as string
          ).getTime();
          const canceledTime = new Date(
            arcadeBooking.canceled_at as string
          ).getTime();
          const timeDifference = canceledTime - createdAt;
          const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
          return timeDifference >= twentyFourHoursInMillis;
        }
      );
      setPlayerCanceled(above24Hours);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setValue(newValue);
    filterBookingsByTime(canceledByPlayer, newValue);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    filterBookingsByTime(canceledByPlayer, value);
  }, [value, canceledByPlayer]);

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    setSearch(value.trim());
  };

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    message.info("Click on menu item.");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/getarcadebookings`
      );
      const data = await res.json();
      setPlayerCanceled(data);
      const filteredData2 = data.filter(
        (zoneBookingDetails: ZoneBookingDetails) =>
          zoneBookingDetails.status === "success"
      );
      let sortedBookings = [...filteredData2];
      switch (e.key) {
        case "1":
          sortedBookings.sort(
            (a: ZoneBookingDetails, b: ZoneBookingDetails) => {
              const rateA = Number(a.zone.rate) * Number(a.participant_count);
              const rateB = Number(b.zone.rate) * Number(b.participant_count);
              return rateB - rateA;
            }
          );
          break;
        case "2":
          sortedBookings.sort(
            (a: ZoneBookingDetails, b: ZoneBookingDetails) => {
              const nameA = a.zone.arcade.arcade_name.toLowerCase();
              const nameB = b.zone.arcade.arcade_name.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            }
          );
          break;
        default:
          break;
      }
      setPlayerCanceled(sortedBookings);
    } catch (error) {
      console.error("Error fetching and sorting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Price High to Low",
      key: "1",
      icon: <DollarOutlined />,
    },
    {
      label: "By Alperbertical order",
      key: "2",
      icon: <SortAscendingOutlined />,
    },
    {
      label: "Coach-3",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "Coach-4",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Cancelled By Player - Arena Bookings</h2>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <input
              style={{ width: "100%", height: "40px" }}
              type="search"
              placeholder="Search here"
              onChange={(e) => onSearch(e.target.value)}
            />
          </Col>
          <Col span={3}>
            <Dropdown menu={menuProps}>
              <Button style={{ height: 40 }}>
                <Space>
                  Filter By
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>
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
          {playerCanceled.length === 0 ? <Empty /> : null}
          {playerCanceled.map((ZoneBookingDetails: ZoneBookingDetails) => (
            <DataRow
              booking_id={ZoneBookingDetails.zone_booking_id} // Fix: Access the zone_booking_id property from ZoneBookingDetails
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
          ))}
        </Col>
      </Spin>
    </Col>
  );
};

export default PlayerCanceled;

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
            cld.image(props?.zone_image)
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
          Rs.{props.rate}
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
