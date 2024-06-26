import { EditFilled, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Drawer,
  Form,
  Grid,
  Input,
  Modal,
  Skeleton,
  Space,
  Tag,
  TimePicker,
  Typography,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";
import { PlayerContext } from "../context/player.context";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import { ArcadeEditContext } from "../context/ArcadeEdit.context";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useLocation } from "../context/location.context";
import dayjs from "dayjs";

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
  discription: string;
  setDiscription: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  openTime: string;
  setopenTime: (value: string) => void;
  closeTime: string;
  setCloseTime: (value: string) => void;
  id: any;
  accNumber: any;
  setAccNumber: (value: string) => void;
  user_image: String;
}

const ArcadeEdit = ({
  firstname,
  setFirstname,
  discription,
  setDiscription,
  address,
  setAddress,
  openTime,
  setopenTime,
  closeTime,
  setCloseTime,
  id,
  accNumber,
  setAccNumber,
  user_image,
}: PlayerEditProps) => {
  console.log(
    firstname,
    discription,
    address,
    openTime,
    closeTime,
    id,
    accNumber,
    user_image
  );

  const [open, setOpen] = useState(false);
  const { userDetails } = useContext(PlayerContext);
  const [publicId, setPublicId] = useState(user_image);
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

  const imgObject = cld.image(publicId as string);
  console.log(imgObject);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    console.log(
      firstname,
      discription,
      address,
      openTime,
      closeTime,
      accNumber,
      publicId,
      selectedLocation
    );
    // {"lat":6.795160823938917,"lng":79.89616736106872}
    form
      .validateFields()
      .then((values) => {
        console.log("selectedLocation", selectedLocation);
        const location = selectedLocation
          ? JSON.stringify(selectedLocation)
          : "";
        try {
          axiosInstance
            .put(`/api/auth/updatearchadedetails/${id}`, {
              arcade_name: firstname,
              discription: discription,
              address: address,
              open_time: openTime,
              close_time: closeTime,
              location: location,
              arcade_image: publicId,
              accNumber: accNumber,
              //user_image:
            })
            .then((res) => {
              setOpen(false);
              console.log("inside then", res.data);
              message.success("Profile Updated Successfully");
              window.location.reload();
            })
            .catch(() => {
              setOpen(false);
            });
        } catch (error) {
          setOpen(false);
          onClose();
          console.error("Error:", error);
        } finally {
          message.success("Profile Updated Successfully");
          window.location.reload();
          setOpen(false);
        }
      })
      .catch((info) => {
        <Alert message="Fill All the Fields" />;
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
  const center: google.maps.LatLngLiteral = { lat: 6.7969, lng: 79.9018 };
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const handleClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        console.log("Clicked Location:", clickedLocation);
        setSelectedLocation(clickedLocation);
        setSelected(clickedLocation);
      }
    },
    [setSelectedLocation, setSelected]
  );

  if (!isLoaded) {
    return <Skeleton />;
  }

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
              name="ArcadeName"
              label="Arcade Name"
              initialValue={firstname}
              rules={[
                {
                  required: true,
                  message: "Please input Arcade name",
                  whitespace: true,
                },
                {
                  
                  message: "First name letters and only contain A-Z and a-z",
                },
              ]}
              style={{}}
            >
              <Input
                placeholder="Enter your Arcade name"
                value={userDetails?.firstName}
                onChange={(e) => setFirstname(e.target.value)}
                defaultValue={firstname}
              />
            </Form.Item>

            <Form.Item
              name="Discription"
              label="Description"
              initialValue={discription}
              rules={[
                {
                  required: true,
                  message: "Please input your description",
                  whitespace: true,
                },
                {
                  max: 100,
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
                defaultValue={discription}
              />
            </Form.Item>
            <Form.Item
              name="Address"
              label="Address"
              initialValue={address}
              rules={[
                {
                  required: true,
                  message: "Please input your Address",
                  whitespace: true,
                },
                {
                  pattern: /^[A-Za-z, ]+$/,
                  message: "Enter address using comma to separate the address",
                },
              ]}
              style={{}}
            >
              <TextArea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 4 }}
              />
            </Form.Item>
            <Form.Item
              name="TimeStart"
              label="Add Arcade Open Time"
              initialValue={openTime ? dayjs(openTime, "HH:mm") : null}
              rules={[
                {
                  required: true,
                  message: "Please select Zone Open time!",
                },
              ]}
            >
              <TimePicker
                format="HH:mm"
                onChange={(e) => setopenTime(e.format("HH:mm"))}
                defaultValue={openTime ? dayjs(openTime, "HH:mm") : null}
              />
            </Form.Item>
            <Form.Item
              name="TimeClose"
              label="Add Arcade Close Time"
              initialValue={closeTime ? dayjs(closeTime, "HH:mm") : null}
              rules={[
                {
                  required: true,
                  message: "Please select Zone Close Time!",
                },
              ]}
            >
              <TimePicker
                format="HH:mm"
                onChange={(e) => setCloseTime(e.format("HH:mm"))}
                defaultValue={closeTime ? dayjs(closeTime, "HH:mm") : null}
              />
            </Form.Item>
            <Form.Item
              name="AccNumber"
              label="Account Number"
              initialValue={accNumber}
              rules={[
                {
                  required: true,
                  message: "Please input your Account Number",
                  whitespace: true,
                },
                {
                  pattern: /^\d+$/,
                  message:
                    "Account Number Should be a number and only contain 0-9",
                },
              ]}
              style={{}}
            >
              <Input
                placeholder="Enter your Account number"
                value={accNumber}
                onChange={(e) => setAccNumber(e.target.value)}
                defaultValue={accNumber}
              />
            </Form.Item>
            <Form.Item name="Update Your Location" label="Update Your Location">
              <GoogleMap
                center={center}
                zoom={15}
                onClick={handleClick}
                mapContainerStyle={{
                  width: "100%",
                  height: "40vh",
                }}
              >
                {selected && (
                  <Marker
                    position={{
                      lat: selected.lat,
                      lng: selected.lng,
                    }}
                  />
                )}
              </GoogleMap>
            </Form.Item>
            <Form.Item
              name="Upload profile picture"
              label="Upload profile picture"
              rules={[
                {
                  //   required: true,
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
                defaultValue={publicId}
              />
            </Form.Item>
          </Form>
        </Drawer>
      </p>
    </>
  );
};

export default ArcadeEdit;
