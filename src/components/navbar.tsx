import {
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Col, Row } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logoBlack.png";
import { Popover } from "antd";
import { Button } from "antd/es/radio";
import Cookies from "js-cookie";

import { PlayerContext } from "../context/PlayerContext";
import { UserIdContext } from "../context/userId.context";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const Navbar: React.FC = () => {
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const { userDetails } = useContext(PlayerContext);

  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

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
    opacity: "1",
  };
  const [homeHovered, setHomeHovered] = useState(false);
  const [coachesHovered, setCoachesHovered] = useState(false);
  const [arcadeHovered, setArcadeHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [editProfileButtonHovered, setEditProfileButtonHovered] =
    useState(false);
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
      width: 63,
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
  const [aboutUnderlineStyle, aboutSetUnderlineStyle] = useState({
    width: 0,
    left: "50%",
    transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
  });

  const aboutHandleMouseEnter = () => {
    aboutSetUnderlineStyle({
      width: 85,
      left: "0",
      transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
    });
  };

  const aboutHandleMouseLeave = () => {
    aboutSetUnderlineStyle({
      width: 0,
      left: "50%",
      transition: "width 0.5s ease-in-out, left 0.5s ease-in-out",
    });
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const token = Cookies.get("token");
  console.log(token);
  function logOut() {
    // Remove the token cookie
    Cookies.remove("token");
    console.log("Token removed");
    // Redirect or perform other logout operations if necessary
  }
  // const logOut = async () => {
  //   // const res = await fetch (`${process.env.REACT_APP_API_URL}api/logout`)
  //   // deleteCookie('user_id');
  //   // deleteCookie('session_token');
  //   // localStorage.clear();

  // }

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
          <Link to={`/profile/`}>
            <AdvancedImage
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "10px",
                marginTop: "10px",
                borderRadius: "50%",
                border: "1px solid black",
              }}
              cldImg={
                cld.image(userDetails?.image)
                // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                // .resize(Resize.scale().width(200).height(200))
              }
            />
          </Link>
        </div>
        <div
          className="NavBarUserProfileNameLaptop"
          style={{
            color: "#1B5DB7",
            justifyContent: "center",
            display: "flex",
            fontSize: "20px",
            fontFamily: "kanit",
            marginTop: "10px",
          }}
        >
          {userDetails.name}
        </div>
        <div
          className="NavBarUserProfileStatusLaptop"
          style={{
            color: "black",
            justifyContent: "center",
            display: "flex",
            fontSize: "15px",
          }}
        >
          student
        </div>
        <Divider style={{}} />
      </div>

      <div>
        <Link to="/login">
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
            <LoginOutlined
              style={{
                fontSize: "20px",
                marginRight: "10px",
                marginTop: "5px",
              }}
            />
            Log In
          </Button>
        </Link>
        <Button
          type="primary"
          onClick={logOut}
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
          <LogoutOutlined
            style={{ fontSize: "20px", marginRight: "10px", marginTop: "5px" }}
          />
          Log Out
        </Button>
      </div>
    </div>
  );

  const bgStyle = () => {
    if (pathname === "/") {
      return scrolling ? "rgba(11, 42, 100, 0.9)" : "transparent";
    }
    if (pathname === "/coaches") {
      return scrolling ? "rgba(11, 42, 100, 0.9)" : "transparent";
    }
    if (pathname === "/arcades") {
      return scrolling ? "rgba(11, 42, 84, 0.9)" : "transparent";
    }
    if (pathname === "/about") {
      return scrolling ? "rgba(11, 42, 84, 0.9)" : "transparent";
    }
  };
  const fontColor = () => {
    if (pathname === "/") {
      return scrolling ? "white" : "white";
    }
    if (pathname === "/coaches") {
      return scrolling ? "white" : "#1B5DB7";
    }
    if (pathname === "/arcades") {
      return scrolling ? "white" : "#1B5DB7";
    }
    if (pathname === "/about") {
      return scrolling ? "white" : "#1B5DB7";
    }
  };
  const logoChange = () => {
    if (pathname === "/") {
      return logo;
    }
    if (pathname === "/coaches") {
      return scrolling ? logo : logo2;
    }
    if (pathname === "/arcades") {
      return scrolling ? logo : logo2;
    }
    if (pathname === "/about") {
      return scrolling ? logo : logo2;
    }
  };

  return (
    <Row>
      <div
        className="NavigationBar"
        style={{
          backgroundColor: bgStyle(),
          transition: "background-color 0.5s",
          width: "100%",
          height: "65px",
          position: "fixed",
          zIndex: "2",
          display: "flex",
        }}
      >
        <Col xs={1}></Col>
        <Col xs={17} md={19} lg={7}>
          <div className="navBarLogo">
            <Link to="/">
              <img
                src={logoChange()}
                alt="Original Image"
                style={{ width: "50px", height: "50px", marginTop: "10px" }}
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
                color: fontColor(),
                fontSize: "25px",
                fontWeight: "bold",
                fontStyle: "normal",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50px",
                marginTop: "10px",
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
                marginTop: "5px",
                opacity: "1",
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
                    <Link to="/profile/">
                      <img
                        src={userDetails?.image}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          marginLeft: "10px",
                          marginTop: "32px",
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                      />
                    </Link>
                  </div>
                  <div
                    className="NavBarUserProfileName"
                    style={{
                      color: "#1B5DB7",
                      justifyContent: "center",
                      display: "flex",
                      fontSize: "20px",
                      fontFamily: "kanit",
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
                    }}
                  >
                    student
                  </div>
                  <Divider style={{ color: "black" }} />
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
                  backgroundColor:
                    pathname === "/"
                      ? homeHovered
                        ? "#1B5DB7"
                        : "#1B5DB7"
                      : homeHovered
                      ? "#1B5DB7"
                      : "white",
                  color:
                    pathname === "/"
                      ? homeHovered
                        ? "white"
                        : "white"
                      : homeHovered
                      ? "white"
                      : "#1B5DB7",
                }}
                onMouseEnter={() => setHomeHovered(true)}
                onMouseLeave={() => setHomeHovered(false)}
              >
                <Link to="/">Home</Link>
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
                  backgroundColor:
                    pathname === "/coaches"
                      ? coachesHovered
                        ? "#1B5DB7"
                        : "#1B5DB7"
                      : coachesHovered
                      ? "#1B5DB7"
                      : "white",
                  color:
                    pathname === "/coaches"
                      ? coachesHovered
                        ? "white"
                        : "white"
                      : coachesHovered
                      ? "white"
                      : "#1B5DB7",
                }}
                onMouseEnter={() => setCoachesHovered(true)}
                onMouseLeave={() => setCoachesHovered(false)}
              >
                <Link to="/coaches">Coaches</Link>
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
                  backgroundColor:
                    pathname === "/arcades"
                      ? arcadeHovered
                        ? "#1B5DB7"
                        : "#1B5DB7"
                      : arcadeHovered
                      ? "#1B5DB7"
                      : "white",
                  color:
                    pathname === "/arcades"
                      ? arcadeHovered
                        ? "white"
                        : "white"
                      : arcadeHovered
                      ? "white"
                      : "#1B5DB7",
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
                  backgroundColor:
                    pathname === "/about"
                      ? aboutHovered
                        ? "#1B5DB7"
                        : "#1B5DB7"
                      : aboutHovered
                      ? "#1B5DB7"
                      : "white",
                  color:
                    pathname === "/about"
                      ? aboutHovered
                        ? "white"
                        : "white"
                      : aboutHovered
                      ? "white"
                      : "#1B5DB7",
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
                  backgroundColor:
                    pathname === "/contact"
                      ? contactHovered
                        ? "#1B5DB7"
                        : "#1B5DB7"
                      : contactHovered
                      ? "#1B5DB7"
                      : "white",
                  color:
                    pathname === "/contact"
                      ? contactHovered
                        ? "white"
                        : "white"
                      : contactHovered
                      ? "white"
                      : "#1B5DB7",
                }}
                onMouseEnter={() => setContactHovered(true)}
                onMouseLeave={() => setContactHovered(false)}
              >
                <Link to="/contact">Contact Us</Link>
              </Menu.Item>
              <Menu.Item
                key="PrfileButton"
                style={{
                  fontFamily: "kanit",
                  fontSize: editProfileButtonHovered ? "18px" : "15px",
                  fontWeight: editProfileButtonHovered ? "20px" : "normal",
                  marginTop: "-2px",
                  borderRadius: "10px",
                  justifyContent: "center",
                  display: "flex",
                  backgroundColor: "#1B5DB7",
                  color: "white",
                }}
                onMouseEnter={() => setEditProfileButtonHovered(true)}
                onMouseLeave={() => setEditProfileButtonHovered(false)}
              >
                <EditOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Edit Profile
              </Menu.Item>
              <Menu.Item
                key="contactUs"
                style={{
                  fontFamily: "kanit",
                  fontSize: logOutButtonHovered ? "18px" : "15px",
                  fontWeight: logOutButtonHovered ? "20px" : "normal",
                  marginTop: "-2px",
                  borderRadius: "10px",
                  justifyContent: "center",
                  display: "flex",
                  backgroundColor: "#1B5DB7",
                  color: "white",
                }}
                onMouseEnter={() => setLogOutButtonHovered(true)}
                onMouseLeave={() => setLogOutButtonHovered(false)}
              >
                <LogoutOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                Log Out
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col xs={0} md={0} lg={16} style={{ marginTop: "5px" }}>
          <div
            className="navBarMenu"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "50px",
            }}
          >
            <div style={{ fontSize: "20px" }}>
              <Link
                to="/"
                style={{
                  color: pathname === "/" ? "#68abf8" : fontColor(),
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
                    backgroundColor: pathname === "/" ? "#68abf8" : fontColor(),
                    transition: homeUnderlineStyle.transition,
                  }}
                ></span>
              </Link>
            </div>
            <div style={{ fontSize: "20px" }}>
              <Link
                to="/coaches"
                style={{
                  color: pathname === "/coaches" ? "#01abf8" : fontColor(),
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
                    backgroundColor:
                      pathname === "/coaches" ? "#01abf8" : fontColor(),
                    transition: coachesUnderlineStyle.transition,
                  }}
                ></span>
              </Link>
            </div>

            <div style={{ fontSize: "20px" }}>
              <Link
                to="/arcades"
                style={{
                  color: pathname === "/arcades" ? "#01abf8" : fontColor(),
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
                    backgroundColor:
                      pathname === "/arcades" ? "#01abf8" : fontColor(),
                    transition: arcadeUnderlineStyle.transition,
                  }}
                ></span>
              </Link>
            </div>
            <div style={{ fontSize: "20px" }}>
              <Link
                to="/about"
                style={{
                  color: pathname === "/about" ? "#01abf8" : fontColor(),
                  textDecoration: "none",
                  position: "relative",
                  display: "inline-block",
                }}
                onMouseEnter={aboutHandleMouseEnter}
                onMouseLeave={aboutHandleMouseLeave}
              >
                About Us
                <span
                  style={{
                    position: "absolute",
                    width: aboutUnderlineStyle.width,
                    height: "3px",
                    bottom: "0",
                    left: aboutUnderlineStyle.left,
                    backgroundColor:
                      pathname === "/about" ? "#01abf8" : fontColor(),
                    transition: aboutUnderlineStyle.transition,
                  }}
                ></span>
              </Link>
            </div>
            <div className="navBarUserProfile" style={{ marginTop: "5px" }}>
              <Popover
                content={content}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <a className="NavBarUserProfileImgThumsup">
                  <AdvancedImage
                       style={{
                        width: "45px",
                        height: "45px",
                        marginLeft: "10px",
                        marginTop: "5px",
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    cldImg={
                      cld.image(userDetails?.image)
                      // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                      // .resize(Resize.scale().width(200).height(200))
                    }
                  />
                </a>
              </Popover>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default Navbar;
