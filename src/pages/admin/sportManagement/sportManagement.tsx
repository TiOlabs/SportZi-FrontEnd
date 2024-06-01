import { Col, Row, Button, Modal, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Sport } from "../../../types";
const SportManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sportName, setSportName] = useState("");
  const [sports, setSports] = useState<Sport[]>([]);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //     messageApi.success({
  //       content: "Submitted successfully!",
  //       key,
  //       duration: 2,
  //     });
  //     window.location.reload();
  //   };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFinish = async () => {
    setIsModalOpen(false);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/addSportDetails`,
        {
          sport_name: sportName,
        }
      );
      console.log(res);
      messageApi.open({
        type: "success",
        content: "Added Successfully!",
      });
      form.resetFields();
    } catch (e) {
      console.log(e);
    } finally {
        window.location.reload();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getSportDetails`
        );
        console.log(res);
        setSports(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Sport Management</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "30px",
        }}
      >
        <Col span={21}></Col>
        <Col span={3}>
          <Button
            onClick={showModal}
            style={{
              backgroundColor: "#EFF4FA",
              color: "#0E458E",
              borderRadius: "3px",
              fontFamily: "kanit",
              borderColor: "#0E458E",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            add Sport
          </Button>
        </Col>
      </Row>
      {sports.map(
        (sport) => (
          console.log(sport),
          (
            <Row
              style={{
                backgroundColor: "white",
                padding: "1%",
                marginTop: "50px",
              }}
            >
              <Col></Col>
              <Col span={16} style={{}}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    textAlign: "center",
                    height: "80px",
                    fontSize: "16px",
                  }}
                >
                  {sport.sport_name}
                </div>
              </Col>

              <Col span={6} style={{}}>
                <div
                  style={{
                    height: "80px",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    style={{ width: "100px", backgroundColor: "#0E458E" }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      Details
                    </div>
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    style={{ width: "100px", marginLeft: "20px" }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      Cancel
                    </div>
                  </Button>
                </div>
              </Col>
            </Row>
          )
        )
      )}
      <Modal
        visible={isModalOpen}
        onOk={handleFinish}
        okText={"Add"}
        onCancel={handleCancel}
      >
        <Form style={{ marginTop: "10%" }}>
          <Form.Item label="Sport Name">
            <input
              style={{ width: "80%" }}
              placeholder="Sport Name"
              onChange={(e) => setSportName(e.target.value)}
              type="text"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
};

export default SportManagement;
function fetchData(): import("react").DependencyList | undefined {
  throw new Error("Function not implemented.");
}
