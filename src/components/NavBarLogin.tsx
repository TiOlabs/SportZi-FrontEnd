import {
  EditOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logoBlack.png";
import { Button } from "antd/es/radio";
import Cookies from "js-cookie";
import { UserIdContext } from "../context/userId.context";

const NavbarLogin: React.FC = () => {
  const { setUserId } = useContext(UserIdContext);
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { pathname } = useLocation();

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
  setUserId(token);

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
    } else {
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
    } else {
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
    } else {
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
                  {/* <Divider style={{ color: "black" }} /> */}
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
              {/* <Menu.Item
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
              </Menu.Item> */}
              <Link to={"/login"}>
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
                  Login
                </Menu.Item>
              </Link>
              <Link to={"/signupPlayer"}>
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
                  <UserAddOutlined
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  />
                  Sign Up
                </Menu.Item>
              </Link>
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
            <div
              className="navBarUserButtons"
              style={{ marginTop: "5px", display: "flex" }}
            >
              <Link to="/login">
                <Button
                  type="primary"
                  style={{
                    color: "#1B5DB7",
                    fontSize: "20px",
                    width: "100px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    marginRight: "10px",
                    border: "1px solid #1B5DB7",
                  }}
                >
                  Log In
                </Button>
              </Link>

              <Link to="/signupPlayer">
                <Button
                  type="primary"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    width: "100px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "3px",
                    backgroundColor: "#1B5DB7",
                    border: "none",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default NavbarLogin;
