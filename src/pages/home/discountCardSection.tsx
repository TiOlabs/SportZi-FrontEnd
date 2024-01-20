import { Col, Row } from "antd";
import DiscountCard from "../../components/discountCard";
const DiscoutCardsSection = () => {
  return (
    
    <Row style={{ display: "flex", flexDirection: "column",justifyContent:"center" }}>
      <h1
        style={{ color: "#24338a", display: "flex", justifyContent: "center" }}
      >
        Special discounts for you
      </h1>

      

      <Row style={{ display: "flex",justifyContent:"center" }}>
        <Col lg={{span:8}}  md={{span:12}}  sm={{span:24}}>
          <DiscountCard />
        </Col>
        <Col lg={{span:8}}  md={{span:12}}  sm={{span:24}}>
          <DiscountCard />
        </Col>
        <Col lg={{span:8}}  md={{span:12}}  sm={{span:24}}>
          <DiscountCard />
        </Col>
        <Col lg={{span:8}}  md={{span:12}}  sm={{span:24}}>
          <DiscountCard />
        </Col>
        <Col lg={{span:8}}  md={{span:12}}  sm={{span:24}}>
          <DiscountCard />
        </Col>
        <Col lg={{span:8}}  md={{span:12}}  sm={{span:24}}>
          <DiscountCard />
        </Col>
      </Row>
    </Row>
  );
};

export default DiscoutCardsSection;
