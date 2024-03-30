import { Card } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ZoneBookingsContext } from "../context/zoneBookings.context";
const DiscountCard = (props: any) => {
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const { setZoneId } = useContext(ZoneBookingsContext);
  console.log(props);
  console.log(props.discount_image);
  const handleCardClick = async () => {
    // You can use the discountId here to identify the clicked card
    console.log(`Clicked card with ID: ${props.zoneId}`);

    setZoneId(props.zoneId);

    // Perform any other actions based on the clicked card
  };
  return (
    <Link to="/bookings">
      <Card onClick={handleCardClick} hoverable>
        <div style={{ display: "flex", width: "auto" }}>
          <div style={{ display: "flex", width: "50%" }}>
            <AdvancedImage style={{ height: "auto", width: "100%" }}
              cldImg={
                cld.image(props.discount_image)
                // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                // .resize(Resize.scale().width(200).height(200))
              }
              
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

            <div style={{ lineHeight: 0.9, width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <h1> {props.zone_name} </h1>
              </div>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Level one cricket arcade
              </h4>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DiscountCard;
