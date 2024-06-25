import { Col, Row, Button,Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Arcade {
  arcade_id: String;
  arcade_name: String;
  location: String;
  address: String;
  arcade_email: String;
  manager_id: String;
  open_time: String;
  close_time: String;
  manager:{
    manager_id:String,
    user: {
      user_id: string;
      role: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      DOB: string;
      gender: string;
      accountNumber: string | null;
      is_active: string;
      user_image: string | null;
      address: String | null;
      city: String | null;
      country: String | null;
    };
    
  }
};

const ArcadeManagement = () => {
  const [arcades, setArcades] = useState<Arcade[]>([]);

  useEffect(() => {
    const fetchArcades = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
        );
        setArcades(response.data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchArcades();
  }, []);

  return (
    <Col span={19} style={{ backgroundColor: "#EFF4FA", padding: "2%" ,marginLeft:"21%" }}>
      <Row>NAV</Row>
      <Row>
        <Col style={{ color: "#0E458E" }}>
          <h2>Arcade details</h2>
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

      {arcades.map((arcadedetails) => (
        <DataRow
          arcadedetails = {arcadedetails}
        />
      ))}
    </Col>
  );
};

export default ArcadeManagement;






function DataRow(props:any){

  const { arcadedetails } = props;
  // console.log(arcadedetails);

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




  return(
    <Row
          key={arcadedetails.arcade_id}

          style={{
            backgroundColor: "white",
            padding: "1%",
            marginTop: "20px",
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
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginLeft: "100px",
                textAlign: "center",
                height: "80px",
                fontSize: "16px",
              }}
            >
              {arcadedetails.arcade_name}
              {/* Blue Feather */}
            </div>
          </Col>

          <Col span={8}>
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
              {" "}
              {arcadedetails.arcade_email}
              {/* bluefeather@gmail.com */}
            </div>
          </Col>
          <Col span={8} style={{}}>
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


              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
            <div style={{ lineHeight: 3.0, fontSize: "160px" }}>
              {/* <Row>
                <div style={{ fontSize: "28px", color: "#0E458E" }}>
                  Arcade Details
                </div>
                <Col span={24}>
                  <b>Player ID :</b> {playerdetails.player_id}
                </Col>
                <Col span={24}>
                      <b>First Name: </b> {playerdetails.user.firstname}
                </Col>
                <Col span={24}>
                      <b>Last Name: </b> {playerdetails.user.lastname}
                </Col>
                <Col span={24}>
                      <b>Email :</b> {playerdetails.user.email}
                </Col>
                <Col span={24}>
                      <b>Account Number :</b>  {playerdetails.user.accountNumber || "N/A"}
                </Col>           

                <Col span={24}>
                  <b>DOB :</b> {playerdetails.user.DOB}
                </Col>
                <Col span={24}>
                  <b>Gender :</b> {playerdetails.user.gender}
                </Col>
                <Col span={24}>
                  <b>City :</b> ratnapura
                </Col>
                <Col span={24}>
                  <b>Country :</b> Sri lanka
                </Col>
              </Row> */}
              <Row>
              <div style={{ fontSize: "28px", color: "#0E458E" }}>
                  Arcade Details
                </div>
                </Row>
              <Row>
                <Col span={12}>
                  <Col>
                  <b>Manager ID : </b> { arcadedetails.manager_id}
                  </Col>
                  <Col>
                  <b>First Name :  </b> { arcadedetails.manager.user.firstname}
                  </Col>
                  <Col>
                  <b>Last Name : </b> {arcadedetails.manager.user.lastname}
                  </Col>
                  <Col>
                  <b>Email :</b> {arcadedetails.manager.user.email}
                  </Col>
                  <Col>
                  <b>Account Number :</b> {arcadedetails.manager.user.accountNumber || "N/A"}
                  </Col>
                  <Col>
                  <b>Gender :</b> {arcadedetails.manager.user.gender}
                  </Col>
                  <Col>
                  <b>City :</b> {arcadedetails.manager.user.city || "N/A"}
                  </Col>
                  <Col>
                  <b>Country :</b> {arcadedetails.manager.user.country || "N/A"}
                  </Col>
                </Col>
                <Col span={12}>
                  <Col>
                  <b>Arcade ID : </b> { arcadedetails.arcade_id}
                  </Col>
                  <Col>
                  <b>Arcade Name :  </b> { arcadedetails.arcade_name}
                  </Col>
                  <Col>
                  <b>Arcade Email : </b> {arcadedetails.arcade_email}
                  </Col>
                  <Col>
                  <b>Address :</b> {arcadedetails.manager.user.address || "N/A"}
                  </Col>
                  <Col>
                  <b>Location :</b> {arcadedetails.location}
                  </Col>
                  <Col>
                  <b>Open TIme :</b> {arcadedetails.open_time}
                  </Col>
                  <Col>
                  <b>Close Time :</b> {arcadedetails.close_time}
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
                  Delete
                </div>
              </Button>
            </div>
          </Col>
        </Row>
  );
}
