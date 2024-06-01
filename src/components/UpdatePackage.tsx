import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  TimePicker,
  message,
} from "antd";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import { useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import dayjs, { Dayjs } from "dayjs";
import { Arcade } from "../types";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface UpdatePackageProps {
  rate: string;
  packageDescription: string;
  packageImage: string;
  packageName: string;
  coachPrecentage: string;
  package_id: string;
  day: string[];
  time: string[];
  zone_id: string;
}

const UpdatePackage = (props: UpdatePackageProps) => {
  const { ArcadeId } = useParams();
  console.log("props", props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zone, setZone] = useState<Arcade>();
  const [ZoneId, setZoneId] = useState("");
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
    const combinedTimeslot = timeSlots.map((slot) => ({
      day: slot.day,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));
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
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    props.day.map((day: string, index: number) => ({
      day,
      startTime: props.time[index].split("-")[0],
      endTime: props.time[index].split("-")[1],
    }))
  );

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
          backgroundColor: "#5587CC",
          color: "white",
          fontFamily: "kanit",
        }}
      >
        Update
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
              defaultValue={props.zone_id}
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
                    return Promise.reject(
                      new Error("Rate must be greater than 0")
                    );
                  }
                },
              },
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
                    return Promise.reject(
                      new Error("Rate must be greater than 0")
                    );
                  } else if (value > 100) {
                    return Promise.reject(
                      new Error("Rate must be less than 100")
                    );
                  }
                },
              },
            ]}
          >
            <InputNumber
              defaultValue={props.coachPrecentage}
              placeholder="Coach Precentage"
              style={{ width: "100%" }}
              onChange={(value) => setCoachPrecentage(value?.toString() || "")}
            />
          </Form.Item>
          {timeSlots.map((slot: TimeSlot, index: number) => (
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
                  defaultValue={
                    slot.startTime ? dayjs(slot.startTime, "HH:mm") : null
                  }
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
                  defaultValue={
                    slot.endTime ? dayjs(slot.endTime, "HH:mm") : null
                  }
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

          {/* .................. picture upload........................  */}

          <Form.Item label="Update Package Info Image">
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
            />

            <AdvancedImage
              style={{ maxWidth: "100px" }}
              cldImg={imgObject}
              plugins={[responsive(), placeholder()]}
              defaultValue={props.packageImage}
            />
          </Form.Item>
          <Form.Item>{contextHolder}</Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePackage;
