import { CloseCircleOutlined, EditOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assents/logo.png";
import { Popover } from "antd";
import { Button } from "antd/es/radio";

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
  const [editProfileButtonHovered, setEditProfileButtonHovered] =useState(false);
  const [logOutButtonHovered, setLogOutButtonHovered] = useState(false);

  const [homeUnderlineStyle, homeSetUnderlineStyle] = useState({
    width: 0,
    left: "50%",
    transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
  });

  const homeHandleMouseEnter = () => {
    homeSetUnderlineStyle({
      width: 50,
      left: "0",
      transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
    });
  };

  const homeHandleMouseLeave = () => {
    homeSetUnderlineStyle({
      width: 0,
      left: "50%",
      transition: "width 0.5s ease-in-out, left 0.5s ease-in-out",
    });
  };
  const [coachesUnderlineStyle, coachesSetUnderlineStyle] = useState({
    width: 0,
    left: "50%",
    transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
  });

  const coachesHandleMouseEnter = () => {
    coachesSetUnderlineStyle({
      width: 75,
      left: "0",
      transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
    });
  };

  const coachesHandleMouseLeave = () => {
    coachesSetUnderlineStyle({
      width: 0,
      left: "50%",
      transition: "width 0.5s ease-in-out, left 0.5s ease-in-out",
    });
  };
  const [arcadeUnderlineStyle, arcadeSetUnderlineStyle] = useState({
    width: 0,
    left: "50%",
    transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
  });

  const arcadeHandleMouseEnter = () => {
    arcadeSetUnderlineStyle({
      width: 60,
      left: "0",
      transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
    });
  };

  const arcadeHandleMouseLeave = () => {
    arcadeSetUnderlineStyle({
      width: 0,
      left: "50%",
      transition: "width 0.5s ease-in-out, left 0.5s ease-in-out",
    });
  };
  const [contactUnderlineStyle, contactSetUnderlineStyle] = useState({
    width: 0,
    left: "50%",
    transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
  });

  const contactHandleMouseEnter = () => {
    contactSetUnderlineStyle({
      width: 70,
      left: "0",
      transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
    });
  };

  const contactHandleMouseLeave = () => {
    contactSetUnderlineStyle({
      width: 0,
      left: "50%",
      transition: "width 0.5s ease-in-out, left 0.5s ease-in-out",
    });
  };

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const content = (
    <div className="NavBarUserProfileClickDetail">
      <div
        className="NavBarUserProfileLaptop"
        style={{
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "150px",
        }}
      >
        <div
          className="NavBarUserProfileImgLaptop"
          style={{ justifyContent: "center", display: "flex" }}
        >
          <img
            src="https://ucarecdn.com/0e1d8b2e-6e1c-4f0d-8f9b-0e3e7e5f6a0e/-/preview/400x300/image.png"
            alt="Original Image"
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "10px",
              marginTop: "10px",
              borderRadius: "50%",
              border: "1px solid black",
            }}
          />
        </div>
        <div
          className="NavBarUserProfileNameLaptop"
          style={{
            color: "#1B5DB7",
            justifyContent: "center",
            display: "flex",
            fontSize: "20px",
            fontFamily: "kanit",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Sasindu Dhanushka
        </div>
        <div
          className="NavBarUserProfileStatusLaptop"
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
        <Divider style={{ }}/>
      </div>
      
      <div>
        <Button
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#1B5DB7",
            borderColor: "#1B5DB7",
            color: "white",
            justifyContent: "center",
            display: "flex",
            borderRadius: "5px",
          }}
        >
          <LogoutOutlined style={{fontSize:"20px",marginRight:"10px",marginTop:"5px"}}/>
          Log Out
        </Button>
        <Button
          type="primary"
          onClick={hide}
          style={{
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#1B5DB7",
            borderColor: "#1B5DB7",
            color: "white",
            justifyContent: "center",
            display: "flex",
            borderRadius: "5px",
          }}
        >
          <CloseCircleOutlined style={{fontSize:"20px",marginRight:"10px",marginTop:"5px"}}/>
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <Row
      style={{
        backgroundColor: "#1B5DA9",
        width: "100%",
        height: "50px",
        position: "fixed",
        zIndex: "2",
      }}
    >
      <Col xs={1}></Col>
      <Col xs={17} md={19} lg={7}>
        <div className="navBarLogo">
          <Link to="/">
            <img
              src={logo}
              alt="Original Image"
              style={{ width: "40px", height: "40px", marginTop: "10px" }}
            />
          </Link>
        </div>
      </Col>
      <Col xs={6} md={4} lg={0}>
        <div className="navBarMenu">
          <MenuOutlined
            onClick={handleToggle}
            style={{
              backgroundColor: "none",
              color: "white",
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
                  className="NavBarUserProfileStatus"
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
                <Divider style={{ color:"black" }}/>
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
              <Link to="/home">Home</Link>
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
              <div className="MenuItemHover">Coaches</div>
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
              <Link to="/arcades">Arcade</Link>
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
              <Link to="/about">About Us</Link>
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
              <Link to="/contact">Contact Us</Link>
            </Menu.Item>
            <Menu.Item
              key="contactUs"
              style={{
                fontFamily: "kanit",
                fontSize: editProfileButtonHovered ? "20px" : "15px",
                fontWeight: editProfileButtonHovered ? "bold" : "normal",
                marginTop: "-2px",
                borderRadius: "10px",
                justifyContent: "center",
                display: "flex",
                backgroundColor:"#1B5DB7",
                color:"white",
              }}
              onMouseEnter={() => setEditProfileButtonHovered(true)}
              onMouseLeave={() => setEditProfileButtonHovered(false)}
            >
              <EditOutlined style={{fontSize:"20px",marginRight:"10px"}}/>
              Edit Profile
            </Menu.Item>
            <Menu.Item
              key="contactUs"
              style={{
                fontFamily: "kanit",
                fontSize: logOutButtonHovered ? "20px" : "15px",
                fontWeight: logOutButtonHovered ? "bold" : "normal",
                marginTop: "-2px",
                borderRadius: "10px",
                justifyContent: "center",
                display: "flex",
                backgroundColor:"#1B5DB7",
                color:"white",
              }}
              onMouseEnter={() => setLogOutButtonHovered(true)}
              onMouseLeave={() => setLogOutButtonHovered(false)}
            >
              <LogoutOutlined style={{fontSize:"20px",marginRight:"10px"}}/>
              Log Out
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
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            <Link
              to="/home"
              style={{
                color: "white",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
              }}
              onMouseEnter={homeHandleMouseEnter}
              onMouseLeave={homeHandleMouseLeave}
            >
              Home
              <span
                style={{
                  position: "absolute",
                  width: homeUnderlineStyle.width,
                  height: "3px",
                  bottom: "0",
                  left: homeUnderlineStyle.left,
                  backgroundColor: "white",
                  transition: homeUnderlineStyle.transition,
                }}
              ></span>
            </Link>
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            <Link
              to="/coaches"
              style={{
                color: "white",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
              }}
              onMouseEnter={coachesHandleMouseEnter}
              onMouseLeave={coachesHandleMouseLeave}
            >
              Coaches
              <span
                style={{
                  position: "absolute",
                  width: coachesUnderlineStyle.width,
                  height: "3px",
                  bottom: "0",
                  left: coachesUnderlineStyle.left,
                  backgroundColor: "white",
                  transition: coachesUnderlineStyle.transition,
                }}
              ></span>
            </Link>
          </div>

          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            <Link
              to="/arcades"
              style={{
                color: "white",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
              }}
              onMouseEnter={arcadeHandleMouseEnter}
              onMouseLeave={arcadeHandleMouseLeave}
            >
              Arcade
              <span
                style={{
                  position: "absolute",
                  width: arcadeUnderlineStyle.width,
                  height: "3px",
                  bottom: "0",
                  left: arcadeUnderlineStyle.left,
                  backgroundColor: "white",
                  transition: arcadeUnderlineStyle.transition,
                }}
              ></span>
            </Link>
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            <Link
              to="/about"
              style={{
                color: "white",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
              }}
              onMouseEnter={contactHandleMouseEnter}
              onMouseLeave={contactHandleMouseLeave}
            >
              Contact
              <span
                style={{
                  position: "absolute",
                  width: contactUnderlineStyle.width,
                  height: "3px",
                  bottom: "0",
                  left: contactUnderlineStyle.left,
                  backgroundColor: "white",
                  transition: contactUnderlineStyle.transition,
                }}
              ></span>
            </Link>
          </div>
          <div className="navBarUserProfile">
            <Popover
              content={content}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              style={{ display: "fixed", backgroundColor: "black" }}
            >
              <a className="NavBarUserProfileImgThumsup">
                <img
                  className="NavBarUserProfileImg"
                  src="https://ucarecdn.com/0e1d8b2e-6e1c-4f0d-8f9b-0e3e7e5f6a0e/-/preview/400x300/image.png"
                  alt="Original Image"
                  style={{
                    width: "35px",
                    height: "35px",
                    marginLeft: "10px",
                    marginTop: "5px",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                />
              </a>
            </Popover>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Navbar;
