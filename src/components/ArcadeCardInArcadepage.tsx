import { Col, Row, Button, Flex, Skeleton } from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { getTwoToneColor } from "@ant-design/icons";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import ArcadeImage from "../assets/ArcadeImage.png";
import { Rate } from 'antd';

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap')
</style>;

const ArcadeCard = (props: any) => {
  getTwoToneColor();
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const App: React.FC = () => <Rate disabled defaultValue={2} />;

  console.log("props image hiiiiii", props.ArcadeImage);
  console.log("props", props);
  return (
    <>
      <div
        style={{
          boxShadow: "0px 0px 4px 0px white",
          width: "200px",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "3px",
          marginBottom: "30%",
          marginRight: "20%",
          marginLeft: "20%",
        }}
      >
        <div className="mainCardsec1"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "120%",
            padding: "30px",
            borderRadius: "none",
            background: "white",
            height: "1000px",
          }}
        >
          <div
            style={{
              marginTop: "5%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                borderRadius: "100%",
                width: "100px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10%",
                marginLeft: "30%",
              }}
            >
              <AdvancedImage
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                  backgroundColor: "black",
                }}
                cldImg={
                  cld.image(props.AdvancedImage)
                  // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                  // .resize(Resize.scale().width(200).height(200))
                }
                // border-radius: 50%;
                // width: 80px;
                // height: 80px;
              />
            </div>

            <div style={{ marginTop: "8px" }}>
              <p
                style={{ color: "#1B5DB7", fontSize: 22, fontFamily: "kanit" }}
              >
                Blue Feather
              </p>
              <p style={{ fontSize: "14px", fontWeight: 300 }}>Sport Complex</p>
            </div>

            <div>
              <StarFilled style={{ color: "#FFD700", marginLeft: "10px" }} />
              <StarFilled style={{ color: "#FFD700", marginLeft: "10px" }} />
              <StarFilled style={{ color: "#FFD700", marginLeft: "10px" }} />
              <StarFilled style={{ color: "#FFD700", marginLeft: "10px" }} />
              <StarFilled
                style={{
                  color: "#FFD700",
                  marginLeft: "10px",
                  marginRight: "20px",
                }}
              />
              5.0
            </div>
            <div>
              <p
                style={{
                  color: "#000000",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontFamily: "kanit",
                  marginBottom: "-22%",
                }}
              >
                {" "}
                Dive into fitness and fun at Blue Feather! Enjoy our swimming
                pool, tennis courts, pool game area, dance, karate, and yoga
                classes. Expert coaches, affordable fees, and more! Join us for
                an active lifestyle.
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              margin: "0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                marginTop: "70px",
              }}
            >
              <Button
                type="primary"
                size="small"
                style={{
                  fontSize: "15px",
                  background: "white",
                  fontWeight: "400",
                  color: "#1B5DB7",
                  border: "1px solid #2E5488",
                  width: "100px",
                  borderRadius: "3px",
                  height: "40px",
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArcadeCard;
