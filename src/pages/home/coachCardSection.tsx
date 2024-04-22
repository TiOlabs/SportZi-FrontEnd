import { Button, Col, Row, Skeleton, Typography } from "antd";
import CoachCard from "../../components/CoachCard";
import { md } from "node-forge";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import { CoachAssignDetails } from "../../types";
import axios from "axios";

const CoachCardSection = () => {
  const [coachAssignDetails, setCoachAssignDetails] = useState<
    CoachAssignDetails[]
  >([]);

  useEffect(() => {
    try{
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getcoachassignvalues`
      );
      const data = await res.data;
      setCoachAssignDetails(data);
    };
    fetchData();
  } catch (e) {
    console.log(e);
  }
  }, []);

  const { lg, md, sm, xs } = useBreakpoint();

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
      </style>
      ;
      <Row
        style={{
          width: "100%",

          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(27, 93, 183, 0.07)",
            }}
          >
            {" "}
            <Row
              style={{
                width: "100%",
                alignItems: "center",
                textAlign: "center",

                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  color: " #0E458E",
                  fontSize: md ? "30px" : "20px",
                  fontFamily: "Kanit",
                }}
              >
                Our Best Coaches
              </Typography>
              <Button
                style={{
                  position: "absolute",
                  right: "0",
                  top: "35%",
                  color: "#1B5DB7",
                  background: "none",
                  border: "none",
                  fontFamily: "Kanit",
                  fontSize: "18px",
                }}
              >
                See More
              </Button>
            </Row>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "450px",
                  overflowY: "scroll",
                  flexWrap: "nowrap",
                }}
              >
                {coachAssignDetails?.map(
                  (coachAssignDetail: CoachAssignDetails) => (
                    <Col
                      lg={{ span: 5 }}
                      md={{ span: 8 }}
                      sm={{ span: 12 }}
                      xs={{ span: 24 }}
                    >
                      <CoachCard
                        coach_first_name={
                          coachAssignDetail.coach.user.firstname
                        }
                        coach_last_name={coachAssignDetail.coach.user.lastname}
                        short_description={
                          coachAssignDetail.coach.short_desctiption
                        }
                        rate={coachAssignDetail.coach.rate}
                        duration={coachAssignDetail.duration}
                        coach_image={coachAssignDetail.coach_image}
                      />
                    </Col>
                  )
                )}
              </Row>
            </div>
          </Row>
        </Col>

        {/* <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(27, 93, 183, 0.07)",
            }}
          >
            <Row
              style={{
                width: "100%",
                alignItems: "center",
                textAlign: "center",
              
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  color: " #0E458E",
                  fontSize: md ? "30px" : "20px",
                  fontFamily: "Kanit",
                }}
              >
                Our Best Coaches
              </Typography>
              <Button
                style={{
                  position: "absolute",
                  right: "0",
                  top: "35%",
                  color: "#1B5DB7",
                  background: "none",
                  border: "none",
                  fontFamily: "Kanit",
                  fontSize: "18px",
                }}
              >
                See More
              </Button>
            </Row>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Row
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "450px",
                  overflowY: "scroll",
                  flexWrap: "nowrap",
                }}
              >
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 5 }}
                  xl={{ span: 5 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CoachCard />
                </Col>
              </Row>
            </div>
          </Row>
        </Col> */}
      </Row>
    </>
  );
};

export default CoachCardSection;
