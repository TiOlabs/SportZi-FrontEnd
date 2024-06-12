import { Col, Grid, Row, Typography, Rate } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";

const ReviewCard = (props: any) => {
  const { userName } = props;
  const { comment } = props;
  const { rate } = props;

  // console.log("username:::::",userName);
  // console.log("comment:::::",comment);

  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  return (
    <>
      {/* <Row
        style={{
          minWidth: "100%",
          maxWidth: "330px",
          minHeight: "150px",
          backgroundColor: "#fff",
          marginTop: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography
            style={{
              paddingTop: "10px",
              paddingLeft: "20px",
              fontFamily: "kanit",
              fontWeight: md ? "500" : "400",
              fontSize: md ? "18px" : "16px",
            }}
          >
           
            {userName}
          </Typography>
        </Col>
        <Col
        style={{
          margin:"0",
          padding:"0px",
        }}
        >
        <Rate
                        allowHalf
                        disabled
                        value={rate}
                        style={{
                          scale: "0.7",
                          display: "flex",
                          flexDirection: "row",
                          color: "#0E458E",
                          fillOpacity: "0.8",
                        }}
                      />

        </Col>


          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography
            style={{
              paddingRight: "20px",
              paddingLeft: "20px",
              fontFamily: "kanit",
              fontWeight: "300",
              fontSize: md ? "15px" : "12px",
            }}
          >
            {comment}
          </Typography>
        </Col>
      </Row> */}


      <div
        style={{
          boxShadow: "0px 0px 4px 0px white",
          width: "200px",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "3px",
          marginBottom: "5%",
          marginRight: "20%",
          marginLeft: "20%",

        }}
      >
        {/* <div className="mainCardsec1"></div> */}
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
            backgroundColor:"#ffffff"
          }}
        >
          <div
            style={{
              // marginTop: "5%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              // onClick={handleClick}
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
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                cldImg={
                  cld.image(props.image)
                  // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                  // .resize(Resize.scale().width(200).height(200))
                }
              />
            </div>

            <div style={{ marginTop: "8px" }}>
              <p 
              // onClick={handleClick}
              style={{ fontSize: "14px", fontWeight: 300 }}>{props.userName}</p>
            </div>

            <div
              style={{
                fill: "#FFD700",
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
                value={props.rate}
                style={{ color: "#FFD700", fontSize: "12px" }}
              />
            </div>
            <div>
              <p
                style={{
                  color: "#000000",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontFamily: "kanit",
                  // marginBottom: "-22%",
                }}
              >
                {" "}
              
                {props.comment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
