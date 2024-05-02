import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal,message } from "antd";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { useParams } from "react-router-dom";

const UpdatePackage = (props : any) => {
  const { ArcadeId } = useParams();
console.log("props",props);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [rate, setRate] = useState(props.rate);
  const [description, setDescription] = useState(props.packageDescription);
  const [publicId, setPublicId] = useState(props.packageImage);
  const [PackageName, setPackageName] = useState(props.packageName);
  const [CoachPrecentage, setCoachPrecentage] = useState(props.coachPrecentage);
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
    console.log("description", description);
    console.log("CoachPrecentage", CoachPrecentage);
    console.log("PackageName", props.package_id);
const rateInt = parseInt(rate);
const CoachPrecentageInt = parseInt(CoachPrecentage);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updatePackageDetails/${props.package_id}`,
        {
          package_name: PackageName,
          rate_per_person: rateInt,
          description: description,
          percentageForCoach: CoachPrecentageInt,
          package_image: publicId,
        }
      );
      console.log(res);
    } catch (error) {
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
        }}
      >
        Update
      </Button>

      <Modal
        visible={isModalOpen}
        onOk={handleFinish}
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
        <h1>Arcade Package Update</h1>
      </div>
      <Form.Item
        name="package"
        label="Update Package Name"
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
        defaultValue={props.packageName}
          placeholder="Package Name"
          style={{ width: "100%" }}
          onChange={(e) => setPackageName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="rate"
        label="Update rate per person"
        rules={[
          {
            type: "number",
            message: "Please enter rate!",
          },
          {
            required: true,
            message: "Please input your rate!",
          },
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.reject(new Error("Rate must be greater than 0"));
              }
            }
          }
        ]}
      >
        <InputNumber
        defaultValue={props.rate}
          placeholder="rate"
          style={{ width: "100%" }}
          onChange={(value) => setRate(value?.toString() || "")}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Update Package Discription"
        rules={[
          {
            required: true,
            message: "Please Add Discription!",
          },
        ]}
      >
        <TextArea
        defaultValue={props.packageDescription}
          rows={2}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="CoachPrecentage"
        label="Update Coach Precentage"
        rules={[
          {
            type: "number",
            message: "Please enter coach precentage!",
          },
          {
            required: true,
            message: "Please input coach precentage!",
          },
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.reject(new Error("Rate must be greater than 0"));
              }
              else if (value > 100) {
                return Promise.reject(new Error("Rate must be less than 100"));
              }
            }
          }
        ]}
      >
        <InputNumber
        defaultValue={props.coachPrecentage}
          placeholder="Coach Precentage"
          style={{ width: "100%" }}
          onChange={(value) => setCoachPrecentage(value?.toString() || "")}
        />
      </Form.Item>

      {/* .................. picture upload........................  */}

      <Form.Item label="Update Package Info Image">
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <AdvancedImage
          style={{ maxWidth: "100px" }}
          cldImg={imgObject}
          plugins={[responsive(), placeholder()]}
          defaultValue={props.packageImage}
        />
      </Form.Item>
      <Form.Item>
        {contextHolder}
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

export default UpdatePackage;
