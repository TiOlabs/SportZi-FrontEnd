import { Col, Row } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PlayerContext } from "../context/player.context";

const PhotoCollage = () => {
  const [playerPhotos, setPlayerPhotos] = useState([]);
  const { userDetails } = useContext(PlayerContext);
  console.log("userDetails", userDetails);
  console.log(userDetails?.id);
  useEffect(() => {
    try {
      axios
        .get(
        `http://localhost:8000/api/auth/getplayerPhotos/${userDetails.id}`
        )
        .then((res) => {
          console.log(res.data);
          setPlayerPhotos(res.data);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);
  // useEffect(() => {
  //   try{
  //   axios
  //     .get(
  //       process.env.REACT_APP_API_URL +
  //         `api/auth/getplayerPhotos/${userDetails.id}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setPlayerPhotos(res.data);
  //     });
  //   }catch(error){
  //     console.error("Error:", error);
  //   }
  // },[]);
  const items = Array.from({ length: 8 }).map((_, index) => (
    <img
      key={index}
      src={`https://picsum.photos/200/${Math.floor(
        Math.random() * (300 - 200 + 1) + 200
      )}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  ));
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
      <Row style={{ width: "90%" }}>
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
