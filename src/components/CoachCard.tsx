import { Col, Row, Button, Flex } from "antd";
import "./CoachCard.css";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { getTwoToneColor, setTwoToneColor } from "@ant-design/icons";

const CoachCard = () => {
  setTwoToneColor("blue");
  getTwoToneColor();
  return (
    <>
      <div className="mainCard">
        <div className="mainCardsec1"></div>
        <div className="mainCardsec2">
          <div className="nameDiscription">
            <div>
              <p>Sandun Malage</p>
              <p className="coachPosition">level one Rugby Coach</p>
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
              <p className="coachDiscription"> discription about coacoach </p>
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
                  color: "##5587CC;",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                100$
              </p>
              <p style={{ fontWeight: "300", fontSize: "16px" }}>per hour</p>
            </div>
            <div className="buttonfeild">
              <Button
                type="primary"
                size="small"
                style={{ fontSize: "10px", background: "#5587CC" }}
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

export default CoachCard;
