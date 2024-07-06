import React, { useEffect, useState } from "react";
import {
  Button,
  Calendar,
  CalendarProps,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  TimePicker,
  message,
} from "antd";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import TextArea from "antd/es/input/TextArea";
import CloudinaryUploadWidget from "./cloudinaryUploadWidget";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import { Arcade, Zone } from "../types";
import { time } from "console";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}
interface TimeSlotsForDate {
  date: string;
  startTime: string;
  endTime: string;
}

const UpdateZone = (props: any) => {
  console.log(props);
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

  const handleOkForForseDelete = async () => {
    console.log(reason);
    await updateZoneDetails();
    messageApi.success({
      content: "Submitted successfully!",
      key,
      duration: 2,
    });
    window.location.reload();
  };

  const [rate, setRate] = useState(props.rate);
  const [capacity, setCapacity] = useState(props.capacity);
  const [way, setWay] = useState(props.way_of_booking);
  const [arcadeName, setArcadeName] = useState(props.name);
  const [publicId, setPublicId] = useState(props.zone_image);
  const [cloudName] = useState("dle0txcgt");
  const [uploadPreset] = useState("ihi7kd8o");
  const [startedTime, setStartedTime] = useState<any>(props.open_time);
  const [closedTime, setClosedTime] = useState<string | null>(props.close_time);
  const [discription, setDiscription] = useState(props.description);
  const [sportc, setSportc] = useState("");
  const [zoneBookings, setZoneBookings] = useState<Zone[]>([]);
  const [reason, setReason] = useState("");
  const [arcadeDetails, setArcadeDetails] = useState<Arcade>();
  const [discount, setdiscount] = useState(props.discount_percentage);
  const [discountDiscription, setdiscountDiscription] = useState(
    props.discount_description
  );
  const emails: string[] = [];
  const user_names: string[] = [];
  const zoneBookingIds: string[] = [];
  const user_ids: string[] = [];
  console.log(sportc);
  console.log(props.sport);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(arcadeName);
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
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
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

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
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
      startTime: props.timeForDay[index].split("-")[0],
      endTime: props.timeForDay[index].split("-")[1],
    }))
  );

  const [timeSlotsForDate, setTimeSlotsForDate] = useState<TimeSlotsForDate[]>(
    props.date.map((date: string, index: number) => ({
      date: date,
      startTime: props.timeForDate[index].split("-")[0],
      endTime: props.timeForDate[index].split("-")[1],
    }))
  );

  const handleDayChange = (index: number, value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].day = value;
    setTimeSlots(newTimeSlots);
  };

  const handleDateChange = (index: number, value: string) => {
    const newTimeSlots = [...timeSlotsForDate];
    newTimeSlots[index].date = value;
    setTimeSlotsForDate(newTimeSlots);
  };

  const handleStartTimeChange = (index: number, time: Dayjs | null) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].startTime = time ? time.format("HH:mm") : "";
    setTimeSlots(newTimeSlots);
  };

  const handleStartTimeChangeForDate = (index: number, time: Dayjs | null) => {
    const newTimeSlots = [...timeSlotsForDate];
    newTimeSlots[index].startTime = time ? time.format("HH:mm") : "";
    setTimeSlotsForDate(newTimeSlots);
  };

  const handleEndTimeChange = (index: number, time: Dayjs | null) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].endTime = time ? time.format("HH:mm") : "";
    setTimeSlots(newTimeSlots);
  };

  const handleEndTimeChangeForDate = (index: number, time: Dayjs | null) => {
    const newTimeSlots = [...timeSlotsForDate];
    newTimeSlots[index].endTime = time ? time.format("HH:mm") : "";
    setTimeSlotsForDate(newTimeSlots);
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startTime: "", endTime: "" }]);
  };

  const handleAddTimeSlotForDate = () => {
    setTimeSlotsForDate([
      ...timeSlotsForDate,
      { date: "", startTime: "", endTime: "" },
    ]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
  };

  const handleRemoveTimeSlotForDate = (index: number) => {
    const newTimeSlots = timeSlotsForDate.filter((_, i) => i !== index);
    setTimeSlotsForDate(newTimeSlots);
  };
  console.log(props.id);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `api/getarcadebookingForArcade/${ArcadeId}`
      )
      .then((res) => {
        console.log(res.data);
        setArcadeDetails(res.data);
        const filterdZoneBooking = res.data.zone.filter(
          (zone: Zone) => zone.zone_id === props.id
        );
        console.log(filterdZoneBooking);
        setZoneBookings(filterdZoneBooking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ArcadeId, props.id]);

  function getDayOfWeek(dateString: string) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return daysOfWeek[date.getUTCDay()];
  }

  const handleFinish = async () => {
    const combinedTimeslot = timeSlots.map((slot) => ({
      day: slot.day,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));
    const combinedTimeslotForDate = timeSlotsForDate.map((slot) => ({
      date: slot.date,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));

    const hasConflictingBooking = zoneBookings.some((zone) => {
      console.log(zone.zoneBookingDetails);
      return zone.zoneBookingDetails.some((booking) => {
        const dayOfWeek = getDayOfWeek(booking.date as string);
        console.log(dayOfWeek);
        console.log(booking.time);
        console.log(booking.status);
        return (
          booking.status === "success" &&
          (combinedTimeslot.some(
            (slot) =>
              slot.day === dayOfWeek &&
              isWithinZonetime(
                booking.time as string,
                slot.timeslot,
                booking.user.email as string,
                booking.zone_booking_id as string,
                booking.user.firstname as string,
                booking.user.user_id as string
              )
          ) ||
            combinedTimeslotForDate.some(
              (slot) =>
                slot.date === booking.date &&
                isWithinZonetime(
                  booking.time as string,
                  slot.timeslot,
                  booking.user.email as string,
                  booking.zone_booking_id as string,
                  booking.user.firstname as string,
                  booking.user.user_id as string
                )
            ))
        );
      });
    });
    console.log(hasConflictingBooking);

    if (hasConflictingBooking) {
      showModalForForseDelete();
      return;
    }
    await updateZoneDetails();

    // console.log(combinedTimeslot);
    // console.log(combinedTimeslotForDate);
    // const capacityint = parseInt(capacity);
    // const rateint = parseInt(rate);
    // let sportcc = sportc;
    // if (sportcc === "") {
    //   sportcc = props.sport_id;
    // }
    // try {
    //   console.log(sportcc);
    //   const res = await axios.put(
    //     `${process.env.REACT_APP_API_URL}api/updateZoneDetails/${props.id}`,
    //     {
    //       zone_name: arcadeName,
    //       capacity: capacityint,
    //       rate: rateint,
    //       description: discription,
    //       way_of_booking: way,
    //       zone_image: publicId,
    //       open_time: startedTime,
    //       close_time: closedTime,
    //       arcade_id: ArcadeId,
    //       sport_id: sportcc,
    //       combinedTimeslot: combinedTimeslot,
    //       combinedTimeslotForDate: combinedTimeslotForDate,
    //       reason: reason,
    //     }
    //   );
    //   console.log(res);
    //   message.success("Zone Updated Successfully");
    // } catch (error) {
    //   console.log("Error:");
    //   console.log(error);
    // }
    // handleOk();
  };

  const updateZoneDetails = async () => {
    console.log(discountDiscription);
    console.log(discount);
    const combinedTimeslot = timeSlots.map((slot) => ({
      day: slot.day,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));
    const combinedTimeslotForDate = timeSlotsForDate.map((slot) => ({
      date: slot.date,
      timeslot: `${slot.startTime}-${slot.endTime}`,
    }));
    console.log(combinedTimeslot);
    console.log(combinedTimeslotForDate);
    const capacityint = parseInt(capacity);
    const rateint = parseInt(rate);
    let sportcc = sportc;
    if (sportcc === "") {
      sportcc = props.sport_id;
    }
    try {
      console.log(discount);
      console.log(sportcc);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/updateZoneDetails/${props.id}`,
        {
          zone_name: arcadeName,
          capacity: capacityint,
          rate: rateint,
          description: discription,
          way_of_booking: way,
          zone_image: publicId,
          open_time: startedTime,
          close_time: closedTime,
          arcade_id: ArcadeId,
          sport_id: sportcc,
          combinedTimeslot: combinedTimeslot,
          combinedTimeslotForDate: combinedTimeslotForDate,
          discount_percentage: discount,
          discountDiscription: discountDiscription,
          reason: reason,
        }
      );
      console.log(res);
      message.success("Zone Updated Successfully");
      handleOk();
    } catch (error) {
      console.log("Error:");
      console.log(error);
    }
    try {
      console.log(reason);
      const promises = zoneBookingIds.map((id: any) =>
        axios.put(
          `${process.env.REACT_APP_API_URL}api/updatearcadebooking/${id}`,
          {
            status: "canceled_By_Arcade",
            reason: reason,
            role: "ForceDeleteZoneBookings",
            emails: emails,
            zone_name: arcadeName,
            timeForDay: combinedTimeslot,
            timeForDate: combinedTimeslotForDate,
            user_names: user_names,
            arcade_name: arcadeDetails?.arcade_name,
            arcade_id: ArcadeId,
            user_ids: user_ids,
          }
        )
      );

      const results = await Promise.all(promises);
      results.forEach((res) => console.log(res));

      message.success("Zone Updated Successfully");
      handleOk();
    } catch (error) {
      console.log("Error:");
      console.log(error);
    }
  };

  const showModalForForseDelete = () => {
    Modal.confirm({
      title: "There are existing bookings for the selected timeslots.",
      content: (
        <Form layout="vertical">
          <Form.Item label="Plese Enter a Reson ">
            <TextArea
              rows={4}
              placeholder="Please provide a reason"
              onChange={(e) => setReason(e.target.value)}
            ></TextArea>
          </Form.Item>
        </Form>
      ),
      onOk: handleOkForForseDelete,
      onCancel: handleCancel,
    });
  };

  const isWithinZonetime = (
    buttonTime: string,
    selectedTime: string,
    email: string,
    zone_Booking_id: string,
    user_name: string,
    user_id: string
  ) => {
    console.log(buttonTime, selectedTime);
    const [start, end] = selectedTime.split("-");
    const [buttonStart, buttonEnd] = buttonTime.split("-");

    // Convert times to minutes for easier comparison
    const timeToMinutes = (time: string) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    };

    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const buttonStartMinutes = timeToMinutes(buttonStart);
    const buttonEndMinutes = timeToMinutes(buttonEnd);

    // Check if button time is within the package time
    const isWithin =
      buttonStartMinutes >= startMinutes && buttonEndMinutes <= endMinutes;

    // Check for special case: add half-hour slots if needed
    if (!isWithin) {
      if (
        buttonStartMinutes === startMinutes - 30 ||
        buttonEndMinutes === endMinutes + 30
      ) {
        return true;
      }
    }
    console.log(isWithin);
    if (isWithin) {
      emails.push(email);
      zoneBookingIds.push(zone_Booking_id);
      user_names.push(user_name);
      user_ids.push(user_id);
    }

    return isWithin;
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: "#5587CC",
          color: "white",
          fontFamily: "kanit",
          marginLeft: "-10px",
        }}
      >
        Update
      </Button>
      {console.log("arcadeName", arcadeName)}
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
            <h1>Update Arcade Details</h1>
          </div>

          <Form.Item
            name="ArcadeName"
            label="Zone Name"
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
              defaultValue={arcadeName}
              onChange={(e) => {
                setArcadeName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Zone capacity"
            rules={[
              {
                type: "number",
                message: "Please enter zone capacity!",
              },
              {
                required: true,
                message: "Please input zone capacity!",
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
              defaultValue={capacity}
              onChange={(value) => setCapacity(value?.toString() || "")}
            />
          </Form.Item>

          <Form.Item
            name="rate"
            label="Zone rate"
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
              defaultValue={rate}
              onChange={(value) => setRate(value?.toString() || "")}
            />
          </Form.Item>
          <Checkbox
            defaultChecked={!!discount}
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
              defaultValue={discount}
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
              defaultValue={discountDiscription}
              disabled={!componentDisabled}
              rows={2}
              placeholder="descrition"
              onChange={(e) => setdiscountDiscription(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="Discription"
            label="Zone discription"
            rules={[
              {
                type: "string",
                message: "Please enter a Zone discription!",
              },
              {
                required: true,
                message: "Please input your Zone Discrition!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="discrition"
              defaultValue={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="way_of_booking"
            label="Way of Booking"
            rules={[
              {
                required: true,
                message: "Please select a way of booking!",
              },
            ]}
          >
            <Select
              placeholder="Select a way of booking"
              defaultValue={way}
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
                message: "Please select a sport",
              },
            ]}
          >
            <Select
              placeholder="Select a sport"
              defaultValue={props.sport}
              onChange={(value) => setSportc(value)}
            >
              <Select.Option value="S00001">Cricket</Select.Option>
              <Select.Option value="S00002">FootBall</Select.Option>
              <Select.Option value="S00003">Swimming</Select.Option>
              <Select.Option value="S00004">Gym</Select.Option>
              <Select.Option value="S00005">NetBall</Select.Option>
              <Select.Option value="S00006">Batmintain</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="TimeStart"
            label="Update Zone Open Time"
            rules={[
              {
                required: true,
                message: "Please select Zone Open time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              defaultValue={dayjs(startedTime, "HH:mm")}
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
            label="Update Zone Close Time"
            rules={[
              {
                required: true,
                message: "Please select Zone Close Time!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              defaultValue={dayjs(closedTime, "HH:mm")}
              onChange={(time, timeString: string | string[]) =>
                handleTimeChangeClose(
                  time,
                  Array.isArray(timeString) ? timeString[0] : timeString
                )
              }
            />
          </Form.Item>
          <h4 style={{ color: "red" }}>Remove time slots by day</h4>

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
            <div style={{ fontSize: "15px" }}>Add Time Slot</div>
          </Button>

          <h4 style={{ color: "red" }}>Remove time slots for special date</h4>

          {timeSlotsForDate.map((slot2: TimeSlotsForDate, index2: number) => (
            <Space key={index2} direction="vertical" style={{ width: "100%" }}>
              <Form.Item
                name={`date-${index2}`}
                label={`Select Date ${index2 + 1}`}
                rules={[
                  {
                    required: true,
                    message: "Please select a date!",
                  },
                ]}
              >
                <Calendar
                  defaultValue={slot2.date ? dayjs(slot2.date) : dayjs()}
                  onSelect={(date: Dayjs) =>
                    handleDateChange(index2, date.format("YYYY-MM-DD"))
                  }
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                />
              </Form.Item>
              <Form.Item
                name={`startTimeForDate-${index2}`}
                label={`Select Start Time ${index2 + 1}`}
                rules={[
                  {
                    required: true,
                    message: "Please select a start time!",
                  },
                ]}
              >
                <TimePicker
                  defaultValue={
                    slot2.startTime ? dayjs(slot2.startTime, "HH:mm") : null
                  }
                  format="HH:mm"
                  onChange={(time) =>
                    handleStartTimeChangeForDate(index2, time)
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name={`endTimeForDate-${index2}`}
                label={`Select End Time ${index2 + 1}`}
                rules={[
                  {
                    required: true,
                    message: "Please select an end time!",
                  },
                ]}
              >
                <TimePicker
                  defaultValue={
                    slot2.endTime ? dayjs(slot2.endTime, "HH:mm") : null
                  }
                  format="HH:mm"
                  onChange={(time) => handleEndTimeChangeForDate(index2, time)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              {index2 > 0 && (
                <Button
                  style={{ width: "40%" }}
                  onClick={() => handleRemoveTimeSlotForDate(index2)}
                >
                  <div style={{ fontSize: "15px" }}> Remove Time Slot</div>
                </Button>
              )}
            </Space>
          ))}
          <Button
            name="DateSlot"
            type="default"
            onClick={handleAddTimeSlotForDate}
            style={{ width: "40%" }}
          >
            <div style={{ fontSize: "15px" }}>Add Time Slot</div>
          </Button>
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
              defaultValue={publicId}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateZone;
