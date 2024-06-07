import { Col, Row, Button, Flex, Skeleton, message } from "antd";
import "../styles/CoachCard.css";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { getTwoToneColor, setTwoToneColor } from "@ant-design/icons";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CoachCard = (props: any) => {
  console.log(props);
  setTwoToneColor("blue");
  getTwoToneColor();
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/CoachUser/:${props.coach_id}`);
  };
  console.log("props", props);
  return (
    <>
      <div className="mainCard">
        <div className="mainCardsec1"></div>
        <div className="mainCardsec2">
          <div className="nameDiscription">
            <div style={{ marginTop: "8px" }}>
              <p onClick={handleClick}>{props.coachName}</p>
              <p className="coachPosition">level one {props.sport} Coach</p>
            </div>

            <div className="ratings">
              <StarFilled style={{ color: "#1B5DB7" }} />

              <StarTwoTone
                twoToneColor="#1B5DB7"
                style={{ marginLeft: "10px" }}
              />
              <StarTwoTone
                twoToneColor="#1B5DB7"
                style={{ marginLeft: "10px" }}
              />
              <StarTwoTone
                twoToneColor="#1B5DB7"
                style={{ marginLeft: "10px" }}
              />
              <StarTwoTone
                twoToneColor="#1B5DB7"
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div>
              <p className="coachDiscription"> {props.short_description} </p>
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
                Rs.{props.rate}
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
                onClick={() => {
                  if (props.role === "PLAYER") {
                    localStorage.setItem("coachId", props.coach_id);
                    navigate("/CoachBookingForm");
                  } else {
                    message.error("You are not a player");
                  }
                }}
              >
                Book Coach
              </Button>
            </div>
          </div>
        </div>
        <div onClick={handleClick} className="coachpicture">
          <AdvancedImage
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            cldImg={
              cld.image(props.coach_image)
              // .resize(Resize.crop().width(200).height(200).gravity('auto'))
              // .resize(Resize.scale().width(200).height(200))
            }
            // border-radius: 50%;
            // width: 80px;
            // height: 80px;
          />
        </div>
      </div>
    </>
  );
};

export default CoachCard;
