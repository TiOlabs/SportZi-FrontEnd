import { Col, Row, Button, Empty, Modal, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReportArcade } from "../../../types";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";

const ReportManagement = () => {
  const [reportsArcade, setReportsArcade] = useState<ReportArcade[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getreportarcades`
        );
        console.log(res.data);
        setReportsArcade(res.data);
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

  const [isModalOpenForReport, setIsModalOpenForReport] = useState(false);
  const [showConfirmModelForRemoveUser, setShowConfirmModelForRemoveUser] =
    useState(false);

  const showModalForReport = () => {
    setIsModalOpenForReport(true);
  };

  const handleOkForReport = () => {
    setIsModalOpenForReport(false);
  };

  const handleCancelForReport = () => {
    setIsModalOpenForReport(false);
  };

  const handleRemoveForReport = async () => {
    confirm({
      title: "Are you sure Remove the Arcade?",
      icon: <ExclamationCircleFilled />,
      content: "This may affect to the user and the arcade.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}api/removeReportArcade`
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
      content: "This may affect to the user and the arcade.",
      okText: "Yes",
      cancelText: "No",
      okCancel: true,
      async onOk() {
        try {
          const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}api/deletereportarcade/${id}`
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

  const filteredReports = reportsArcade.filter(
    (reportArcade) =>
      reportArcade.victim_arcade.arcade_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reportArcade.report_reason
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Report Management - Reported Arcades</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>
      {filteredReports.length === 0 ? (
        <div>
          <Empty description={"No Reports For Arcade"} />
        </div>
      ) : (
        filteredReports.map((reportArcade: ReportArcade) => (
          <Row
            key={reportArcade.report_id as string}
            style={{
              backgroundColor: "white",
              padding: "1%",
              marginTop: "50px",
            }}
          >
            <Col></Col>
            <Col span={7} style={{}}>
              <AdvancedImage
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                }}
                cldImg={cld.image(
                  reportArcade.reporter_user.user_image as string
                )}
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
                {reportArcade.reporter_user.firstname +
                  " " +
                  reportArcade.reporter_user.lastname}
              </div>
            </Col>
            <Col span={4} style={{}}>
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
                {reportArcade.report_reason}
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
                cldImg={cld.image(
                  reportArcade.victim_arcade.arcade_image as string
                )}
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
                {reportArcade.victim_arcade.arcade_name}
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
                    onClick={showModalForReport}
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
                    onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                      showModalRejectConfirm(reportArcade.report_id)
                    }
                  >
                    Reject
                  </div>
                </Button>
              </div>
            </Col>
            <Modal
              visible={isModalOpenForReport}
              onCancel={handleCancelForReport}
              okText="Remove"
              onOk={handleRemoveForReport}
            >
              <Row>
                <Col span={12}>
                  <b>Reporter</b> :{" "}
                  {reportArcade.reporter_user.firstname +
                    "" +
                    reportArcade.reporter_user.lastname}
                </Col>
                <Col span={12}>
                  <b>User ID</b> : {reportArcade.reporter_user.user_id}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Victim</b> : {reportArcade.victim_arcade.arcade_name}
                </Col>
                <Col span={12}>
                  <b>Arcade ID</b> : {reportArcade.victim_arcade.arcade_id}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <b>Reason</b> : {reportArcade.report_reason}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <b>Description</b> : {reportArcade.description}
                </Col>
              </Row>
            </Modal>
          </Row>
        ))
      )}
    </Col>
  );
};

export default ReportManagement;
