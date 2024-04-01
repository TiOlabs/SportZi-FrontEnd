import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, TimePicker, Upload, message } from "antd";
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
  const [duration, setDuration] = useState("");
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("ihi7kd8o");
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
    console.log("rate", rate);
    console.log("duration", duration);
    console.log("description", description);
    console.log("publicId", publicId);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addcoachassignvalues`,
        {
          rate: rate,
          duration: duration,
          description: description,
          coach_image: publicId,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  function setTimeOpenClose(timeString: [string, string]): void {
    throw new Error("Function not implemented.");
  }

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

      <Modal
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
      layout="vertical"
      style={{ marginTop: "10%", margin: "2%" }}
      onFinish={handleFinish}
    >
      <div
        style={{ display: "flex", justifyContent: "center", color: "#0E458E" }}
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
        <TextArea
          rows={1}
          placeholder="Arcade Name"
          onChange={(e) => setDescription(e.target.value)}
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
        ]}
      >
        <InputNumber
          placeholder="capacity"
          style={{ width: "100%" }}
          onChange={(value) => setRate(value?.toString() || "")}
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
        ]}
      >
        <InputNumber
          placeholder="rate"
          style={{ width: "100%" }}
          onChange={(value) => setRate(value?.toString() || "")}
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
        onChange={(value) => setDuration(value)}
      >
        <Select.Option value="Full Day">Full Day</Select.Option>
        <Select.Option value="Per Person">Per Person</Select.Option>
        <Select.Option value="For Time Period">For Time Period</Select.Option>
        <Select.Option value="Other">Other</Select.Option>
        {/* Add more options as needed */}
      </Select>
      </Form.Item>
      <Form.Item
        name="Time"
        label="Add Time Open to Close"
        rules={[
          {
            required: true,
            message: "Please input the opening and closing times!",
          },
        ]}
        >
        <TimePicker.RangePicker
          format="HH:mm"
          onChange={(time, timeString) => setTimeOpenClose(timeString)}
        />
      </Form.Item>

      {/* .................. picture upload........................  */}

      <Form.Item label="Upload Zone Image">
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <AdvancedImage
          style={{ maxWidth: "100px" }}
          cldImg={imgObject}
          plugins={[responsive(), placeholder()]}
        />
      </Form.Item>
      <Form.Item>
        {contextHolder}
        <Button type="primary" htmlType="submit" onClick={openMessage}>
          Submit
        </Button>
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

export default AddZone;
