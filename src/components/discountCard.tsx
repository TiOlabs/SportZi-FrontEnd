import { Card } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import { Link } from "react-router-dom";
import DiscountCardpic_01 from "../assets/DiscountCardpic_01.png";

const DiscountCard = (props: any) => {
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  return (
    <Link to="/bookings"><Card hoverable >
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
                textAlign: "center",
              }}
            >
              {props.discount_percentage}% Discount
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                lineHeight: 1.2,
                width: "100%",
              }}
            >
              {props.description}
            </div>
          </div>

          <div style={{ lineHeight: 0.9, width: "100%", }}>
            <div style={{ display: "flex", justifyContent: "center",alignItems:"center",textAlign:"center" }}>
              <h1> {props.zone_name} </h1>
            </div>
            <h4 style={{ display: "flex", justifyContent: "center",textAlign: "center", }}>
              Level one cricket arcade
            </h4>
          </div>
        </div>
      </div>
    </Card></Link>
  );
};

export default DiscountCard;
