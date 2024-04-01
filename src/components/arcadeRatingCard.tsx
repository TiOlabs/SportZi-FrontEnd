import { Cloudinary } from "@cloudinary/url-gen";
import { Row } from "antd";
import { Rate } from "antd";
import { Button } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Link } from "react-router-dom";
import { useState } from "react";


const ArcadeRatingCard = (props:any) => {
    const [cloudName] = useState("dle0txcgt");
    // const cld = new Cloudinary({
    //   cloud: {
    //     cloudName,
    //   },
    // });
    const { md } = useBreakpoint();
  return (
    <Row>
      <div
        style={{
          width: md ? "450px": "328px",
          height: "191px",
          backgroundColor: "#EFF4FA",
          display: "flex",
          marginBottom: "50px",
          marginLeft: "25px",
        }}
      >

        <img 
        src="https://sportsplanningguide.com/wp-content/uploads/2016/05/Woodside_WisconsinDellsCenter-1.jpg" 
        style={{
          width: md ? "242px" : "164px",
          height: "191px",
          WebkitClipPath: md? "polygon(0 0, 70% 0%, 100% 100%, 0% 100%)" : "polygon(0 0, 50% 0%, 100% 100%, 0% 100%)",
          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 98%)",
        
        }}  >
        
        </img>
        {
        /* <AdvancedImage
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
                  justifyContent: "center",
                  lineHeight: "1",
                }}
              >
                SSC Complex
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
              <Rate disabled defaultValue={props.arcadeRating} style={{ color: "#5587CC" ,fontSize:"12px" }} />
            </div>
            <div className="Discription part" style={{ width: "100%", textAlign: "center", height: "auto", lineHeight:"3"}}>
              <div>{props.arcadeRating_description}</div>
            </div>
          </div>
          <div className="BookArcadeButton">
            <Link to="/bookings"><Button type="primary" style={{ backgroundColor: "#5587CC" }}>
              Book Arcade
            </Button></Link>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default ArcadeRatingCard;
