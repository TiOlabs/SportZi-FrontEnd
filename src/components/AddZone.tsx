import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { useParams } from "react-router-dom";
import { Sport } from "../types";
import { tif } from "@cloudinary/url-gen/qualifiers/format";

const AddZone = () => {
  const { ArcadeId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
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

  const [rate, setRate] = useState("");
  const [fullRate, setFullRate] = useState("");
  const [discount, setdiscount] = useState("");
  const [discountDiscription, setdiscountDiscription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [way, setWay] = useState("");
  const [arcadeName, setArcadeName] = useState("");
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("ihi7kd8o");
  const [startedTime, setStartedTime] = useState<string | null>(null);
  const [closedTime, setClosedTime] = useState<string | null>(null);
  const [discription, setDiscription] = useState("");
  const [sport, setSport] = useState("");
  const [SportDetails, setSportDetails] = useState<Sport[]>([]);
  const [timeStep, setTimeStep] = useState("");
  const handleTimeChangeStart = (time: any, timeString: string) => {
    setStartedTime(timeString);
    console.log("Selected time:", timeString);
  };
  const handleTimeChangeClose = (time: any, timeString: string) => {
    setClosedTime(timeString);
    console.log("Selected time:", timeString);
  };
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
  const [messageApi] = message.useMessage();
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
    const capacityint = parseInt(capacity);
    const rateint = parseInt(rate);
    const fullRateint = parseInt(fullRate);
    const timeStepInt = parseFloat(timeStep);
    console.log(timeStepInt);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addZoneDetails`,
        {
          zone_name: arcadeName,
          capacity: capacityint,
          time_Step: timeStepInt,
          rate: rateint,
          full_zone_rate: fullRateint,
          description: discription,
          way_of_booking: way,
          zone_image: publicId,
          open_time: startedTime,
          close_time: closedTime,
          arcade_id: ArcadeId,
          sport_id: sport,
          discount: discount,
          discount_description: discountDiscription,
        }
      );
      console.log();
      UpdateData();
      message.success("Zone added successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to add zone");
    }
    handleOk();
  };
  const UpdateData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/updateZoneDetails/:id`
      );
      setArcadeName(res.data);
      setCapacity(res.data);
      setClosedTime(res.data);
      setDiscription(res.data);
      setRate(res.data);
      setWay(res.data);
      setStartedTime(res.data);
      setSport(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(arcadeName);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getSportDetails`
        );
        const data = await res.data;
        console.log(data);
        setSportDetails(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const sortedSports = [...SportDetails].sort((a, b) =>
    a.sport_name.toString().localeCompare(b.sport_name.toString())
  );
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

      <Modal visible={isModalOpen} onOk={handleFinish} onCancel={handleCancel}>
        <Form
          layout="vertical"
          style={{ marginTop: "10%", margin: "2%" }}
          onFinish={handleFinish}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#0E458E",
            }}
          >
            <h1>Application Form - For add a zone</h1>
          </div>
          <Form.Item
            name="ArcadeName"
            label="Add your Zone Name"
            rules={[
              {
                type: "string",
                message: "Please enter a Zone name!",
              },
              {
                required: true,
                message: "Please input your Zone Name!",
              },
            ]}
          >
            <Input
              placeholder="Zone Name"
              onChange={(e) => setArcadeName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Add your Zone capacity"
            rules={[
              {
                type: "number",
                message: "Please enter Zone capacity!",
              },
              {
                required: true,
                message: "Please input Zone capacity!",
              },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject("Capacity should be greater than 0");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="capacity"
              style={{ width: "100%" }}
              onChange={(value) => setCapacity(value?.toString() || "")}
            />
          </Form.Item>
          <Form.Item
            name="timeStep"
            label="Add zone time step for one time slot"
            rules={[
              {
                type: "number",
                message: "Please enter time step!",
              },
              {
                required: true,
                message: "Please input time step!",
              },
            ]}
          >
            <Select onChange={(value) => setTimeStep(value?.toString() || "")}>
              <Select.Option value={0.5}>Half hour</Select.Option>
              <Select.Option value={1}>Hour</Select.Option>
              <Select.Option value={1.5}>One and half hour</Select.Option>
              <Select.Option value={2}>Two hour</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="rate"
            label="Add your rate (per time slot )"
            rules={[
              {
                type: "number",
                message: "Please enter a valid number!",
              },
              {
                required: true,
                message: "Please input your number!",
              },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject("Rate should be greater than 0");
                  }
                  return Promise.resolve();
                },
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
            name="ful_rate"
            label="Add your full Zone rate for a time slot (if you don't have full zone rate please enter 0, after we will calculate the rate for full zone as rate for one time slot * capacity)"
            rules={[
              {
                type: "number",
                message: "Please enter a valid number!",
              },
              {
                required: true,
                message: "Please input your number!",
              },
              {
                validator: (_, value) => {
                  if (value < 0) {
                    return Promise.reject(
                      "Rate should be greater than or equal to 0"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="full zone rate"
              style={{ width: "100%" }}
              onChange={(value) => setFullRate(value?.toString() || "")}
            />
          </Form.Item>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Add Discount
          </Checkbox>

          <Form.Item
            name="discount"
            label="discount persentage"
            rules={[
              {
                type: "number",
                message: "Please enter a valid number!",
              },
              {
                required: true,
                message: "Please input your number!",
              },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject("Rate should be greater than 0");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              disabled={!componentDisabled}
              placeholder="discount persentage"
              style={{ width: "100%" }}
              onChange={(value) => setdiscount(value?.toString() || "")}
            />
          </Form.Item>
          <Form.Item
            name="discuntDiscription"
            label="Add a description about discount"
            rules={[
              {
                type: "string",
                message: "Please enter a Zone description!",
              },
              {
                required: true,
                message: "Please input your Zone Descrition!",
              },
            ]}
          >
            <TextArea
              disabled={!componentDisabled}
              rows={2}
              placeholder="descrition"
              onChange={(e) => setdiscountDiscription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Discription"
            label="Add your Zone description"
            rules={[
              {
                type: "string",
                message: "Please enter a Zone description!",
              },
              {
                required: true,
                message: "Please input your Zone Descrition!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="descrition"
              onChange={(e) => setDiscription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="way_of_booking"
            label="Reservation Type"
            rules={[
              {
                required: true,
                message: "Please select a way of booking!",
              },
            ]}
          >
            <Select
              placeholder="Select a way of booking"
              onChange={(value) => setWay(value)}
            >
              <Select.Option value="full">full</Select.Option>
              <Select.Option value="person_by_person">
                person_by_person
              </Select.Option>
              <Select.Option value="Both">Both</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Sport"
            label="Sport"
            rules={[
              {
                required: true,
                message: "Please select a sport!",
              },
            ]}
          >
            <Select
              placeholder="Select a sport"
              onChange={(value) => setSport(value)}
              dropdownRender={(menu) => (
                <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                  {menu}
                </div>
              )}
            >
              {sortedSports.map((sport) => (
                <Select.Option value={sport.sport_id}>
                  {sport.sport_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="TimeStart"
            label="Add Zone Open Time"
            rules={[
              {
                required: true,
                message: "Please select Zone Open time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              onChange={(time, timeString: string | string[]) =>
                handleTimeChangeStart(
                  time,
                  Array.isArray(timeString) ? timeString[0] : timeString
                )
              }
            />
          </Form.Item>
          <Form.Item
            name="TimeClose"
            label="Add Zone Close Time"
            rules={[
              {
                required: true,
                message: "Please select Zone Close Time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              onChange={(time, timeString: string | string[]) =>
                handleTimeChangeClose(
                  time,
                  Array.isArray(timeString) ? timeString[0] : timeString
                )
              }
            />
          </Form.Item>

          {/* .................. picture upload........................  */}

          <Form.Item label="Upload Zone Image">
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
      </Modal>
    </>
  );
};

export default AddZone;
