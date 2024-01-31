import { Col, Row } from 'antd';
import * as styles from './home.module.css';
import { ColorFactory } from 'antd/es/color-picker/color';
import ButtonGroup from 'antd/es/button/button-group';
import ArcadeRatingCard from '../../components/arcadeRatingCard';
import { Route } from 'react-router-dom';
import Column from 'antd/es/table/Column';
const ArcadeRatingCardsSection = () => {
    return ( 
        <Row style={{justifyContent:"center", display:"flex", alignItems:"center", flexDirection:"column"}}>
          
                <h1 style={{color:"#0E458E" ,fontSize:"32px",fontStyle:"normal",fontWeight:"600",lineHeight:"normal", justifyContent:"center", display:"flex", alignItems:"center"}}>Arcade ratings</h1>
                <Row>
                    <Col xs={1} md={2} lg={2} xl={2}></Col>
                    <Col xs={23} md={22} lg={22} xl={10}>
                    <ArcadeRatingCard/>
                    </Col>
                    <Col xs={1} md={12} lg={12} xl={2}></Col>
                    <Col xs={23} md={12} lg={12} xl={10}>
                    <ArcadeRatingCard/>
                    </Col>
                    <Col xs={1} md={2} lg={2} xl={8}></Col>
                    <Col xs={23} md={22} lg={22} xl={16}>
                    <ArcadeRatingCard/>
                    </Col>
                </Row>
                
          

        </Row>
     );
}
 
export default ArcadeRatingCardsSection;