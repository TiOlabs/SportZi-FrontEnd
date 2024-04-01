import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Upload, message } from "antd";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";

const AddPackage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleChange = (value: any) => {
    console.log(`Selected: ${value}`);
  };

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
        Add Package
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
        <h1>Arcade Package Form</h1>
      </div>
      <Form.Item
        name="package"
        label="Add your Package Name"
        rules={[
          {
            type: "string",
            message: "Please enter package Name!",
          },
          {
            required: true,
            message: "Please enter your package Name!",
          },
        ]}
      >
        <Input
          placeholder="Package Name"
          style={{ width: "100%" }}
          onChange={(value) => setDuration(value?.toString() || "")}
        />
      </Form.Item>

      <Form.Item
        name="rate"
        label="Add your rate per person"
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
        name="description"
        label="Add Discription About Package"
        rules={[
          {
            required: true,
            message: "Please Add Discription!",
          },
        ]}
      >
        <TextArea
          rows={2}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="package"
        label="Add your Precentage For Coach"
        rules={[
          {
            type: "string",
            message: "Please enter coach precentage!",
          },
          {
            required: true,
            message: "Please enter coach precentage!",
          },
        ]}
      >
        <Input
          placeholder="Coach Precentage"
          style={{ width: "100%" }}
          onChange={(value) => setDuration(value?.toString() || "")}
        />
      </Form.Item>

      {/* .................. picture upload........................  */}

      <Form.Item label="Upload Package Info Image">
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

export default AddPackage;
