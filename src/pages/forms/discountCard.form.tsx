import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  UploadFile,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import axios from "axios";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import AppFooter from "../../components/footer";
const DiscountCardForm = () => {
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("n6ykxpof");
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Discount Added Successfully!',
        duration: 2,
      });
    }, 1000);
  };
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true, //add a cropping step
    cropWidth: 200, //crop the image to the given width
    cropHeight: 200, //crop the image to the given height
    showAdvancedOptions: true, //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    folder: "sportzi", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
    // maxImageHeight:100, //Scales the image down to a height of 2000 pixels before uploading
    // minImageHeight:100, //Scales the image up to a height of 100 pixels before uploading
    // cropImage: true, //crop the image to the given width and height
    // widthOfCrop: "200px", //crop the image to the given width
    // heightOfCrop: "200px", //crop the image to the given height
    resize: fill(200, 200), //resize the image to the given width and height
    w_200: fill(200), //resize the image to the given width
    h_100: fill(100), //resize the image to the given height
    c_fit: "fit", //applies the fit crop mode
    cropingAspectRatio: 1, //crop the image to the given aspect ratio
    croppingCoordinatesMode: "custom", //crop the image to the given aspect ratio
    croppingShowDimensions: true, //crop the image to the given aspect ratio
    croppingDefaultSelectionRatio: 1, //crop the image to the given aspect ratio
    croppingValidateDimensions: true, //crop the image to the given aspect ratio
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const imgObject = cld.image(publicId);

  const handleFinish = async () => {
    const discountint = parseInt(discount);
    console.log(discount, description);
    console.log(imgObject);
    console.log(publicId);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/adddiscoutcardvalues",
        {
          discount_percentage: discountint,
          description: description,
          discount_image: publicId,
        }
      );
      console.log(res);
    } catch (error) {
      console.log("error");
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
        <h1>Add a Discount Card</h1>
      </div>
      <Form.Item
        name="discount"
        label="Add Discount Percentage"
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
          placeholder="Discount"
          style={{ width: "100%" }}
          onChange={(value) => setDiscount(value?.toString() || "")}
        />
      </Form.Item>
      <Form.Item
        name="discription"
        label="Add Discription About Discount"
        rules={[
          {
            required: true,
            message: "Please Add Discription!",
          },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Discription"
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
        {contextHolder}
        <Button type="primary" htmlType="submit" onClick={openMessage}>
          Create
        </Button>
      </Form.Item>
      <AppFooter />
    </Form>
  );
};

export default DiscountCardForm;
