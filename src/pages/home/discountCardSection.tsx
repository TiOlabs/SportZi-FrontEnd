import { Col, Empty, Row } from "antd";
import DiscountCard from "../../components/discountCard";
import { useEffect, useState } from "react";
import { Discount } from "../../types";
import axios from "axios";

const DiscoutCardsSection = () => {
  const [discounts, setDiscounts] = useState<Discount[]>();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getdiscountcardvalues`
        );
        const data = await res.data; //response data
        setDiscounts(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  console.log(discounts);
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop:"2%"
      }}
    >
      <h1
        style={{ color: "#24338a", display: "flex", justifyContent: "center" ,marginBottom:"2%"}}
      >
        Special discounts for you
      </h1>

      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          height: "520px",
          overflow: "auto",
        }}
      >
        {" "}
        {discounts?.length === 0 ? (
          <Empty description={"No Discounts Availiable"} />
        ) : (
          discounts?.map((discount: Discount) => (
            <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }}>
              <DiscountCard // Also use the stringified discount ID as a key for the DiscountCard component
                zoneId={discount.zone.zone_id} // Pass the discount ID as a prop to the DiscountCard component
                zone_name={discount.zone.zone_name}
                discount_percentage={discount.discount_percentage}
                description={discount.description}
                discount_image={discount.zone.zone_image}
                sport={discount.zone.sport.sport_name}
              />
            </Col>
          ))
        )}
      </Row>
    </Row>
  );
};

export default DiscoutCardsSection;
