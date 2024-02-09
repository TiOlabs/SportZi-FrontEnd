import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Col, Row } from "antd";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleMenuClick = () => {
    setVisible(false);
  };
  const customItemStyle: React.CSSProperties = {
    height: "200px",
    width: "241px",
    borderRadius: "0px",
    backgroundColor: "white",
  };
  const [homeHovered, setHomeHovered] = useState(false);
  const [coachesHovered, setCoachesHovered] = useState(false);
  const [arcadeHovered, setArcadeHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  return (
    <Row style={{ backgroundColor: 'none', width: "100%", height: "50px"}}>
      <Col xs={1}></Col>
      <Col xs={17} md={19} lg={7}>
        <div className="navBarLogo">
          <img
            src="https://ucarecdn.com/0e1d8b2e-6e1c-4f0d-8f9b-0e3e7e5f6a0e/-/preview/400x300/image.png"
            alt="Original Image"
            style={{ width: "30px", height: "30px", marginTop: "10px" }}
          />
        </div>
      </Col>
      <Col xs={6} md={4} lg={0}>
        <div className="navBarMenu">
          <MenuOutlined
            onClick={handleToggle}
            style={{
              backgroundColor: "none",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              fontStyle: "normal",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
          />
          <Menu
            mode="vertical"
            onClick={handleMenuClick}
            style={{
              display: visible ? "block" : "none",
              backgroundColor: "white",
              marginLeft: "-145px",
              zIndex: "2",
              position: "absolute",
            }}
          >
            <Menu.Item key="profile" style={customItemStyle}>
              <div
                className="NavBarUserProfile"
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  height: "150px",
                }}
              >
                <div
                  className="NavBarUserProfileImg"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <img
                    src="https://ucarecdn.com/0e1d8b2e-6e1c-4f0d-8f9b-0e3e7e5f6a0e/-/preview/400x300/image.png"
                    alt="Original Image"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "10px",
                      marginTop: "32px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                  />
                </div>
                <div
                  className="NavBarUserProfileName"
                  style={{
                    color: "#1B5DB7",
                    justifyContent: "center",
                    display: "flex",
                    fontSize: "20px",
                    fontFamily: "kanit",
                    fontWeight: "bold",

                  }}
                >
                  Sasindu Dhanushka
                </div>
                <div
                  className="NavBarUserProfileName"
                  style={{
                    color: "black",
                    justifyContent: "center",
                    display: "flex",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  student
                </div>
              </div>
            </Menu.Item>
            <Menu.Item
              key="home"
              style={{
                fontFamily: "kanit",
                fontSize: "20px",
                marginTop: "-5px",
                borderRadius: "0px",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                backgroundColor: homeHovered ? "#1B5DB7" : "white",
                color: homeHovered ? "white" : "#1B5DB7",
                
              }}
              onMouseEnter={() => setHomeHovered(true)}
              onMouseLeave={() => setHomeHovered(false)}
          
            >
              Home
            </Menu.Item>
            <Menu.Item
              key="coaches"
              style={{
                fontFamily: "kanit",
                fontSize: "20px",
                marginTop: "-5px",
                borderRadius: "0px",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                backgroundColor: coachesHovered ? "#1B5DB7" : "white",
                color: coachesHovered ? "white" : "#1B5DB7",
                
              }}
              onMouseEnter={() => setCoachesHovered(true)}
              onMouseLeave={() => setCoachesHovered(false)}
              
            >
              <div className="MenuItemHover" >Coaches</div>
            </Menu.Item>
            <Menu.Item
              key="arcade"
              style={{
                fontFamily: "kanit",
                fontSize: "20px",
                marginTop: "-5px",
                borderRadius: "0px",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                backgroundColor: arcadeHovered ? "#1B5DB7" : "white",
                color: arcadeHovered ? "white" : "#1B5DB7",
                
              }}
              onMouseEnter={() => setArcadeHovered(true)}
              onMouseLeave={() => setArcadeHovered(false)}
            >
              Arcades
            </Menu.Item>
            <Menu.Item
              key="aboutUs"
              style={{
                fontFamily: "kanit",
                fontSize: "20px",
                marginTop: "-5px",
                borderRadius: "0px",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                backgroundColor: aboutHovered ? "#1B5DB7" : "white",
                color: aboutHovered ? "white" : "#1B5DB7",
                
              }}
              onMouseEnter={() => setAboutHovered(true)}
              onMouseLeave={() => setAboutHovered(false)}
            >
              About Us
            </Menu.Item>
            <Menu.Item
              key="contactUs"
              style={{
                fontFamily: "kanit",
                fontSize: "20px",
                marginTop: "-5px",
                borderRadius: "0px",
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
                backgroundColor: contactHovered ? "#1B5DB7" : "white",
                color: contactHovered ? "white" : "#1B5DB7",
                
              }}
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
            >
              Contact Us
            </Menu.Item>
          </Menu>
        </div>
      </Col>
      <Col xs={0} md={0} lg={16}>
        <div
          className="navBarMenu"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "50px",
          }}
        >
          <div style={{fontSize: "20px", fontWeight: "bold"}}><a style={{color:"black"}} href="#">Home</a></div>
          <div style={{fontSize: "20px", fontWeight: "bold" }}><a style={{color:"black"}} href="#">Coaches</a></div>
          <div style={{fontSize: "20px", fontWeight: "bold" }}><a style={{color:"black"}} href="#">Arcade</a></div>
          <div style={{fontSize: "20px", fontWeight: "bold" }}><a style={{color:"black"}} href="#">Contact Us</a></div>
          <div>
            <img
              src="https://ucarecdn.com/0e1d8b2e-6e1c-4f0d-8f9b-0e3e7e5f6a0e/-/preview/400x300/image.png"
              alt="Original Image"
              style={{
                width: "35px",
                height: "35px",
                marginLeft: "10px",
                marginTop: "8px",
                borderRadius: "50%",
                border: "1px solid black",
              }}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Navbar;
