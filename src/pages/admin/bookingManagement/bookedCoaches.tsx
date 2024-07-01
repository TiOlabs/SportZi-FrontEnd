import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Col, Row, Button, Modal, Empty, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoachBookingDetails, ZoneBookingDetails } from "../../../types";
import { ExclamationCircleFilled } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import axios from "axios";
import { SearchProps } from "antd/es/input";

const BookedCoaches = (props: any) => {
  const [coachBookingDetails, setCoachBookingDetails] = useState<
    CoachBookingDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [filteredDataa, setFilteredData] = useState<CoachBookingDetails[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const res = await fetch(`http://localhost:8000/api/getCoachBookings`);
  //       const data = await res.json();
  //       console.log(data);
  //       setCoachBookingDetails(data);
  //       console.log(coachBookingDetails);
  //       const filteredData = coachBookingDetails.filter(
  //         (coachBookingDetails: CoachBookingDetails) =>
  //           coachBookingDetails.status === "success"
  //       );
  //       setFilteredData(filteredData);
  //       console.log(filteredData);
  //       setLoading(false);
  //     };
  //     fetchData();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [coachBookingDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getCoachBookings`
        );
        const data = await res.data;
        setCoachBookingDetails(data);

        let sortedBookings = data.filter(
          (coachBooking: { status: string }) =>
            coachBooking.status === "success"
        );

        // Filter based on search string and status
        sortedBookings = sortedBookings.filter(
          (coachBooking: CoachBookingDetails) =>
            (search === "" || coachBooking.status === "success") &&
            (coachBooking.zone.zone_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
              coachBooking.player.user.firstname
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              coachBooking.date.includes(search) ||
              (
                Number(coachBooking.zone.rate) *
                  Number(coachBooking.participant_count) +
                Number(coachBooking.zone.rate) *
                  Number(coachBooking.participant_count)
              )
                .toString()
                .includes(search))
        );

        setCoachBookingDetails(sortedBookings);
        setCoachBookingDetails(sortedBookings);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [search]);

  const filteredBookings = coachBookingDetails.filter(
    (coachBookingDetails) =>
      coachBookingDetails.booking_id
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      coachBookingDetails.player.user.firstname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      coachBookingDetails.player.user.lastname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      coachBookingDetails.coach.user.firstname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      coachBookingDetails.coach.user.lastname
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  return (
    <Col
      span={19}
      style={{ backgroundColor: "#EFF4FA", padding: "2%", marginLeft: "21%" }}
    >
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>Booked Arena</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <input
              style={{ width: "100%", height: "40px" }}
              type="search"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
        <Col
          style={{ marginTop: "20px", maxHeight: "80vh", overflowY: "auto" }}
        >
          {filteredBookings.length === 0 ? <Empty /> : null}
          {filteredBookings.map(
            (CoachBookingDetails: CoachBookingDetails) => {
              console.log(CoachBookingDetails); // Logging CoachBookingDetails
              return (
                <DataRow
                  booking_id={CoachBookingDetails.booking_id}
                  booked_Coach={`${CoachBookingDetails.coach.user.firstname} ${CoachBookingDetails.coach.user.lastname}`}
                  booked_by={`${CoachBookingDetails.player.user.firstname} ${CoachBookingDetails.player.user.lastname}`}
                  rate={
                    Number(CoachBookingDetails.coach.rate) *
                    Number(CoachBookingDetails.participant_count)
                  }
                  user_id={CoachBookingDetails.player.user.user_id}
                  zone_id={CoachBookingDetails.zone.zone_id}
                  zone={CoachBookingDetails.zone.zone_name}
                  arcade={CoachBookingDetails.arcade.arcade_name}
                  arcade_id={CoachBookingDetails.arcade_id}
                  booking_date={CoachBookingDetails.date}
                  booking_time={CoachBookingDetails.time}
                  participant_count={CoachBookingDetails.participant_count}
                  created_at={CoachBookingDetails.created_at}
                  image={CoachBookingDetails.player.user.user_image}
                  coach_image={CoachBookingDetails.coach.user.user_image}
                  coach_id={CoachBookingDetails.coach.coach_id}
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
              );
            }
          )}
        </Col>
      </Spin>
    </Col>
  );
};

export default BookedCoaches;

function DataRow(props: any) {
  console.log(props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coachBookingCreateTime, setCoachBookingCreateTime] =
    useState<CoachBookingDetails>();
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
        let created_at, player_id;
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}api/getCoachBookinByBookingId/${props.booking_id}`
          );
          setCoachBookingCreateTime(res.data);
          console.log(res.data);
          created_at = res.data.created_at;
          player_id = res.data.player_id;
          console.log(created_at);
          console.log(player_id);
          console.log(coachBookingCreateTime);
        } catch (error) {
          console.log(error);
        }

        try {
          const res = await axios.put(
            `${process.env.REACT_APP_API_URL}api/updateArcadeBookingByCreatedTime/${created_at}/${player_id}`,
            {
              status: "canceled_By_Admin",
            }
          );

          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
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
            `${process.env.REACT_APP_API_URL}api/updatecoachBooking/${props.booking_id}`,
            {
              booking_id: props.booking_id,
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

          // if (props.arcadeBookings.length > 0) {
          //   const data = props.arcadeBookings.filter(
          //     (arcadeBooking: any) => arcadeBooking.id !== props.booking_id
          //   );
          //   props.setArcadeBookings(data);

          // }
          props.setCoachBookingDetails((prev: any) => {
            return prev.filter(
              (zoneBookingDetails: ZoneBookingDetails) =>
                zoneBookingDetails.zone_booking_id !== props.booking_id
            );
          });
        } catch (error) {
          console.log("error");
          console.log(error);
        }
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}api/updatearcadebooking/${props.booking_id}`,
            {
              booking_id: props.booking_id,
              status: "canceled_By_Admin",
            }
          );
          props.setCoachBookingDetails((prev: any) => {
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

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/CoachUser/:${props.coach_id}`);
  };
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
          onClick={handleClick}
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "80px",
            height: "80px",
          }}
          cldImg={
            cld.image(props?.coach_image)
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
          {props.booked_Coach}
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
                      <b>Coach :</b> {props.booked_Coach}
                    </Col>
                    <Col span={8}>
                      <b>Coach_ID</b> : {props.coach_id}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={16}>
                      <b>Arcade :</b> {props.arcade}
                    </Col>
                    <Col span={8}>
                      <b>Arcade_ID</b> : {props.arcade_id}
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
