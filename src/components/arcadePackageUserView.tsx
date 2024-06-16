import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Row,
  Typography,
  message,
} from "antd";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import axios from "axios";
import { useUser } from "../context/userContext";
import PaymentModal from "./paymentCheckout";
import {
  CoachAssignDetails,
  CoachEnrollDetailsForPackages,
  User,
} from "../types";

const ArcadePackageUserView = (props: any) => {
  const { userDetails } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<User>();
  const [duration, setDuration] = useState("");
  const [coachPackageDescription, setCoachPackageDescription] = useState("");
  const [CoachDetailsForPackageEnroll, setCoachDetailsForPackageEnroll] =
    useState<CoachEnrollDetailsForPackages[]>([]);
  const [coachisInArcade, setcoachisInArcade] = useState<CoachAssignDetails[]>(
    []
  );
  console.log("props", CoachDetailsForPackageEnroll[0]?.package_id);  
  console.log("props", props.package_id);
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
  const fullAmount = props.rate * parseInt(duration);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleFinish = async () => {
    setLoading(true);
    if (userDetails?.role === "COACH") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/addPackageEnrollmentCoachDetails`,
          {
            coach_id: userDetails?.id,
            package_id: props.package_id,
            description: coachPackageDescription,
            duration: parseInt(duration),
          }
        );
        console.log(res.data);
        setIsModalOpen(false);
        setLoading(false);
        setIsButtonVisible(false);
      } catch (err) {
        console.log("err", err);
      }
      return;
    }
    if (userDetails?.role === "PLAYER" || userDetails?.role === "MANAGER") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/addPackageEnrollmentPlayerDetails`,
          {
            package_id: props.package_id,
            player_id: userDetails?.id,
            duration: parseInt(duration),
            rate: fullAmount,
            arcade_id: props.arcade_id,
          }
        );
        console.log("res", res);
        setIsModalOpen(false);
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  useEffect(() => {
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
  }, [userDetails?.id]);
  useEffect(() => {
    if (userDetails?.role === "COACH") {
      try {
        const fetchData = async () => {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}api/getPackageEnrollmentCoachDetailsById/${userDetails?.id}`
          );
          console.log("res", res.data);
          const data = await res.data;
          const filteredData = data.filter(
            (item: { package: any; arcade_id: any }) =>
              item.package.arcade_id === props.arcade_id
          );
          setCoachDetailsForPackageEnroll(filteredData);
        };
        fetchData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [userDetails?.id]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getuser/${props.player_id}`
        );
        const data = await res.data;

        setPaymentDetails(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [props.player_id]);

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
        <Row>
          <Col
            xs={24}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></Col>
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
              Zone : {props.zone_name}
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

            <Typography
              style={{
                fontSize: lg ? "16px" : "14px",
                fontWeight: "extra-light",
                color: "red",
                width: "80%",
                fontFamily: "kanit",
              }}
            >
              {props.coachPresentage}% of the rate will be given to the coach
            </Typography>
            <Row>
              <Col
                xs={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Row>
                    <Col xs={6}>
                      <Typography
                        style={{
                          fontSize: lg ? "18px" : "16px",
                          fontFamily: "kanit",
                          fontWeight: "400",
                          color: "#5587CC",
                        }}
                      >
                        Day & Time
                      </Typography>
                    </Col>
                    <Col xs={18}>
                      {props.day.map(
                        (
                          d:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined,
                          index: Key | null | undefined
                        ) => (
                          <Typography
                            key={index}
                            style={{
                              fontSize: lg ? "18px" : "16px",
                              fontFamily: "kanit",
                              fontWeight: "300",
                            }}
                          >
                            {d}{" "}
                            {props.time &&
                              typeof index === "number" &&
                              props.time[index]}
                          </Typography>
                        )
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
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
                {isButtonVisible &&
                  (userDetails?.role === "COACH" ||
                    userDetails?.role === "PLAYER" ||
                    userDetails?.role === "MANAGER") && (
                    <>
                      {CoachDetailsForPackageEnroll[0]?.status === "pending" && CoachDetailsForPackageEnroll[0]?.package_id === props.package_id ? (
                        <p style={{ color: "green" }}>
                          Request sent successfully
                        </p>
                      ) : CoachDetailsForPackageEnroll[0]?.status === "success" && CoachDetailsForPackageEnroll[0]?.package_id === props.package_id ? (
                        <p style={{ color: "green" }}>Successfully joined</p>
                      ) : CoachDetailsForPackageEnroll[0]?.status === "rejected" && CoachDetailsForPackageEnroll[0]?.package_id === props.package_id ? (
                        <p style={{ color: "red" }}>You are rejected</p>
                      ) : (
                        <Button
                          style={{
                            backgroundColor: "#EFF4FA",
                            color: "#0E458E",
                            borderRadius: "3px",
                            fontFamily: "kanit",
                            borderColor: "#0E458E",
                          }}
                          onClick={showModal}
                          loading={loading}
                        >
                          {userDetails?.role === "COACH"
                            ? "Join Now"
                            : "Enroll"}
                        </Button>
                      )}
                    </>
                  )}
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
                        <h1>
                          Application Form - For Enroll to the Package(Coach)
                        </h1>
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
                      <Form.Item
                        name="description"
                        label="Add description or note"
                        rules={[
                          {
                            type: "string",
                            message: "Please enter note!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Add a note"
                          onChange={(e) =>
                            setCoachPackageDescription(e.target.value)
                          }
                        />
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
