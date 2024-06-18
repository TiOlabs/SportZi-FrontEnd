import { EditFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Grid,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  TimePicker,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { PlayerContext } from "../context/player.context";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import { ArcadeEditContext } from "../context/ArcadeEdit.context";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { Sport } from "../types";
const { Option } = Select;

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
  lastName: string;
  setLastName: (value: string) => void;
  discription: string;
  setDiscription: (value: string) => void;
  qulifications: string;
  setQulifications: (value: string) => void;
  expertice: string;
  setExpertice: (value: string) => void;
  coachId: any;
  //   address: string;
  //   setAddress: (value: string) => void;
  //   openTime: string;
  //   setopenTime: (value: string) => void;
  //   closeTime: string;
  //   setCloseTime: (value: string) => void;
  //   id: any;
}

const CoachEdit = ({
  firstname,
  setFirstname,
  lastName,
  setLastName,
  discription,
  setDiscription,
  qulifications,
  setQulifications,
  expertice,
  setExpertice,
  coachId,
}: // address,
// setAddress,
// openTime,
// setopenTime,
// closeTime,
// setCloseTime,
// id,
PlayerEditProps) => {
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
  const [timeSlots, setTimeSlots] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);
  const handleStartTimeChange = (index: number, time: Dayjs | null) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].startTime = time ? time.format("HH:mm") : "";
    setTimeSlots(newTimeSlots);
  };
  const handleEndTimeChange = (index: number, time: Dayjs | null) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].endTime = time ? time.format("HH:mm") : "";
    setTimeSlots(newTimeSlots);
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startTime: "", endTime: "" }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
  };
  const handleDayChange = (index: number, value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].day = value;
    setTimeSlots(newTimeSlots);
  };
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const commonInputStyle = {
    backgroundColor: "#d2f0ef",
    height: "40px",
  };
  const [sportDetails, setSportDetails] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getSportDetails`
        );
        setSportDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSports();
  }, []);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [combinedTimeslot, setCombinedTimeslot] = useState<
    { day: string; timeslot: string }[]
  >([]);

  const onFinish = () => {
    const newcombinedTimeslot = timeSlots.map((slot) => ({
      day: slot.day,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));
    setCombinedTimeslot(newcombinedTimeslot);
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted) {
      try {
        console.log(expertice);
        axiosInstance
          .put(`/api/auth/updatecoachDetails/${coachId}`, {
            firstname: firstname,
            lastName: lastName,
            discription: discription,
            sport_id: expertice,
            combinedTimeslot: combinedTimeslot,
            qulifications: qulifications.split(","),
          })
          .then((res) => {
            setOpen(false);
            alert("Form edited successfully!");
          })
          .catch(() => {
            setOpen(false);
            alert("Form edited w!");
          });
      } catch (err) {
        console.log(err);
      }

      setFormSubmitted(false);
    }
  }, [formSubmitted]);

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
          Edit
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
                value={firstname}
                defaultValue={firstname}
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
              style={{}}
            >
              <Input
                placeholder="Enter your last name"
                value={lastName}
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                defaultValue={discription}
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 4 }}
              />
            </Form.Item>
            {/* Qulifications */}
            <Form.Item
              name="Qulifications"
              label="Qulifications"
              rules={[
                {
                  required: true,
                  message: "Input your Qulifications Using Comma Seprated",
                  whitespace: true,
                },
              ]}
              style={{}}
            >
              <Input
                // value={}
                placeholder="Input your Qulifications Using Comma Seprated"
                onChange={(e) => setQulifications(e.target.value)}
                defaultValue={qulifications}
              />
            </Form.Item>
            {qulifications &&
              qulifications.split(",").map((qulifications: string) => {
                return <Tag>{qulifications}</Tag>;
              })}
            <Form.Item
              name="sport"
              label="Sport"
              rules={[
                {
                  required: true,
                  message: "Select your sport",
                  whitespace: true,
                },
              ]}
            >
              <Select
                placeholder="select your Sport"
                onChange={(value) => setExpertice(value)}
                style={{
                  ...commonInputStyle,
                  border: "1px solid #ccc",
                  padding: "4px",
                }}
              >
                {sportDetails.map((sport) => (
                  <Option
                    value={sport.sport_id}
                    style={{ ...commonInputStyle, border: "1px solid #ccc" }}
                  >
                    {sport.sport_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div>Select Availiable Time Slots</div>
            {/* Day and Time Slot Selection */}
            {timeSlots.map((slot, index) => (
              <Space key={index} direction="vertical" style={{ width: "100%" }}>
                <Form.Item
                  name={`day-${index}`}
                  label={`Select Day ${index + 1}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select a day!",
                    },
                  ]}
                >
                  <Select
                    defaultValue={slot.day}
                    placeholder="Select Day"
                    style={{ width: "100%" }}
                    onChange={(value) => handleDayChange(index, value)}
                  >
                    {daysOfWeek.map((day) => (
                      <Option key={day} value={day}>
                        {day}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={`startTime-${index}`}
                  label={`Select Start Time ${index + 1}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select a start time!",
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    onChange={(time) => handleStartTimeChange(index, time)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name={`endTime-${index}`}
                  label={`Select End Time ${index + 1}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select an end time!",
                    },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    onChange={(time) => handleEndTimeChange(index, time)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                {index > 0 && (
                  <Button
                    style={{ width: "40%" }}
                    onClick={() => handleRemoveTimeSlot(index)}
                  >
                    <div style={{ fontSize: "15px" }}> Remove Time Slot</div>
                  </Button>
                )}
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={handleAddTimeSlot}
              style={{ width: "auto" }}
            >
              <div style={{ fontSize: "15px" }}>Add Another Available Time</div>
            </Button>
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

export default CoachEdit;