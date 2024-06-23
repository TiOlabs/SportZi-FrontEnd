import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Col, Row, Empty, Dropdown, Menu } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PlayerContext } from "../context/player.context";
import { ArcadeContext } from "../context/Arcade.context";
import { CoachContext } from "../context/coach.context";
import { UserContext } from "../context/userContext";
import { DeleteOutlined } from "@ant-design/icons";

const PhotoCollageForArcade = (props: any) => {
  const [userPhotos, setUserPhotos] = useState<any[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  // const { managerDetails } = useContext(ArcadeContext);
  // const { coachDetails } = useContext(CoachContext);
  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       console.log("hhh");
  //       console.log(userDetails);
  //       console.log(userDetails?.id);
  //       console.log(userDetails?.id);
  //       const res = await axios.get(
  //         process.env.REACT_APP_API_URL +
  //         `api/getuser/${userDetails?.id}`
  //       );
  //       const data = await res.data;
  //       console.log(data.userphoto);
  //       setUserPhotos(data.userphoto);
  //     };
  //     fetchData();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [userDetails]);
  useEffect(() => {
    console.log(props);

    const fetchData = async () => {
      try {
        let res;

        res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails/${props.arcade_id}`
        );

        // else if (managerDetails) {
        //   console.log("Fetching manager details...");
        //   res = await axios.get(
        //     `${process.env.REACT_APP_API_URL}api/getmanager/${managerDetails.id}`
        //   );
        // }
        console.log(res);
        if (res) {
          const data = res.data;
          console.log(data.arcadephoto);
          setUserPhotos(data.arcadephoto);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [props]);
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
      try {
        const res = axios.delete(
          `${process.env.REACT_APP_API_URL}api/deleteArcadePhoto`,
          {
            data: {
              user_id: userPhotos[index].arcade_id,
              image: userPhotos[index].image,
            },
          }
        );
        console.log(res);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };
  const getMenu = (index: number) => (
    <Menu onClick={(e) => handleMenuClick(e, index)}>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );
  // Check if userPhotos is defined before using slice
  const items = userPhotos ? (
    userPhotos.slice(0, 8).map(
      (photo: any, index: number) => (
        console.log(photo.image),
        (
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
                <DeleteOutlined />
              </span>
            </Dropdown>
            <AdvancedImage
              key={index}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              cldImg={cld.image(photo.image)}
            />
          </div>
        )
      )
    )
  ) : (
    <Empty />
  );

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

export default PhotoCollageForArcade;
