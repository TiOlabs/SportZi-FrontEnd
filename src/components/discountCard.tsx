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
              <h1> SSC </h1>
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
