import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCoach } from "../context/coach.context";
import { useParams } from "react-router-dom";

const CoachApplyForm = () => {
  const { coachDetails } = useCoach();
  const { ArcadeId } = useParams();
  console.log("ArcadeId", ArcadeId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log("coachDetails", coachDetails);

  const handleFinish = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addcoachassignvalues`,
        {
          coach_id: coachDetails.id,
          arcade_id: ArcadeId,
          description: description,
          duration: duration,
        }
      );
      console.log(res.data);
      alert("Applied for Coaching Successfully");
    } catch (e) {
      console.log(e);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: "#5587CC",
          fontFamily: "kanit",
          color: "#fff",
          borderRadius: "3px",
          marginTop: "30px",
        }}
      >
        Apply For Coaching
      </Button>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        okText="Apply"
        onOk={handleFinish}
      >
        <Form
          layout="vertical"
          style={{ marginTop: "10%", margin: "2%" }}
          onFinish={handleFinish}
        >
          <div
            style={{
              display: "flex",
              textAlign: "center",
              color: "#5587CC",
              height: "100px",
            }}
          >
            <ExclamationCircleTwoTone width={1000} />
            For Better Responce make sure to complete your personal details in
            your profile
          </div>
          <Form.Item
            name="Description"
            label="Description"
            rules={[
              {
                type: "string",
                message: "Please enter a valid Description!",
              },
              {
                required: true,
                message: "Please input your Descrition!",
              },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Add a Short Description about Applying for Coaching"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="Duration"
            label="Duration"
            rules={[
              { type: "integer", message: "Please enter a valid Duration!" },
              { required: true, message: "Please input your Duration!" },
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
              onChange={(value) =>
                setDuration(parseInt(value?.toString() || ""))
              }
              min={1}
              max={10}
              placeholder="Please Enter a duration that you wish to stay with us in years"
              style={{ width: "100%" }}
            ></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CoachApplyForm;