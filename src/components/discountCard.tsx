import { Card, Col, Row } from "antd";

import DiscountCardpic_01 from "../assents/DiscountCardpic_01.png"
const DiscountCard = () => {
  return (
    <Card hoverable>
      <div style={{ display: "flex", width: "auto" }}>
        <div style={{ display: "flex", width: "50%" }}>
          <img
            src={DiscountCardpic_01}
            style={{ height: "auto", width: "100%" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <div style={{ lineHeight: 0.7, width: "100%" }}>
            <h2
              style={{
                color: "#24338a",
                display: "flex",
                justifyContent: "center",
              }}
            >
              50% Discount
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              for what and discription{" "}
            </div>
            <div style={{ display: "flex",
                justifyContent: "center", }}>about discount</div>
          </div>

          <div style={{ lineHeight: 0.3, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1> SSC </h1>
            </div>
            <h4 style={{display: "flex",
              justifyContent: "center", }}>Level one cricket arcade</h4>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiscountCard;