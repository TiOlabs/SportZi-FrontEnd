import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const UpdateZone = (props: any) => {
  const { ArcadeId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    messageApi.success({
      content: "Submitted successfully!",
      key,
      duration: 2,
    });
    window.location.reload();
  };
  const [rate, setRate] = useState(props.rate);
  const [capacity, setCapacity] = useState(props.capacity);
  const [way, setWay] = useState(props.way_of_booking);
  const [arcadeName, setArcadeName] = useState(props.name);
  const [publicId, setPublicId] = useState(props.zone_image);
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("ihi7kd8o");
  const [startedTime, setStartedTime] = useState<any>(props.open_time);
  const [closedTime, setClosedTime] = useState<string | null>(props.close_time);
  const [discription, setDiscription] = useState(props.description);
  const [sportc, setSportc] = useState("");
  console.log(sportc);
  console.log(props.sport);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(arcadeName);
  const handleTimeChangeStart = (time: any, timeString: string) => {
    setStartedTime(timeString);
    console.log("Selected time:", timeString);
  };
  const handleTimeChangeClose = (time: any, timeString: string) => {
    setClosedTime(timeString);
    console.log("Selected time:", timeString);
  };
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
  const [messageApi] = message.useMessage();
  const key = "updatable";

  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Loaded!",
        duration: 2,
      });
    }, 1000);
  };
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const imgObject = cld.image(publicId);

  const handleFinish = async () => {
    const capacityint = parseInt(capacity);
    const rateint = parseInt(rate);
    let sportcc = sportc;
    if (sportcc === "") {
      sportcc = props.sport_id;
    }
    try {
      console.log(sportcc);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updateZoneDetails/${props.id}`,
        {
          zone_name: arcadeName,
          capacity: capacityint,
          rate: rateint,
          description: discription,
          way_of_booking: way,
          zone_image: publicId,
          open_time: startedTime,
          close_time: closedTime,
          arcade_id: ArcadeId,
          sport_id: sportcc,
        }
      );
      console.log(res);
      message.success("Zone Updated Successfully");
    } catch (error) {
      console.log("Error:");
      console.log(error);
    }
    handleOk();
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: "#5587CC",
          color: "white",
          fontFamily: "kanit",
          marginLeft: "-10px",
        }}
      >
        Update
      </Button>
      {console.log("arcadeName", arcadeName)}
      <Modal visible={isModalOpen} onOk={handleFinish} onCancel={handleCancel}>
        <Form
          layout="vertical"
          style={{ marginTop: "10%", margin: "2%" }}
          onFinish={handleFinish}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#0E458E",
            }}
          >
            <h1>Update Arcade Details</h1>
          </div>

          <Form.Item
            name="ArcadeName"
            label="Zone Name"
            rules={[
              {
                type: "string",
                message: "Please enter a Zone name!",
              },
              {
                required: true,
                message: "Please input your Zone Name!",
              },
            ]}
          >
            <Input
              placeholder="Zone Name"
              defaultValue={arcadeName}
              onChange={(e) => {
                setArcadeName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Zone capacity"
            rules={[
              {
                type: "number",
                message: "Please enter zone capacity!",
              },
              {
                required: true,
                message: "Please input zone capacity!",
              },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject("Capacity should be greater than 0");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="capacity"
              style={{ width: "100%" }}
              defaultValue={capacity}
              onChange={(value) => setCapacity(value?.toString() || "")}
            />
          </Form.Item>

          <Form.Item
            name="rate"
            label="Zone rate"
            rules={[
              {
                type: "number",
                message: "Please enter a valid number!",
              },
              {
                required: true,
                message: "Please input your number!",
              },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject("Rate should be greater than 0");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="rate"
              style={{ width: "100%" }}
              defaultValue={rate}
              onChange={(value) => setRate(value?.toString() || "")}
            />
          </Form.Item>
          <Form.Item
            name="Discription"
            label="Zone discription"
            rules={[
              {
                type: "string",
                message: "Please enter a Zone discription!",
              },
              {
                required: true,
                message: "Please input your Zone Discrition!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="discrition"
              defaultValue={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="way_of_booking"
            label="Way of Booking"
            rules={[
              {
                required: true,
                message: "Please select a way of booking!",
              },
            ]}
          >
            <Select
              placeholder="Select a way of booking"
              defaultValue={way}
              onChange={(value) => setWay(value)}
            >
              <Select.Option value="full">full</Select.Option>
              <Select.Option value="person_by_person">
                person_by_person
              </Select.Option>
              <Select.Option value="Both">Both</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Sport"
            label="Sport"
            rules={[
              {
                required: true,
                message: "Please select a sport",
              },
            ]}
          >
            <Select
              placeholder="Select a sport"
              defaultValue={props.sport}
              onChange={(value) => setSportc(value)}
            >
              <Select.Option value="S00001">Cricket</Select.Option>
              <Select.Option value="S00002">FootBall</Select.Option>
              <Select.Option value="S00003">Swimming</Select.Option>
              <Select.Option value="S00004">Gym</Select.Option>
              <Select.Option value="S00005">NetBall</Select.Option>
              <Select.Option value="S00006">Batmintain</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="TimeStart"
            label="Update Zone Open Time"
            rules={[
              {
                required: true,
                message: "Please select Zone Open time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              defaultValue={dayjs(startedTime, "HH:mm")}
              onChange={(time, timeString: string | string[]) =>
                handleTimeChangeStart(
                  time,
                  Array.isArray(timeString) ? timeString[0] : timeString
                )
              }
            />
          </Form.Item>
          <Form.Item
            name="TimeClose"
            label="Update Zone Close Time"
            rules={[
              {
                required: true,
                message: "Please select Zone Close Time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              defaultValue={dayjs(closedTime, "HH:mm")}
              onChange={(time, timeString: string | string[]) =>
                handleTimeChangeClose(
                  time,
                  Array.isArray(timeString) ? timeString[0] : timeString
                )
              }
            />
          </Form.Item>
          {/* .................. picture upload........................  */}

          <Form.Item label="Upload Zone Image">
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
            />

            <AdvancedImage
              style={{ maxWidth: "100px" }}
              cldImg={imgObject}
              plugins={[responsive(), placeholder()]}
              defaultValue={publicId}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateZone;
