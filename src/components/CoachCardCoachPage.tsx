import { Col, Row, Button, Flex, Rate } from "antd";
import "../styles/CoachCard.css";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { getTwoToneColor, setTwoToneColor } from "@ant-design/icons";


const CoachCardCoachPage = ( props:any) => {
  console.log("props", props);
  setTwoToneColor("blue");
  getTwoToneColor();

console.log(props.coach_image)
console.log(props.coach_name)
console.log(props.coach_sport)
console.log(props.coach_rating)


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
             <Rate disabled defaultValue={props.coach_rating} />
            </div>

            <div>
              <p className="coachDiscription"> {props.coach_short_description} </p>
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
        <div className="coachpicture"></div>
      </div>
    </>
  );
};

export default CoachCardCoachPage;
