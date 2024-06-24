import { Button, Col, Grid, Modal, Row, Typography } from "antd";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import UpdatePackage from "./UpdatePackage";
import axios from "axios";

const ArcadePackages = (props: any) => {
  console.log("lol ", props);
  console.log("lol ", props.packageImage);
  const { useBreakpoint } = Grid;
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleConfirmDelete = () => {
    window.location.reload();
  };
  const { lg } = useBreakpoint();
  return (
    <>
      <Row
        style={{
          boxShadow: "0.2px 0.2px 2px 0.2px rgba(0, 0, 0, 0.2)",

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
            cldImg={cld.image(props.packageImage)}
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
              {" "}
              {props.packageName}
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "20px" : "18px",
                fontWeight: "light",
                color: "black",
                width: "80%",
                fontFamily: "kanit",
              }}
            >
              Conduct By
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "20px" : "18px",
                fontWeight: "light",
                color: "black",
                width: "80%",
              }}
            >
              Zone : {props.zoneName}
            </Typography>
            <Typography
              style={{
                fontSize: lg ? "16px" : "14px",
                fontWeight: "extra-light",
                color: "black",
                width: "80%",
              }}
            >
              {props.packageDescription}
            </Typography>
            <Row>
              <Col
                xs={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Row>
                    <Col xs={6}>
                      <Typography
                        style={{
                          fontSize: lg ? "18px" : "16px",
                          fontFamily: "kanit",
                          fontWeight: "400",
                          color: "#5587CC",
                        }}
                      >
                        Day & Time
                      </Typography>
                    </Col>
                    <Col xs={18}>
                      {props.day.map(
                        (
                          d:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined,
                          index: Key | null | undefined
                        ) => (
                          <Typography
                            key={index}
                            style={{
                              fontSize: lg ? "18px" : "16px",
                              fontFamily: "kanit",
                              fontWeight: "300",
                            }}
                          >
                            {d}{" "}
                            {props.time &&
                              typeof index === "number" &&
                              props.time[index]}
                          </Typography>
                        )
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
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
                  LKR {props.rate}
                </Typography>
                <Typography
                  style={{
                    fontSize: lg ? "18px " : "16px",
                    fontFamily: "kanit",
                    fontWeight: "500",
                    color: "#5587CC",
                  }}
                >
                  per month
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
                <UpdatePackage
                  packageName={props.packageName}
                  packageDescription={props.packageDescription}
                  rate={props.rate}
                  package_id={props.package_id}
                  packageImage={props.packageImage}
                  coachPrecentage={props.CoachPrecentage}
                  day={props.day}
                  time={props.time}
                  zone_id={props.zone_id}
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
                    const res = await axios.put(
                      `${process.env.REACT_APP_API_URL}api/updatePackageDetails/${props.package_id}`,
                      {
                        status: "Closed",
                      }

                    );
                    console.log(res);
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
export default ArcadePackages;
