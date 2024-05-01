import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Col, Row,Empty } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PlayerContext } from "../context/player.context";
import { useArcade } from "../context/Arcade.context";

const PhotoCollageForArcade = () => {
  const { userDetails } = useContext(PlayerContext);
  const [userPhotos, setUserPhotos] = useState([]);
  const { managerDetails } = useArcade();
  useEffect(() => {
    try {
      const fetchData = async () => {
        console.log("hhh");
        console.log(userDetails);
        console.log(userDetails?.id);
        console.log(managerDetails?.id);
        const res = await axios.get(
          process.env.REACT_APP_API_URL +
          `api/getuser/${managerDetails?.id}`
        );     
        const data = await res.data;
        console.log(data.userphoto);
        setUserPhotos(data.userphoto);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [userDetails, managerDetails.id]);
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  
  // Check if userPhotos is defined before using slice
  const items = userPhotos ? 
    Array.from({ length: 1 }).map((_, index) =>
      userPhotos.slice(0, 8).map((photo: any, photoIndex: number) => (
        console.log(photo.image),
        (
          <AdvancedImage
            key={photoIndex}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            cldImg={cld.image(photo.image)}
          />
        )
      ))
    ) : <Empty />;
  
  // const items = Array.from({ length: 1 }).map(
  //   (_, index) =>
  //     userPhotos.slice(0, 8).map(
  //       (photo: any, photoIndex: number) => (
  //         console.log(photo.image),
  //         (
  //           <AdvancedImage
  //             key={photoIndex}
  //             style={{
  //               width: "100%",
  //               height: "100%",
  //               objectFit: "cover",
  //               objectPosition: "center",
  //             }}
  //             cldImg={
  //               cld.image(photo.image)
  //               // .resize(Resize.crop().width(200).height(200).gravity('auto'))
  //               // .resize(Resize.scale().width(200).height(200))
  //             }
  //           />
  //         )
  //       )
  //     )
  //   );
    //   <AdvancedImage
    //   style={{ height: "auto", width: "300px" }}
    //   cldImg={
    //     cld.image("user-players/czp4iujpvtynn62v60o8")
    //     // .resize(Resize.crop().width(200).height(200).gravity('auto'))
    //     // .resize(Resize.scale().width(200).height(200))
    //   }
    // />
    // <img
    //   key={index}
    //   src={`https://picsum.photos/200/${Math.floor(
    //     Math.random() * (300 - 200 + 1) + 200
    //   )}`}
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     objectFit: "cover",
    //     objectPosition: "center",
    //   }}
    // />
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
      <Row style={{ width: "90%",display:"flex",alignItems:"center",justifyContent:"center" }}>
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

export default PhotoCollageForArcade;