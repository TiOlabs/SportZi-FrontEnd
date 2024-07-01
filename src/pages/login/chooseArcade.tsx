import { Col, Row, Button, Modal, Form, Input, TimePicker, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ArcadeCardForMannager from "../../components/ArcadeCardForMannager";
import axiosInstance from "../../axiosInstance";
import { User } from "../../types";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { useLocation } from "../../context/location.context";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface Arcade {
  arcade_id: string;
  arcade_name: string;
  // Add other properties as needed
}

interface Manager {
  Manager: {
    arcade: Arcade[];
    // Add other properties as needed
  };
}

const center: google.maps.LatLngLiteral = { lat: 6.7969, lng: 79.9018 };
const ChooseArcade = () => {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("ihi7kd8o");
  const [managersArcades, setManagersArcades] = useState<User>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [arcadeName, setArcadeName] = useState("");
  const [arcadeAddress, setArcadeAddress] = useState("");
  const [email, setEmail] = useState("");
  const [opentime, setOpentime] = useState("");
  const [closetime, setClosetime] = useState("");
  const [discription, setDiscription] = useState("");
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        console.log("Clicked Location:", clickedLocation);
        setSelectedLocation(clickedLocation);
        setSelected(clickedLocation);
      }
    },
    [setSelectedLocation, setSelected]
  );

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true, //add a cropping step
    cropWidth: 200, //crop the image to the given width
    cropHeight: 200, //crop the image to the given height
    showAdvancedOptions: true, //add advanced options (public_id and tag)
    folder: "Coaches-SportZi", //upload files to the specified folder
    resize: "fill",
  });

  useEffect(() => {
    axiosInstance
      .get("/api/auth/getchoosenArcade/")
      .then((res) => {
        const data = res.data;
        setManagersArcades(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleFinish();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleFinish = async () => {
    console.log("finish");
    // console.log("selectedLocation", selectedLocation);
    // const location = selectedLocation ? JSON.stringify(selectedLocation) : "";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addarcadeDetails`,
        {
          arcade_name: arcadeName,
          address: arcadeAddress,
          arcade_email: email,
          manager_id: managersArcades?.user_id,
          open_time: opentime,
          close_time: closetime,
          // distription: discription,
          // arcade_image: publicId,
          // location: location,
        }
      );
      window.location.reload();
      console.log(response);
      setIsModalVisible(false);
    } catch (err) {
      console.log(err);
    }
    finally{
      message.success("Arcade Added Successfully");
    }
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const imgObject = cld.image(publicId);
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

          .page-background {
            background: white;
            opasity:0.5;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .inner-div {
            padding: 20px;
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid #d9d9d9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
          }

          .inner-div:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }
        `}
      </style>
      <Row className="page-background">
        <Col xs={2} md={4} lg={8}></Col>
        <Col xs={20} md={16} lg={8}>
          <div className="inner-div">
            <div
              style={{
                fontSize: "24px",
                fontWeight: "400",
                color: "#000",
                fontFamily: "kanit",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Choose your Arcade
            </div>

            {managersArcades &&
              managersArcades.Manager.arcade.map((arcade) => (
                <ArcadeCardForMannager
                  key={arcade.arcade_id}
                  arcade_id={arcade.arcade_id}
                  arcade_name={arcade.arcade_name}
                />
              ))}

            <Button
              type="primary"
              icon="+"
              onClick={showModal}
              style={{ marginTop: "20px", borderRadius: "3px", width: "100%" }}
            />

            <Modal
              title="Add a New Arcade"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                layout="vertical"
                style={{ marginTop: "10%", margin: "2%" }}
                onFinish={handleFinish}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2>New Arcade Details</h2>
                </div>

                <Form.Item
                  name="ArcadeName"
                  label="Add your Arcade Name"
                  rules={[
                    {
                      type: "string",
                      message: "Please enter a Arcade name!",
                    },
                    {
                      required: true,
                      message: "Please input your Arcade Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Arcade Name"
                    onChange={(e) => setArcadeName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="Arcade Address"
                  label="Add your Arcade Address"
                  rules={[
                    {
                      type: "string",
                      message: "Please enter a Arcade address!",
                    },
                    {
                      required: true,
                      message: "Please input your Arcade address!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Arcade Address"
                    onChange={(e) => setArcadeAddress(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="opentime"
                  label="Open Time"
                  rules={[
                    {
                      required: true,
                      message: "Please select Open Time!",
                    },
                  ]}
                >
                  <TimePicker
                    onChange={(time) => {
                      if (time) {
                        const formattedTime = time.format("HH:mm:ss");
                        setOpentime(formattedTime);
                      } else {
                        setOpentime("");
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="closetime"
                  label="Closed Time"
                  rules={[
                    {
                      required: true,
                      message: "Please select Close Time!",
                    },
                  ]}
                >
                  <TimePicker
                    onChange={(time) => {
                      if (time) {
                        const formattedTime = time.format("HH:mm:ss");
                        setClosetime(formattedTime);
                      } else {
                        setClosetime("");
                      }
                    }}
                  />
                </Form.Item>
                {/* <Form.Item
                  name="Discription"
                  label="Add a description"
                  rules={[
                    {
                      type: "string",
                      message: "Please enter a Arcade description!",
                    },
                    {
                      required: true,
                      message: "Please input your Arcade Descrition!",
                    },
                  ]}
                >
                  <TextArea
                    rows={2}
                    placeholder="descrition"
                    onChange={(e) => setDiscription(e.target.value)}
                  />
                </Form.Item> */}
                {/* <Form.Item
                  name="Update Your Location"
                  label="Update Your Location"
                >
                  <GoogleMap
                    center={center}
                    zoom={15}
                    onClick={handleClick}
                    mapContainerStyle={{
                      width: "100%",
                      height: "40vh",
                    }}
                  >
                    {selected && (
                      <Marker
                        position={{
                          lat: selected.lat,
                          lng: selected.lng,
                        }}
                      />
                    )}
                  </GoogleMap>
                </Form.Item> */}
                {/* .................. picture upload........................  */}

                {/* <Form.Item label="Upload Zone Image">
                  <CloudinaryUploadWidget
                    uwConfig={uwConfig}
                    setPublicId={setPublicId}
                  />

                  <AdvancedImage
                    style={{ maxWidth: "100px" }}
                    cldImg={imgObject}
                    plugins={[responsive(), placeholder()]}
                  />
                </Form.Item> */}
              </Form>
            </Modal>
          </div>
        </Col>
        <Col xs={2} md={4} lg={8}></Col>
      </Row>
    </>
  );
};

export default ChooseArcade;
