import React from "react";
import { Row, Col } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { useNavigate } from "react-router-dom";
import Notification from "./notification";
const ArcadeCardForMannager = (props: any) => {
  console.log(props);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ArcadeforArcade/${props.arcade_id}`); // replace 'props.id' with the unique id you want to use
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", width:"100%"}}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
      </style>
      <Row
        onClick={handleClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: "100%",
          height: "60px",
          borderRadius: "3px",
          transition: "transform 0.2s",
        
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0px 0px 2px 0px #808080";
        }} // Scale up on hover and change box shadow
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 0px 0px 0px #808080";
        }} // Reset scale and box shadow when not hovering
      >
        <Col
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "blue",
              width: "40px",
              height: "40px",
            }}
          ></div>
        </Col>
        <Col
          xs={14}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#000",
              fontFamily: "kanit",
            }}
          >
            {props.arcade_name}
          </p>
        </Col>
        <Col
          xs={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Notification    
          userType="arcade" id={props.arcade_id}  />
        </Col>
      </Row>
    </div>
  );
};
export default ArcadeCardForMannager;
