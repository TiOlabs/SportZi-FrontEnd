import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  message,
  Space,
} from "antd";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { useParams } from "react-router-dom";
import { Arcade, Zone } from "../types";
import { Option } from "antd/es/mentions";
import { Dayjs } from "dayjs";

const AddPackage = () => {
  const { ArcadeId } = useParams();
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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [publicId, setPublicId] = useState("");
  const [PackageName, setPackageName] = useState("");
  const [zone, setZone] = useState<Arcade>();
  const [ZoneId, setZoneId] = useState("");
  const [CoachPrecentage, setCoachPrecentage] = useState("");
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
  const [timeSlots, setTimeSlots] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);
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

  const handleDayChange = (index: number, value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].day = value;
    setTimeSlots(newTimeSlots);
  };

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

  const handleFinish = async () => {
    const combinedTimeslot = timeSlots.map((slot) => ({
      day: slot.day,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));

    const rateInt = parseInt(rate);
    const CoachPrecentageInt = parseInt(CoachPrecentage);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addPackageDetails`,
        {
          package_name: PackageName,
          rate_per_person: rateInt,
          description: description,
          percentageForCoach: CoachPrecentageInt,
          package_image: publicId,
          arcade_id: ArcadeId,
          zone_id: ZoneId,
          combinedTimeslot: combinedTimeslot,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    handleOk();
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getZoneDetailsForArcade/${ArcadeId}`
        );
        const data = await res.data;
        console.log(data);
        setZone(data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [ArcadeId]);

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
              onChange={(e) => setPackageName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="zone"
            label="Add your Zone Name"
            rules={[
              {
                type: "string",
                message: "Please enter zone Name!",
              },
              {
                required: true,
                message: "Please enter your zone Name!",
              },
            ]}
          >
            <Select
              placeholder="Select Zone"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setZoneId(value)}
            >
              {zone?.zone.map((zone: any) => (
                <Option
                  key={zone.zone_id.toString()}
                  value={zone.zone_id.toString()}
                >
                  {zone.zone_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="rate"
            label="Add your rate per person"
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
                    return Promise.reject(
                      new Error("Rate must be greater than 0")
                    );
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
            name="description"
            label="Add Description About Package"
            rules={[
              {
                required: true,
                message: "Please Add Description!",
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
            name="CoachPercentage"
            label="Add your Coach Percentage"
            rules={[
              {
                type: "number",
                message: "Please enter coach percentage!",
              },
              {
                required: true,
                message: "Please input coach percentage!",
              },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject(
                      new Error("Rate must be greater than 0")
                    );
                  } else if (value > 100) {
                    return Promise.reject(
                      new Error("Rate must be less than 100")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="Coach Percentage"
              style={{ width: "100%" }}
              onChange={(value) => setCoachPrecentage(value?.toString() || "")}
            />
          </Form.Item>

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
            style={{ width: "40%" }}
          >
            <div style={{ fontSize: "15px" }}>Add Another Time Slot</div>
          </Button>

          {/* Picture Upload */}
          <Form.Item label="Upload Package Info Image">
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

          <Form.Item>{contextHolder}</Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPackage;
