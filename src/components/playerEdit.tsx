import { EditFilled, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Drawer,
  Form,
  Grid,
  Input,
  Modal,
  Space,
  Tag,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { PlayerContext } from "../context/player.context";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface PlayerEditProps {
  firstname: string;
  setFirstname: (value: string) => void;
  lastname: string;
  setLastname: (value: string) => void;
  discription: string;
  setDiscription: (value: string) => void;
  achivements: string;
  setAchivements: (value: string) => void;
  user_image: string; // Define the type for user_image
  setUser_image: (value: string) => void; // Define the type for setUser_image
}

const PlayerEdit = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  discription,
  setDiscription,
  achivements,
  setAchivements,
  user_image,
  setUser_image,
}: PlayerEditProps) => {
  const [open, setOpen] = useState(false);
  const { userDetails } = useContext(PlayerContext);
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("n6ykxpof");
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
  console.log(imgObject);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        try {
          axiosInstance
            .put(
              `${process.env.REACT_APP_API_URL}api/auth/updatePlayerdetails/${userDetails?.id}`,
              {
                firstname: firstname,
                lastname: lastname,
                discription: discription,
                achivements: achivements.split(","),
                user_image: publicId,
              }
            )
            .then((res) => {
              setOpen(false);
              console.log("inside then", res.data);
            })
            .catch(() => {
              setOpen(false);
            });
        } catch (error) {
          setOpen(false);
          onClose();
          console.error("Error:", error);
        }
      })
      .catch((error) => {
        <Alert message="fill All the feilds"></Alert>;
      });
  };
  const { useBreakpoint } = Grid;
  const { lg, md, sm, xs } = useBreakpoint();

  //photo upload buttons
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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //form
  const [form] = Form.useForm();
  const formItemLayout = {
    wrapperCol: {
      xl: { span: 24 },
      lg: { span: 24 },
      md: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <p>
        {" "}
        <Button
          style={{
            color: "#0E458E",
            fontFamily: "kanit",
            fontWeight: md ? "400" : "300",
            fontSize: md ? "14px" : "12px",
            borderRadius: "3px",

            height: "30px",
          }}
          onClick={showDrawer}
          icon={<EditFilled />}
        >
          Editt
        </Button>
        <Drawer
          title={
            <>
              <Typography
                style={{
                  color: "#000",
                  fontFamily: "kanit",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "500",
                }}
              >
                Edit Your Profile
              </Typography>
            </>
          }
          width={500}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#0E458E",
                  fontFamily: "kanit",
                  fontWeight: md ? "400" : "300",
                  fontSize: md ? "14px" : "12px",
                  borderRadius: "3px",
                  height: "30px",
                }}
                onClick={onFinish}
              >
                Submit
              </Button>
            </Space>
          }
        >
          <Form
            {...formItemLayout}
            method="POST"
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "94",
            }}
            style={{ maxWidth: "100%" }}
            scrollToFirstError
            colon={false}
            labelCol={{
              className: "custom-label",
            }}
          >
            {/* first name */}
            <Form.Item
              name="firstname"
              label="First Name"
              initialValue={firstname}
              rules={[
                {
                  required: true,
                  message: "Please input your firstname",
                  whitespace: true,
                },
                {
                  pattern: /^[A-Za-z]{3,}$/,
                  message:
                    "First name must be at least 3 letters and only contain A-Z and a-z",
                },
              ]}
              style={{}}
            >
              <Input
                placeholder="Enter your first name"
                value={userDetails?.firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Item>
            {/* last name */}
            <Form.Item
              name="lastname"
              label="Last Name"
              initialValue={lastname}
              rules={[
                {
                  required: true,
                  message: "Please input your lastname",
                  whitespace: true,
                },
                {
                  pattern: /^[A-Za-z]{3,}$/,
                  message:
                    "Last name must be at least 3 letters and only contain A-Z and a-z",
                },
              ]}
            >
              <Input
                placeholder="Enter your last name"
                value={userDetails?.lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="Discription"
              label="Discription"
              initialValue={discription}
              rules={[
                {
                  required: true,
                  message: "Please input your Discription",
                  whitespace: true,
                },
                {
                  min: 100,
                  message: "Description must be at least 100 characters",
                },
              ]}
              style={{}}
            >
              <TextArea
                value={userDetails?.discription}
                onChange={(e) => setDiscription(e.target.value)}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 4 }}
              />
            </Form.Item>
            {/* Achivements */}
            <Form.Item
              name="Achivements"
              label="Achivements"
              initialValue={achivements}
              rules={[
                {
                  required: true,
                  message: "Input your Achivements Using Comma Seprated",
                  whitespace: true,
                },
                {
                  pattern: /^[A-Za-z,0-9]{3,}$/,
                  message: "enter your Achivements using comma seprated,",
                },
              ]}
              style={{}}
            >
              <Input
                // value={}
                placeholder="Input your Achivements Using Comma Seprated"
                onChange={(e) => setAchivements(e.target.value)}
              />
            </Form.Item>

            {achivements &&
              achivements.split(",").map((achivements: string) => {
                return <Tag>{achivements}</Tag>;
              })}
            {/* photo upload */}
            <Form.Item
              name="Upload profile picture"
              label="Upload profile picture"
              rules={[
                {
                  //  required: true,
                  message: "upload profile picture",
                  whitespace: true,
                },
              ]}
              style={{}}
            >
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
        </Drawer>
      </p>
    </>
  );
};

export default PlayerEdit;
