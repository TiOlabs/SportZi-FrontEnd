import {
  Col,
  Row,
  Button,
  Modal,
  Empty,
  Dropdown,
  Space,
  MenuProps,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  DollarOutlined,
  DownOutlined,
  ExclamationCircleFilled,
  SortAscendingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ZoneBookingDetails } from "../../../types";
import { Spin } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from "react-router-dom";
import { SearchProps } from "antd/es/input";
import { on } from "events";
const { confirm } = Modal;

const BookedArena = (props: any) => {
  const [zoneBookingDetails, setZoneBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDataa, setFilteredData] = useState<ZoneBookingDetails[]>([]);
  const [search, setSearch] = useState<string>("");
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/getarcadebookings`);
      const data = await res.json();
      let sortedBookings = data.filter(
        (zoneBooking: { booking_type: string; status: string }) =>
          zoneBooking.status === "success" &&
          zoneBooking.booking_type === "zone"
      );

      // Filter based on search input and status "success"
      if (search !== "") {
        sortedBookings = sortedBookings.filter(
          (zoneBookingDetails: ZoneBookingDetails) =>
            zoneBookingDetails.status === "success" &&
            (zoneBookingDetails.zone.zone_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
              zoneBookingDetails.user.firstname
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              zoneBookingDetails.date.includes(search) ||
              (
                Number(zoneBookingDetails.zone.rate) *
                Number(zoneBookingDetails.participant_count)
              )
                .toString()
                .includes(search))
        );
      }

      setFilteredData(sortedBookings);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  console.log(props.arcadeBookings);
  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    message.info("Click on menu item.");
    console.log("click");
    console.log("click", e);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/getarcadebookings`);
      const data = await res.json();
      console.log("data", data);
      setZoneBookingDetails(data);
      const filteredData2 = data.filter(
        (zoneBookingDetails: ZoneBookingDetails) =>
          zoneBookingDetails.status === "success"
      );
      console.log("filteredData2", filteredData2);
      let sortedBookings = [...filteredData2];

      switch (e.key) {
        case "1":
          sortedBookings.sort(
            (a: ZoneBookingDetails, b: ZoneBookingDetails) => {
              console.log("a", a.zone.rate);
              console.log("b", b.zone.rate);
              const rateA = Number(a.zone.rate) * Number(a.participant_count);
              const rateB = Number(b.zone.rate) * Number(b.participant_count);
              console.log("rateA", rateA);
              console.log("rateB", rateB);
              return rateB - rateA; // Sort in descending order of rate
            }
          );
          break;
        // eslint-disable-next-line no-fallthrough
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
        // Add cases for other filters if needed
        default:
          break;
      }
      console.log("sortedBookings", sortedBookings);
      setFilteredData(sortedBookings);
    } catch (error) {
      console.error("Error fetching and sorting data:", error);
    } finally {
      setLoading(false);
    }
  };
  const onSearch: SearchProps["onSearch"] = (value: string) => {
    setSearch(value.trim());
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
  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Booked Arena</h2>
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
        <Col
          style={{ marginTop: "20px", maxHeight: "80vh", overflowY: "auto" }}
        >
          {filteredDataa.length === 0 ? <Empty /> : null}
          {filteredDataa.map((ZoneBookingDetails: ZoneBookingDetails) => (
            <DataRow
              booking_id={ZoneBookingDetails.zone_booking_id}
              booked_Arena={ZoneBookingDetails.zone.zone_name}
              booked_by={ZoneBookingDetails.user.firstname}
              rate={
                ZoneBookingDetails.full_amount
              }
              user_id={ZoneBookingDetails.user.user_id}
              zone_id={ZoneBookingDetails.zone.zone_id}
              zone={ZoneBookingDetails.zone.zone_name}
              booking_date={ZoneBookingDetails.date}
              booking_time={ZoneBookingDetails.time}
              participant_count={ZoneBookingDetails.participant_count}
              created_at={ZoneBookingDetails.created_at}
              image={ZoneBookingDetails.user.user_image}
              zone_image={ZoneBookingDetails.zone.zone_image}

              // arcadeBookings={props.arcadeBookings}
              // setArcadeBookings={props.setArcadeBookings}
              // key={arcadeBooking.id}
              // zone={arcadeBooking.zone}
              // booking_id={arcadeBooking.id}
              // booking_date={arcadeBooking.booking_date}
              // booking_time={arcadeBooking.booking_time}
              // participant_count={arcadeBooking.participant_count}
              // created_at={arcadeBooking.created_at}
              // cancel_by_arcade={arcadeBooking.cancel_by_arcade}
              // cancel_by_player={arcadeBooking.cancel_by_player}
              // cancel_by_admin={arcadeBooking.cancel_by_admin}
            />
          ))}
        </Col>
      </Spin>
    </Col>
  );
};

export default BookedArena;

function DataRow(props: any) {
  console.log(props);
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
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure cancel this task?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect to the user and the arcade.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        // try{
        //   const res = await axios.post(
        //     `http://localhost:8000/api/arcadebookingcancel/${props.booking_id}`,
        //     {
        //       id: props.booking_id,
        //     }
        //   )
        // }
        // catch(error){
        //   console.log(error);
        // }
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}api/updatearcadebooking/${props.booking_id}`,
            {
              zone_booking_id: props.booking_id,
              status: "canceled_By_Admin",
            }
          );
          // const res = await axios.delete(
          //   `http://localhost:8000/api/deletearcadebooking/${props.booking_id}`,
          //   {
          //     data: {
          //       id: props.id,
          //     },
          //   }
          // );
          console.log(props.arcadeBookings);

          // if (props.arcadeBookings.length > 0) {
          //   const data = props.arcadeBookings.filter(
          //     (arcadeBooking: any) => arcadeBooking.id !== props.booking_id
          //   );
          //   props.setArcadeBookings(data);

          // }
          props.setZoneBookingDetails((prev: any) => {
            return prev.filter(
              (zoneBookingDetails: ZoneBookingDetails) =>
                zoneBookingDetails.zone_booking_id !== props.booking_id
            );
          });
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
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
        marginTop: "50px",
      }}
    >
      <Col></Col>
      <Col span={7} style={{}}>
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
      <Col span={4} style={{}}>
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
          {props.zone}
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
      <Col span={4} style={{}}>
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
            onClick={showDeleteConfirm}
            style={{ width: "100px", marginLeft: "20px" }}
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
              Cancel
            </div>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
