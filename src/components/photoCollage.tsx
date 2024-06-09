import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Col, Row, Empty, Menu, Dropdown } from "antd";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { UserContext } from "../context/userContext";

const PhotoCollage = () => {
  const { ArcadeId } = useParams();
  const { userDetails } = useContext(UserContext);
  const [userPhotos, setUserPhotos] = useState<any[]>([]); // Specify the type of userPhotos
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null); // Specify the type of openMenuIndex

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;

        if (userDetails.role === "PLAYER") {
          res = await axios.get(
            `${process.env.REACT_APP_API_URL}api/getuser/${userDetails.id}`
          );
        } else if (userDetails.role === "COACH") {
          res = await axios.get(
            `${process.env.REACT_APP_API_URL}api/getcoache/${userDetails.id}`
          );
        } 

        if (res) {
          const data = res.data;
          setUserPhotos(data.arcadephoto);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [userDetails]);

  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const handleMenuClick = (e: any, index: number) => {
    // Specify type for index parameter
    if (e.key === "delete") {
      // Implement delete functionality here
      console.log("Delete photo", userPhotos[index]);
    }
  };

  const getMenu = (index: number) => (
    <Menu onClick={(e) => handleMenuClick(e, index)}>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  const items = userPhotos ? (
    userPhotos.slice(0, 8).map((photo, index) => (
      <div key={index} style={{ position: "relative" }}>
        <Dropdown
          overlay={getMenu(index)}
          trigger={["click"]}
          visible={openMenuIndex === index}
          onVisibleChange={(visible) =>
            setOpenMenuIndex(visible ? index : null)
          }
        >
          <span
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              cursor: "pointer",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Replace this with your three-dot icon */}
            ...
          </span>
        </Dropdown>
        <AdvancedImage
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          cldImg={cld.image(photo.image)} // Ensure 'photo' has 'image' property
        />
      </div>
    ))
  ) : (
    <Empty />
  );

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        height: "max-content",
        marginBottom: "20px",
      }}
    >
      <Row
        style={{
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 3, 900: 4 }}
          >
            <Masonry>{items}</Masonry>
          </ResponsiveMasonry>
        </Col>
      </Row>
    </Row>
  );
};

export default PhotoCollage;
