import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";

const AddZone = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    messageApi.success({ content: 'Submitted successfully!', key, duration: 2 });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [rate, setRate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [way, setWay] = useState("");
  const [arcadeName, setArcadeName] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("ihi7kd8o");
  const [startedTime, setStartedTime] = useState<string | null>(null);
  const [closedTime, setClosedTime] = useState<string | null>(null);
  const [discription, setDiscription] = useState("");
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
  const [messageApi, contextHolder] = message.useMessage();
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
    console.log("rate", rate);
    console.log("publicId", publicId);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addZoneDetails`,
        {
          zone_name: arcadeName,
          capacity: capacityint,
          rate: rateint,
          description: discription,
          way_of_booking: way,
          zone_image: publicId,
          open_time: startedTime,
          close_time: closedTime,
          arcade_id: "784e88e4-d891-41c7-b5da-eaad73cc8e0d",
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: "#EFF4FA",
          color: "#0E458E",
          borderRadius: "3px",
          fontFamily: "kanit",
          borderColor: "#0E458E",
        }}
      >
        Add Zone
      </Button>

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
            <h1>Application Form - For add a zone</h1>
          </div>
          <Form.Item
            name="ArcadeName"
            label="Add your Arcade Name"
            rules={[
              {
                type: "string",
                message: "Please enter a arcade name!",
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
            name="capacity"
            label="Add your arcade capacity"
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
              onChange={(value) => setCapacity(value?.toString() || "")}
            />
          </Form.Item>

          <Form.Item
            name="rate"
            label="Add your rate"
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
              onChange={(value) => setRate(value?.toString() || "")}
            />
          </Form.Item>
          <Form.Item
            name="Discription"
            label="Add your Arcade discription"
            rules={[
              {
                type: "string",
                message: "Please enter a arcade discription!",
              },
              {
                required: true,
                message: "Please input your Arcade Discrition!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="discrition"
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
              onChange={(value) => setWay(value)}
            >
              <Select.Option value="full">full</Select.Option>
              <Select.Option value="person_by_person">person_by_person</Select.Option>
              <Select.Option value="Both">Both</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="TimeStart"
            label="Add Arcade Open Time"
            rules={[
              {
                required: true,
                message: "Please select Arcade Open time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              onChange={(time, timeString: string | string[]) => handleTimeChangeStart(time, Array.isArray(timeString) ? timeString[0] : timeString)}
            />
          </Form.Item>
          <Form.Item
            name="TimeClose"
            label="Add Arcade Close Time"
            rules={[
              {
                required: true,
                message: "Please select arcade Close Time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              onChange={(time, timeString: string | string[]) => handleTimeChangeClose(time, Array.isArray(timeString) ? timeString[0] : timeString)}
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
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddZone;
