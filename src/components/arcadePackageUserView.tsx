import {
  Button,
  Col,
  Form,
  Grid,
  InputNumber,
  Modal,
  Row,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import UpdatePackage from "./UpdatePackage";
import axios from "axios";
import { useUser } from "../context/userContext";
import PaymentModal from "./paymentCheckout";
import { CoachAssignDetails, User } from "../types";
import DisabledContext from "antd/es/config-provider/DisabledContext";

const ArcadePackageUserView = (props: any) => {
  const { userDetails } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<User>();
  const [duration, setDuration] = useState("");
  const [coachisInArcade, setcoachisInArcade] = useState<CoachAssignDetails[]>(
    []
  );
  console.log("lol ", props);
  console.log("lol ", props.packageImage);
  const { useBreakpoint } = Grid;
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    window.location.reload();
  };
  const { lg } = useBreakpoint();
  console.log(userDetails);
  const fullAmount = props.rate * parseInt(duration);
  const handleFinish = async () => {
    // try {
    //   const durationInt = parseInt(duration);
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_API_URL}api/addPackageEnrollmentPlayerDetails`,
    //     {
    //       package_id: props.package_id,
    //       player_id: userDetails?.id,
    //       duration: durationInt,
    //       rate: fullAmount,
    //     }
    //   );
    //   console.log("res", res);
    //   setIsModalOpen(false);
    // } catch (err) {
    //   console.log("err", err);
    // }
  };
  if (userDetails?.role === "COACH") {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getcoachassignvaluesById/${userDetails?.id}`
        );
        const data = await res.data;
        console.log(data);
        setcoachisInArcade(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getuser/${props.player_id}`
        );
        const data = await res.data;
        console.log(data);
        setPaymentDetails(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  const isCoachInArcade = coachisInArcade.some(
    (entry) => entry.arcade.arcade_id === props.arcade_id
  );
  const handleJoinClick = () => {
    if (isCoachInArcade) {
      // If the coach is in the arcade, show the modal
      showModal();
    } else {
      // If the coach is not in the arcade, show the message
      message.warning("You have to apply to the arcade first.");
    }
  };
  return (
    <>
      <Row
        style={{
          boxShadow: "0.2px 0.2px 2px 0.2px rgba(0, 0, 0, 0.2)",

          width: lg ? "360px" : "300px",
          minHeight: lg ? "400px" : "350px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "felx-start",
        }}
      >
        <Row
          style={{
            width: "100%",
            height: lg ? "170px" : "150px",
          }}
        >
          <AdvancedImage
            style={{ height: "100%", width: "100%" }}
            cldImg={cld.image(props.package_image)}
          />
        </Row>
        <Row
          style={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Col
            xs={24}
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontSize: lg ? "22px" : "20px",
                fontWeight: "500",
                color: "#003783",
              }}
            >
              {" "}
              {props.packageName}
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "20px" : "18px",
                fontWeight: "light",
                color: "black",
                width: "80%",
                fontFamily: "kanit",
              }}
            >
              Conduct By
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "20px" : "18px",
                fontWeight: "light",
                color: "black",
                width: "80%",
              }}
            >
              Arcade : {props.ArcadeName}
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "16px" : "14px",
                fontWeight: "extra-light",
                color: "black",
                width: "80%",
              }}
            >
              {props.packageDescription}
            </Typography>
            <Row
              style={{
                marginTop: "10px",
                width: "100%",
                display: "flex",
              }}
            >
              <Col
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    fontSize: lg ? "18px " : "16px",
                    fontFamily: "kanit",
                    fontWeight: "500",
                    color: "#5587CC",
                  }}
                >
                  Rs.{props.rate}
                </Typography>
                <Typography
                  style={{
                    fontSize: lg ? "18px " : "16px",
                    fontFamily: "kanit",
                    fontWeight: "500",
                    color: "#5587CC",
                  }}
                >
                  per month
                </Typography>
              </Col>
              <Col
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {userDetails?.role === "COACH" ? (
                  <Button
                    style={{
                      backgroundColor: "#EFF4FA",
                      color: "#0E458E",
                      borderRadius: "3px",
                      fontFamily: "kanit",
                      borderColor: "#0E458E",
                    }}
                    onClick={handleJoinClick}
                  >
                    JOIN
                  </Button>
                ) : userDetails?.role === "PLAYER" ||
                  userDetails?.role === "MANAGER" ? (
                  <Button
                    style={{
                      backgroundColor: "#EFF4FA",
                      color: "#0E458E",
                      borderRadius: "3px",
                      fontFamily: "kanit",
                      borderColor: "#0E458E",
                    }}
                    onClick={showModal}
                  >
                    Enroll
                  </Button>
                ) : null}
                {userDetails?.role === "PLAYER" ||
                userDetails?.role === "MANAGER" ? (
                  <Modal
                    visible={isModalOpen}
                    // onOk={handleFinish}
                    okButtonProps={{ disabled: true }}
                    onCancel={handleCancel}
                    width={800}
                  >
                    <Form
                      layout="vertical"
                      style={{ marginTop: "10%", margin: "2%" }}
                      onFinish={handleFinish}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "#0E458E",
                        }}
                      >
                        <h1>Application Form - For Enroll to the Package</h1>
                      </div>
                      <Form.Item
                        name="duration"
                        label="Add duration (in months)"
                        rules={[
                          {
                            type: "number",
                            message: "Please enter a duration!",
                          },
                          {
                            required: true,
                            message: "Please input a duration!",
                          },
                          {
                            validator: (_, value) => {
                              if (value <= 0) {
                                return Promise.reject(
                                  "duration should be greater than 0"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Duration in months"
                          style={{ width: "100%" }}
                          onChange={(value) =>
                            setDuration(value?.toString() || "")
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "0%",
                          }}
                        >
                          {contextHolder}

                          <PaymentModal
                            htmlType="submit"
                            item={"Zone Booking"}
                            orderId={5}
                            amount={fullAmount}
                            currency={"LKR"}
                            first_name={paymentDetails?.firstname}
                            last_name={paymentDetails?.lastname}
                            email={paymentDetails?.email}
                            phone={paymentDetails?.Phone}
                            address={paymentDetails?.address}
                            city={paymentDetails?.city}
                            country={paymentDetails?.country}
                            // date={props.created_at}
                            // time={time}
                            duration={parseInt(duration)}
                            pcount={1}
                            userId={userDetails?.id}
                            zoneId={props.zone_id}
                            arcade_id={props.arcade_id}
                            package_id={props.package_id}
                            // reservation_type={zone}
                            // avaiableParticipantCount={
                            //   Number(capacity) -
                            //   (timeParticipantCounts1.find((item) => item.time === time)
                            //     ?.totalParticipantCount ?? 0)
                            // }
                          />
                        </div>
                      </Form.Item>
                    </Form>
                  </Modal>
                ) : (
                  <Modal
                    visible={isModalOpen}
                    onOk={handleFinish}
                    onCancel={handleCancel}
                    width={800}
                  >
                    <Form
                      layout="vertical"
                      style={{ marginTop: "10%", margin: "2%" }}
                      onFinish={handleFinish}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "#0E458E",
                        }}
                      >
                        <h1>Application Form - For Enroll to the Package</h1>
                      </div>
                      <Form.Item
                        name="duration"
                        label="Add duration (in months)"
                        rules={[
                          {
                            type: "number",
                            message: "Please enter a duration!",
                          },
                          {
                            required: true,
                            message: "Please input a duration!",
                          },
                          {
                            validator: (_, value) => {
                              if (value <= 0) {
                                return Promise.reject(
                                  "duration should be greater than 0"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Duration in months"
                          style={{ width: "100%" }}
                          onChange={(value) =>
                            setDuration(value?.toString() || "")
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "0%",
                          }}
                        >
                          {contextHolder}

                          <PaymentModal
                            htmlType="submit"
                            item={"Zone Booking"}
                            orderId={5}
                            amount={fullAmount}
                            currency={"LKR"}
                            first_name={paymentDetails?.firstname}
                            last_name={paymentDetails?.lastname}
                            email={paymentDetails?.email}
                            phone={paymentDetails?.Phone}
                            address={paymentDetails?.address}
                            city={paymentDetails?.city}
                            country={paymentDetails?.country}
                            // date={props.created_at}
                            // time={time}
                            duration={duration}
                            pcount={1}
                            userId={userDetails?.id}
                            zoneId={props.zone_id}
                            arcade_id={props.arcade_id}
                            // reservation_type={zone}
                            // avaiableParticipantCount={
                            //   Number(capacity) -
                            //   (timeParticipantCounts1.find((item) => item.time === time)
                            //     ?.totalParticipantCount ?? 0)
                            // }
                          />
                        </div>
                      </Form.Item>
                    </Form>
                  </Modal>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  );
};
export default ArcadePackageUserView;
