import { Col, Row, Button, Empty, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Report, ReportArcade } from "../../../types";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
const ReportUserManagement = () => {
  const [reportsArcade, setReportsArcade] = useState<ReportArcade[]>([]);
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
  const handleRemoveForReport = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}api/removeReportArcade`
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
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
          <input
            style={{ width: "100%", height: "40px" }}
            type="search"
            placeholder="Search here"
          />
        </Col>
      </Row>
      {reportsArcade.length === 0 ? (
        <div>
          <Empty description={"No Reports For Arcade"} />
        </div>
      ) : (
        reportsArcade.map((reportArcade: ReportArcade) => (
          <Row
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
                cldImg={
                  cld.image(reportArcade.reporter_user.user_image as string)
                  // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                  // .resize(Resize.scale().width(200).height(200))
                }
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
            <Col span={3} style={{}}>
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
                cldImg={
                  cld.image(reportArcade.victim_arcade.arcade_image as string)
                  // .resize(Resize.crop().width(200).height(200).gravity('auto'))
                  // .resize(Resize.scale().width(200).height(200))
                }
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
            <Col span={7} style={{}}>
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
                  >
                    Cancel
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
                    Remove
                  </div>
                </Button>
              </div>
            </Col>
            <Modal
              visible={isModalOpenForReport}
              onCancel={handleCancelForReport}
              okText="Remove"
              onOk={handleRemoveForReport}
            ></Modal>
          </Row>
        ))
      )}
    </Col>
  );
};

export default ReportUserManagement;
