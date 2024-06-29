import { Col, Row, Button, Modal, Spin, Empty } from "antd";
import { useEffect, useState } from "react";
import { Package } from "../../../types";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const AllPackagers = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getPackageDetails`
        );
        setPackages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredpackages = packages.filter(
    (packages) =>
      packages.package_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packages.arcade.arcade_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      packages.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Col
      span={19}
      style={{ backgroundColor: "#EFF4FA", padding: "2%", marginLeft: "21%" }}
    >
      <Spin spinning={loading}>
        <Row>NAV</Row>
        <Row>
          <Col style={{ color: "#0E458E" }}>
            <h2>All Packages</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <input
              style={{ width: "100%", height: "40px" }}
              type="search"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
        {filteredpackages.length === 0 ? (
          <Empty description={"No Package Found"} />
        ) : (
          <Row>
            <Col span={24}>
              {filteredpackages.map((packagedetails) => (
                <DataRow packagedetails={packagedetails} />
              ))}
            </Col>
          </Row>
        )}
      </Spin>
    </Col>
  );
};

export default AllPackagers;

function DataRow(props: any) {
  const [cloudName] = useState("dle0txcgt");
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Row
      key={props.packagedetails.package_id}
      style={{
        backgroundColor: "white",
        padding: "1%",
        marginTop: "50px",
      }}
    >
      <Col></Col>
      <Col span={8} style={{}}>
        <div
          style={{
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "80px",
            height: "80px",
            backgroundColor: "#000",
          }}
        >
          {" "}
          <AdvancedImage
            style={{
              borderRadius: "50%",
              position: "absolute",
              width: "80px",
              height: "80px",
            }}
            cldImg={cld.image(props.packagedetails.package_image)}
          />
        </div>
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
          {props.packagedetails.package_name}
        </div>
      </Col>
      <Col span={2} style={{}}>
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
          {" "}
          LKR {props.packagedetails.rate_per_person}
        </div>
      </Col>
      <Col span={8}>
        <div
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "80px",
            height: "80px",
            backgroundColor: "#000",
          }}
        >
          <AdvancedImage
            style={{
              borderRadius: "50%",
              position: "absolute",
              width: "80px",
              height: "80px",
            }}
            cldImg={cld.image(props.packagedetails.arcade.arcade_image)}
          />
        </div>
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
          {props.packagedetails.arcade.arcade_name}
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
            onClick={showModal}
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
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <div style={{ lineHeight: 3.0, fontSize: "160px" }}>
              <Row>
                <div style={{ fontSize: "28px", color: "#0E458E" }}>
                  Arcade Details
                </div>
              </Row>
              <Row>
                <Col span={12}>
                  <Col>
                    <b>Package Name : </b> {props.packagedetails.package_name}
                  </Col>
                  <Col>
                    <b>Package Id : </b> {props.packagedetails.package_id}
                  </Col>
                  <Col>
                    <b>Package Rate : </b>{" "}
                    {props.packagedetails.rate_per_person}
                  </Col>
                  <Col>
                    <b>Coach Percentage : </b>{" "}
                    {props.packagedetails.percentageForCoach}%
                  </Col>
                  <Col>
                    <b>Package Discription : </b>{" "}
                    {props.packagedetails.description}
                  </Col>
                </Col>
                <Col span={12}>
                  <Col>
                    <b>Arcade Name : </b>{" "}
                    {props.packagedetails.arcade.arcade_name}
                  </Col>
                  <Col>
                    <b>Zone Name : </b> {props.packagedetails.zone.zone_name}
                  </Col>
                  <Col>
                    <b>Enrolled Coaches : </b>{" "}
                    {props.packagedetails.coachApplyDetailsForPackage.map(
                      (coach: any) => (
                        <div>
                          {coach.coach_id} - {coach.coach.user.firstname}{" "}
                          {coach.coach.user.lastname} - {coach.status}
                        </div>
                      )
                    )}
                  </Col>
                </Col>
              </Row>
            </div>
          </Modal>
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
  );
}
