import {  Button, Rate } from "antd";
import "../styles/CoachCard.css";
import { getTwoToneColor, setTwoToneColor } from "@ant-design/icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";

const CoachCardCoachPage = (props: any) => {
  console.log("props", props);
  setTwoToneColor("blue");
  getTwoToneColor();

  console.log(props.coach_image);
  console.log(props.coach_name);
  console.log(props.coach_sport);
  console.log(props.coach_rating);
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  return (
    <>
      <div className="mainCard">
        <div className="mainCardsec1"></div>
        <div className="mainCardsec2">
          <div className="nameDiscription">
            <div style={{ marginTop: "8px" }}>
              <p> {props.coach_name} </p>
              <p className="coachPosition">{props.coach_sport}</p>
            </div>

            <div className="ratings">
              <Rate
                disabled
                defaultValue={3}
                style={{ color: "#FFD700", fontSize: "12px" }}
              />
            </div>

            <div>
              <p className="coachDiscription">
                {" "}
                {props.coach_short_description}{" "}
              </p>
            </div>
          </div>
          <div
            className="priceBooking"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              margin: "0",
            }}
          >
            <div className="price">
              <p
                style={{
                  color: "#5587CC",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Rs.{props.coach_rate}
              </p>
              <p style={{ fontWeight: "275", fontSize: "16px" }}>per hour</p>
            </div>
            <div className="buttonfeild">
              <Button
                type="primary"
                size="small"
                style={{
                  fontSize: "10px",
                  background: "#5587CC",
                  fontWeight: "400",
                }}
              >
                Book Coach
              </Button>
            </div>
          </div>
        </div>
        <div className="coachpicture">
          {" "}
          <AdvancedImage
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            cldImg={
              cld.image(props.coach_image)
              // .resize(Resize.crop().width(200).height(200).gravity('auto'))
              // .resize(Resize.scale().width(200).height(200))
            }
          />
        </div>
      </div>
    </>
  );
};

export default CoachCardCoachPage;
