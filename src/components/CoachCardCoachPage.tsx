import { Button, Rate, message } from "antd";
import "../styles/CoachCard.css";
import { getTwoToneColor, setTwoToneColor } from "@ant-design/icons";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoachBookingContext } from "../context/coachBooking.context";
import { useUser } from "../context/userContext";

const CoachCardCoachPage = (props: any) => {
  const { setCoachId } = useContext(CoachBookingContext);
  console.log("props", props);
  setTwoToneColor("blue");
  getTwoToneColor();
  const navigate = useNavigate();
  const { userDetails } = useUser();

  const handleClick = () => {
    navigate(`/CoachUser/:${props.coach_id}`);
  };
  localStorage.setItem("coachId", props.coach_id);
  console.log(props.coach_id);
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  setCoachId(props.coach_id);
  return (
    <>
      <div className="mainCard">
        <div className="mainCardsec1"></div>
        <div className="mainCardsec2">
          <div className="nameDiscription">
            <div style={{ marginTop: "8px" }}>
              <p onClick={handleClick}> {props.coach_name} </p>
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
                LKR {props.coach_rate}
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
