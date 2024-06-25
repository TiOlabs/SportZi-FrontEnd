import { Col, Row, Button, Empty, Modal, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Report } from "../../../types";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const ReportUserManagement = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getreports`
        );
        console.log(res.data);
        setReports(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const [isModalOpenForReport, setismodelopenForReport] = useState(false);

  const showModalForReport = () => {
    setismodelopenForReport(true);
  };
  const handleOkForReport = () => {
    setismodelopenForReport(false);
  };
  const handleCancelForReport = () => {
    setismodelopenForReport(false);
  };

  const handleDeactivateUser = async (id:any) => {
    confirm({
      title: "Are you sure Deactivate the User?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect the user.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          await axios.put(
            `${process.env.REACT_APP_API_URL}api/deactivateuser/${id}`
          );
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleRemoveForReport = async () => {
    confirm({
      title: "Are you sure Remove the User?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect the user.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}api/removeReport`
          );
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModalRejectConfirm = (id: String) => {
    confirm({
      title: "Are you sure Reject This Report?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect the user.",
      okText: "Yes",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}api/deletereport/${id}`
          );
        } catch (error) {
          console.log("error");
          console.log(error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const filteredReports = reports.filter(
    (report) =>
      report.victim_user.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      report.victim_user.lastname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      report.report_reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%",marginLeft:"21%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Report Management - Reported Users</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      {filteredReports.length === 0 ? (
        <div>
          <Empty description={"No Reports For Users"} />
        </div>
      ) : (
        filteredReports.map((report: Report) => (
          <Row
            style={{
              backgroundColor: "white",
              padding: "1%",
              marginTop: "50px",
            }}
            key={report.report_id as string}
          >
            <Col></Col>
            <Col span={7}>
              <AdvancedImage
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                }}
                cldImg={cld.image(report.reporter_user.user_image as string)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  height: "80px",
                  fontSize: "16px",
                }}
              >
                {report.reporter_user.firstname +
                  " " +
                  report.reporter_user.lastname}
              </div>
            </Col>
            <Col span={4}>
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
                {report.report_reason}
              </div>
            </Col>
            <Col span={7}>
              <AdvancedImage
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                }}
                cldImg={cld.image(report.victim_user.user_image as string)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  height: "80px",
                  fontSize: "16px",
                }}
              >
                {report.victim_user.firstname +
                  " " +
                  report.victim_user.lastname}
              </div>
            </Col>
            <Col span={6}>
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
                  onClick={showModalForReport}
                >
                  Details
                </Button>
                <Button
                  type="primary"
                  ghost
                  style={{ width: "100px", marginLeft: "20px" }}
                  onClick={() => showModalRejectConfirm(report.report_id)}
                >
                  Reject
                </Button>
              </div>
            </Col>
            <Modal
              visible={isModalOpenForReport}
              onCancel={handleCancelForReport}
              okText="Deactivate User"
              onOk={() => handleDeactivateUser(report.victim_user.user_id)} // Pass the userId here
            >
              <Row>
                <Col span={12}>
                  <b>Reporter</b> :{" "}
                  {report.reporter_user.firstname +
                    " " +
                    report.reporter_user.lastname}
                </Col>
                <Col span={12}>
                  <b>User ID</b> : {report.reporter_user.user_id}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Victim</b> :{" "}
                  {report.victim_user.firstname +
                    " " +
                    report.victim_user.lastname}
                </Col>
                <Col span={12}>
                  <b>User ID</b> : {report.victim_user.user_id}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Reason</b> : {report.report_reason}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <b>Description</b> : {report.description}
                </Col>
              </Row>
            </Modal>
          </Row>
        ))
      )}
    </Col>
  );
};

export default ReportUserManagement;
