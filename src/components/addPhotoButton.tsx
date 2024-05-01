import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Button, Row, Col } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useContext, useEffect, useState } from "react";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { PlayerContext } from "../context/player.context";
import { useArcade } from "../context/Arcade.context";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddPhotoButton = () => {
  const { managerDetails } = useArcade();
  const { userDetails } = useContext(PlayerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancell = () => {
    setIsModalOpen(false);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("q25pptlj");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    showAdvancedOptions: true, //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    folder: "user-players", //upload files to the specified folder
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
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const imgObject = cld.image(publicId);
  let userId = "";
  useEffect(() => {
    let userId = "";
    if (userDetails?.id === "") {
      userId = managerDetails?.id;
    } else {
      userId = userDetails?.id;
    }
    async function fetchData() {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}api/addUserPhoto`,
          {
            image: publicId,
            user_id: userId,
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [publicId, userDetails, managerDetails.id]);
  return (
    <>
      {/* <Button
        style={{
          display: "flex",
          backgroundColor: "#fff",
          color: "#0E458E",
          border: "1px solid #0E458E",
          fontFamily: "kanit",
          fontWeight: "400",
          fontSize: "18px",
          alignItems: "center",
        }}
        type="primary"
        onClick={showModal}
      >
        Add New Photos
      </Button> */}
      <Row>
        <Col></Col>
        <Col>
          {" "}
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
          />
          <AdvancedImage
            style={{
              display: "flex",
              backgroundColor: "#fff",
              color: "#0E458E",
              border: "1px solid #0E458E",
              fontFamily: "kanit",
              fontWeight: "400",
              fontSize: "18px",
              alignItems: "center",
            }}
            cldImg={imgObject}
            plugins={[responsive(), placeholder()]}
          />
        </Col>
      </Row>
    </>
  );
};

export default AddPhotoButton;
