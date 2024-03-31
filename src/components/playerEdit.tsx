import { EditFilled, PlusOutlined } from "@ant-design/icons";
import {
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

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    try {
      axiosInstance
        .post("api/auth/updateplayerdetails", {
          firstname: firstname,
          lastname: lastname,
          discription: discription,
          achivements: achivements.split(","),
          image: user_image,
        })
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
    }
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
              rules={[
                {
                  required: true,
                  message: "Please input your firstname",
                  whitespace: true,
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
              rules={[
                {
                  required: true,
                  message: "Please input your lastname",
                  whitespace: true,
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
              rules={[
                {
                  required: true,
                  message: "Please input your Discription",
                  whitespace: true,
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
              rules={[
                {
                  required: true,
                  message: "Input your Achivements Using Comma Seprated",
                  whitespace: true,
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
                  required: true,
                  message: "upload profile picture",
                  whitespace: true,
                },
              ]}
              style={{}}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </Form>
        </Drawer>
      </p>
    </>
  );
};

export default PlayerEdit;