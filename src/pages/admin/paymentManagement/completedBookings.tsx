import { Col, Row, Button, Empty } from "antd";
import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { ZoneBookingDetails } from "../../../types";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
const CompletedBookings = () => {
  const [value, setValue] = useState(1);
  const [completedBookings, setCompletedBookings] = useState<
    ZoneBookingDetails[]
  >([]);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        if (value === 2) {
          // Fetch only when the value is 2 (Arcade Bookings)
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}api/getCompleteArcadeBookings`
          );
          const data = await res.json();
          console.log(data);
          setCompletedBookings(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompletedBookings();
  }, [value]); // Add value to the dependency array to re-fetch when value changes

  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  console.log("ggggg", completedBookings);
  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Completed bookings</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          {" "}
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Coach Bookings</Radio>
            <Radio value={2}>Arcade Bookings</Radio>
            <Radio value={3}>Enrolled Package</Radio>
            <Radio value={4}>All</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: "white",
          padding: "1%",
          marginTop: "20px",
        }}
      >
        {" "}
        {completedBookings.length === 0 ? (
          <Row
            style={{
              backgroundColor: "white",
              padding: "1%",
              marginTop: "20px",
              marginLeft: "40%",
            }}
          >
            <Empty />
          </Row>
        ) : (
          completedBookings.map((booking, index) => (
            <>
              <Col></Col>
              <Col span={8} style={{}}>
                <div
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#000",
                  }}
                ></div>
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
                  {completedBookings[0]?.zone.zone_name}
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
                  Rs.{" "}
                  {String(
                    Number(completedBookings[0]?.participant_count) *
                      Number(completedBookings[0]?.zone.rate)
                  )}
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
                      cld.image(completedBookings[0]?.user.user_image as string)
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
                  {completedBookings[0]?.user.firstname}{" "}
                  {completedBookings[0]?.user.lastname}
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
            </>
          ))
        )}
      </Row>
    </Col>
  );
};

export default CompletedBookings;
