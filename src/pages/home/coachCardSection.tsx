import { Button, Col, Empty, Row, Skeleton, Typography } from "antd";
import CoachCard from "../../components/CoachCard";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import { Coach } from "../../types";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import axios from "axios";
import { useUser } from "../../context/userContext";

const CoachCardSection = () => {
  const [coachAssignDetails, setCoachAssignDetails] = useState<Coach[]>([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const {userDetails} = useUser();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = coachAssignDetails.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getcoach`
        );
        const data = await res.data;

        // Filter the data to include only items with status "active"
        const successCoaches = data.filter(
          (coach: { status: string }) => coach.status === "active"
        );
        setCoachAssignDetails(successCoaches);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
            </Row>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: "20px",
              }}
            >
              <Row
                style={{
                  overflowX: "hidden",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "450px",
                  overflowY: "scroll",
                  flexWrap: "nowrap",
                }}
              >
                {" "}
                {coachAssignDetails.length === 0 ? (
                  <Empty description={"No Coaches Availiable"} />
                ) : (
                  coachAssignDetails.map((coach: Coach) => (
                    <Col
                      lg={{ span: 5 }}
                      md={{ span: 8 }}
                      sm={{ span: 12 }}
                      xs={{ span: 24 }}
                      // Adding a unique key for each element
                    >
                      <CoachCard
                        coachName={`${coach.user.firstname} ${coach.user.lastname}`}
                        coach_last_name={coach.user.lastname}
                        short_description={coach.short_desctiption} // Corrected the typo
                        rate={coach.rate}
                        // duration={coachAssignDetail.duration}
                        coach_image={coach.user.user_image}
                        coach_id={coach.coach_id}
                        sport={coach.sport.sport_name}
                        role ={userDetails.role}

                      />
                    </Col>
                  ))
                )}
              </Row>
              <Pagination
                style={{ marginTop: "-30px" }}
                current={currentPage}
                onChange={handlePageChange}
                total={coachAssignDetails.length}
                pageSize={itemsPerPage}
              />
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CoachCardSection;
