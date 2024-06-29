import { Cloudinary } from "@cloudinary/url-gen";
import { Row } from "antd";
import { Rate } from "antd";
import { Button } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";

const ArcadeRatingCard = (props: any) => {
  console.log("props", props);
  const [cloudName] = useState("dle0txcgt");
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName,
  //   },
  // });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/arcadeProfile/${props.arcade_id}`);
  };
  const { md } = useBreakpoint();

  const roundedAvgRate = Math.round(props.arcadeAverageRate * 2) / 2;

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  return (
    <Row>
      <div
        style={{
          width: md ? "450px" : "328px",
          height: "191px",
          backgroundColor: "#EFF4FA",
          display: "flex",
          marginBottom: "50px",
          marginLeft: "25px",
        }}
      >
        <AdvancedImage
             style={{
              width: md ? "242px" : "164px",
              height: "191px",
              WebkitClipPath: md
                ? "polygon(0 0, 70% 0%, 100% 100%, 0% 100%)"
                : "polygon(0 0, 50% 0%, 100% 100%, 0% 100%)",
              clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 98%)",
            }}
          cldImg={
            cld.image(props.arcade_image)
            // .resize(Resize.crop().width(200).height(200).gravity('auto'))
            // .resize(Resize.scale().width(200).height(200))
          }
        />
        {/* <img
          src="https://sportsplanningguide.com/wp-content/uploads/2016/05/Woodside_WisconsinDellsCenter-1.jpg"
          style={{
            width: md ? "242px" : "164px",
            height: "191px",
            WebkitClipPath: md
              ? "polygon(0 0, 70% 0%, 100% 100%, 0% 100%)"
              : "polygon(0 0, 50% 0%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 98%)",
          }}
        ></img> */}
        {/* <AdvancedImage
            cldImg={cld.image(props.arcadeRating_image)}
          style={{
            width: md ? "242px" : "164px",
            height: "191px",
            WebkitClipPath: md? "polygon(0 0, 70% 0%, 100% 100%, 0% 100%)" : "polygon(0 0, 50% 0%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 98%)",
          }}
        /> */}

        <div
          className="arcadeRatingCardDetail"
          style={{
            justifyContent: "center",
            width: "180px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ gap: "5px" }}>
            <div
              className="arcadeRatingCardName"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  fontStyle: "normal",
                  width: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: "1",
                  textAlign: "center",
                }}
              >
                {props.arcadeName}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  fontStyle: "normal",
                  width: "122px",
                  justifyContent: "center",
                  marginTop: "1px",
                  lineHeight: "2",
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                level one cricket arcade
              </div>
            </div>
            <div
              style={{
                fill: "blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Rate
                allowHalf
                disabled
                defaultValue={0}
                value={roundedAvgRate}
                style={{ color: "#5587CC", fontSize: "12px" }}
              />
            </div>
            <div
              className="Discription part"
              style={{
                width: "100%",
                textAlign: "center",
                height: "auto",
                lineHeight: "3",
              }}
            >
              <div>{props.arcadeRating_description}</div>
            </div>
          </div>
          <div className="BookArcadeButton">
            <Button
              type="primary"
              style={{ backgroundColor: "#5587CC" }}
              onClick={handleClick}
            >
              View Arcade
            </Button>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default ArcadeRatingCard;
