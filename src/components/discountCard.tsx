import { Card } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
const DiscountCard = (props: any) => {
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const markers = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { lat: 41.881832, lng: -87.623177 }
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 39.739235, lng: -104.99025 }
    },
    {
      id: 3,
      name: "Los Angeles, California",
      position: { lat: 34.052235, lng: -118.243683 }
    },
    {
      id: 4,
      name: "New York, New York",
      position: { lat: 40.712776, lng: -74.005974 }
    }
  ];
  return (
    <Card hoverable>
      <div style={{ display: "flex", width: "auto" }}>
        <div style={{ display: "flex", width: "50%" }}>
          <AdvancedImage
            cldImg={
              cld.image(props.discount_image)
              // .resize(Resize.crop().width(200).height(200).gravity('auto'))
              // .resize(Resize.scale().width(200).height(200))
            }
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

          <div style={{ lineHeight: 0.3, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1> {props.zone_name} </h1>
            </div>
            <h4 style={{ display: "flex", justifyContent: "center" }}>
              Level one cricket arcade
            </h4>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiscountCard;
