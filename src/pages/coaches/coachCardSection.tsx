import { Col, Row } from "antd";

import CoachCardCoachPage from "../../components/CoachCardCoachPage";

const Appfooter = require("../../components/footer");
const CoachCardSection = () => {
  return (
    <Row style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      backgroundColor: "#EFF4FA",
      marginBottom: "5%",
      width: "100%",
     
    
    }}>
      
     
   
      <Col style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3%"}} lg={8} xs={24} md={12}><CoachCardCoachPage/></Col>
      <Col style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3%"}} lg={8} xs={24} md={12}><CoachCardCoachPage/></Col>
      <Col style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3%"}} lg={8} xs={24} md={12}><CoachCardCoachPage/></Col>
   
  
    
     
   
   
      <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}} lg={8} xs={24} md={12}><CoachCardCoachPage/></Col>
      <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}} lg={8} xs={24} md={12}><CoachCardCoachPage/></Col>
      <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}} lg={8} xs={24} md={12}><CoachCardCoachPage/></Col>
     
     
    </Row>
  );
};

export default CoachCardSection;
