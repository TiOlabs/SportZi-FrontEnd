import { Col, Row } from "antd";
import DiscountCard from "../../components/discountCard";
import { useEffect, useState } from "react";
import { Discount } from "../../types";
import axios from "axios";

const DiscoutCardsSection = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsBase[]>(
    []
  );
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          "http://localhost:3000/api/getdiscountcardvalues"
        );
        const data = await res.json();
        setDiscounts(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // try{
  //   const fetchData = async () => {
  //     const res = await fetch( `${process.env.REACT_APP_API_URL}api/getcoachassignvalues`);
  //     const data = await res.json();
  //     setCoachAssignDetails(data);
  //   }
  //   fetchData();
  // }
  // catch(e){
  //   console.log(e);
  // }
  // }, []);
  console.log(discounts);
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{ color: "#24338a", display: "flex", justifyContent: "center" }}
      >
        Special discounts for you
      </h1>

      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          height: "450px",
          overflow: "auto",
        }}
      >
        {discounts?.map((discount: Discount) => (
          <Col lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }}>
            <DiscountCard
              discount_percentage={discount.discount_percentage}
              description={discount.description}
              discount_image={discount.discount_image}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default DiscoutCardsSection;
