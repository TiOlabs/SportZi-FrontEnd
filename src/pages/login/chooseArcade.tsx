import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ArcadeCardForMannager from "../../components/ArcadeCardForMannager";
import axiosInstance from "../../axiosInstance";
interface Arcade {
  arcade_id: string;
  arcade_name: string;
  // Add other properties as needed
}

interface Manager {
  Manager: {
    arcade: Arcade[];
    // Add other properties as needed
  };
}
const ChooseArcade = () => {
  const [managersArcades, setManagersArcades] = useState<Manager | null>(null);

  useEffect(() => {
    axiosInstance

      .get("/api/auth/getchoosenArcade/")
      .then((res) => {
        const data = res.data;
        setManagersArcades(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <>
      <style>
        overflowY: "hidden", @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
      </style>
      <Row style={{ width: "100%", height: "100vh" }}>
        <Col xs={8}></Col>
        <Col
          xs={8}
          style={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "24px",
              fontWeight: "500",
              color: "#000",
              fontFamily: "kanit",
              marginBottom: "20px",
            }}
          >
            {" "}
            Choose your Arcade
          </p>

          {managersArcades &&
            managersArcades.Manager.arcade.map(
              (arcade: Arcade, index: number) => (
                <ArcadeCardForMannager
                  name={arcade.arcade_name}
                  id={arcade.arcade_id}
                />
              )
            )}
        </Col>
        <Col xs={8}></Col>
      </Row>
    </>
  );
};
export default ChooseArcade;
