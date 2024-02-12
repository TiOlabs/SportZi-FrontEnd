
import { Col, Row } from 'antd';
import { Rate } from 'antd';
import { Button, Flex } from 'antd';
const ArcadeRatingCard = () => {
    return ( 
        <Row>
            <div style={{width:"328px", height:"191px", backgroundColor:"#EFF4FA" ,display:"flex", marginBottom:"50px", marginLeft:"25px"}} >

                <img src="https://ucarecdn.com/dbffe489-e4c9-449f-a013-2f2381eb778c/-/preview/400x300/image.png"alt="Original Image"style={{width:"164px", height:"191px" , WebkitClipPath: "polygon(0 0, 50% 0%, 100% 100%, 0% 98%)" ,clipPath:"polygon(0 0, 100% 0%, 100% 100%, 0% 98%)"}}/>
                
                <div className='arcadeRatingCardDetail' style={{justifyContent:"center", width:"180px", display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{gap:"5px"}}>
                        <div className='arcadeRatingCardName'style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                          <div style={{fontSize:"24px",fontWeight:"700",fontStyle:"normal", width:"150px" ,justifyContent:"center",lineHeight:"1.5"}}>SSC Complex</div>
                          <div style={{fontSize:"11px",fontWeight:"500",fontStyle:"normal", width:"122px",justifyContent:"center",marginTop:"1px",lineHeight:"1.5",alignItems:"center",display:"flex"}}>level one cricket arcade</div>
                        </div>                          
                          <div style={{fill:"blue",display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2px"}}><Rate disabled defaultValue={3} style={{color:"#5587CC"}}/></div>
                          <div style={{ width:"100%", textAlign:"center",height:"auto"}}><div>Discription/discription</div></div>
                    </div>
                    <div><Button type="primary" style={{backgroundColor:"#5587CC"}}>Book Arcade</Button></div>
                </div>


            </div>
            
        </Row>
     );
}
 
export default ArcadeRatingCard;
