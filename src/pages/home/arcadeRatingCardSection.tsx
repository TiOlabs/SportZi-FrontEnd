import { Col, Empty, Row } from "antd";
import ArcadeRatingCard from "../../components/arcadeRatingCard";
import { useEffect, useState, useMemo } from "react";
import { Arcade, ArcadeFeedbacks } from "../../types";
import { Pagination } from "antd";

const ArcadeRatingCardsSection = () => {
  const [arcadeRatings, setArcadeRatings] = useState<Arcade[]>([]);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedArcades = useMemo(() => {
    return arcadeRatings.sort(
      (a: any, b: any) => b.averageRate - a.averageRate
    );
  }, [arcadeRatings]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedArcades.slice(startIndex, endIndex);
  }, [sortedArcades, currentPage, itemsPerPage]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
        );
        const data = await res.json();
        const filteredRatedArcades = data.filter(
          (arcade: Arcade) => arcade.arcadefeedbacks.length > 0
        );
        setArcadeRatings(filteredRatedArcades);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // function calculateAverageRate(feedbacks: ArcadeFeedbacks[]) {
  //   if (feedbacks.length === 0) return 0;
  //   let sum = 0;
  //   feedbacks.forEach((feedback) => {
  //     sum += feedback.rate as number;
  //   });
  //   return sum / feedbacks.length;
  // }

  // const sortedArcades = arcadeRatings
  //   .map((arcade) => ({
  //     ...arcade,
  //     averageRate: calculateAverageRate(arcade.arcadefeedbacks),
  //   }))
  //   .sort((a, b) => b.averageRate - a.averageRate);

  return (
    <Row
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2%",
      }}
    >
      <h1
        style={{
          color: "#0E458E",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        Arcade ratings
      </h1>
      <Row 
      gutter={[16, 16]}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
        }}
      >
        {sortedArcades.length === 0 ? (
          <Empty description={"No Arcade Available"} />
        ) : (
          currentItems.map((arcade) => (
            <Col 
            key={arcade.arcade_id as string} 
            lg={12} 
            md={24} 
            sm={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              <ArcadeRatingCard
                arcadeRating_id={arcade.arcade_id}
                // arcadeRating={arcade.averageRate}
                arcadeName={arcade.arcade_name}
                arcade_id={arcade.arcade_id}
                arcadeAverageRate={arcade.averageRate}
                arcade_image={arcade.arcade_image}
              />
            </Col>
          ))
        )}
      </Row>
      <Pagination
        defaultCurrent={1}
        style={{ marginBottom: "10px" }}
        current={currentPage}
        onChange={handlePageChange}
        total={sortedArcades.length}
        pageSize={itemsPerPage}
      />
    </Row>
  );
};

export default ArcadeRatingCardsSection;
