import { Col, Row } from "antd";
import CoachPageCoachCard from "../../components/CoachPageCoachCard";
import footer.tsx from "../../components/footer";

const CoachCardSection = () => {
  return (
    <Row 
     
    >
      <Row  style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor:"#EFF4FA"
      }}><Col><CoachPageCoachCard/></Col>
      </Row>
      
      
      <Row>
        <footer/>
      </Row>
     
    </Row>




  );
};

export default CoachCardSection;
