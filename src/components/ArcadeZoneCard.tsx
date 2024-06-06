import { Button, Col, Grid, Modal, Row, Typography } from "antd";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import axios from "axios";
import UpdateZone from "./UpdateZone";
const ArcadeZoneCard = (props: any) => {
  console.log("lol ", props);
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleConfirmDelete = () => {
    window.location.reload();
  };

  return (
    <>
      <Row
        style={{
          width: lg ? "360px" : "300px",
          minHeight: lg ? "400px" : "350px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "felx-start",
        }}
      >
        <Row
          style={{
            width: "100%",
            height: lg ? "170px" : "150px",
          }}
        >
          <AdvancedImage
            style={{ height: "100%", width: "100%" }}
            cldImg={
              cld.image(props.zoneImage)
              // .resize(Resize.crop().width(200).height(200).gravity('auto'))
              // .resize(Resize.scale().width(200).height(200))
            }
          />
        </Row>
        <Row
          style={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Col
            xs={24}
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontSize: lg ? "22px" : "20px",
                fontWeight: "500",
                color: "#003783",
              }}
            >
              {props.zoneName}
            </Typography>
            <Typography style={{ display: "flex", justifyContent: "right" }}>
              {props.capacity} CPTY
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "20px" : "18px",
                fontWeight: "light",
                color: "black",
                width: "80%",
              }}
            >
              Availiable on : {props.open_time} - {props.close_time}
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "20px" : "18px",
                fontWeight: "light",
                color: "black",
                width: "80%",
              }}
            >
              In Week Days
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "16px" : "14px",
                fontWeight: "extra-light",
                color: "black",
                width: "80%",
              }}
            >
              {props.description}
            </Typography>
            <Row
              style={{
                marginTop: "10px",
                width: "100%",
                display: "flex",
              }}
            >
              <Col
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    fontSize: lg ? "18px " : "16px",
                    fontFamily: "kanit",
                    fontWeight: "500",
                    color: "#5587CC",
                  }}
                >
                  Rs.{props.rate}
                </Typography>
                <Typography
                  style={{
                    fontSize: lg ? "18px " : "16px",
                    fontFamily: "kanit",
                    fontWeight: "500",
                    color: "#5587CC",
                  }}
                >
                  per hour
                </Typography>
              </Col>
              <Col
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UpdateZone
                  id={props.id}
                  rate={props.rate}
                  name={props.zoneName}
                  description={props.description}
                  zoneImage={props.zoneImage}
                  way_of_booking={props.way_of_booking}
                  open_time={props.open_time}
                  close_time={props.close_time}
                  capacity={props.capacity}
                  sport={props.sport}
                  sport_id={props.sport_id}
                  day={props.day}
                  timeForDay={props.timeForDay}
                  date={props.date}
                  timeForDate={props.timeForDate}
                />

                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "3px",
                  }}
                  onClick={showModal}
                >
                  Delete
                </Button>
                <Modal
                  visible={open}
                  onOk={async (e) => {
                    const url = `${process.env.REACT_APP_API_URL}api/deleteZoneDetails/${props.id}`;

                    axios
                      .delete(url)
                      .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                          console.log("success");
                        } else {
                          console.log("error");
                        }
                      })
                      .catch((e) => console.log(e));
                    handleConfirmDelete();
                  }}
                  onCancel={handleCancel}
                >
                  <p>Are you sure you want to delete this arcade zone?</p>
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  );
};
export default ArcadeZoneCard;
