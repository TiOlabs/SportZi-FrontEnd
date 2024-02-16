import { Button, Form, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { useState } from "react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import axios from "axios";
import AppFooter from "../../components/footer";

const CoachAssignDetailsForm = () => {
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
        "http://localhost:8000/api/addcoachassignvalues",
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
    <Form
      layout="vertical"
      style={{ marginTop: "10%", margin: "2%" }}
      onFinish={handleFinish}
    >
      <div
        style={{ display: "flex", justifyContent: "center", color: "#0E458E" }}
      >
        <h1>Arcade Application Form - As a coach</h1>
      </div>
      <Form.Item
        name="duration"
        label="Add your duration"
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
          placeholder="duration"
          style={{ width: "100%" }}
          onChange={(value) => setDuration(value?.toString() || "")}
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
        name="description"
        label="Add Discription About you"
        rules={[
          {
            required: true,
            message: "Please Add Discription!",
          },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      {/* .................. picture upload........................  */}

      <Form.Item label="Upload Image">
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <AdvancedImage
          style={{ maxWidth: "100px" }}
          cldImg={imgObject}
          plugins={[responsive(), placeholder()]}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <AppFooter/>
    </Form>
  );
};

export default CoachAssignDetailsForm;
