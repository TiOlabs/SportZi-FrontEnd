import Navbar from "../../components/navbar";
import CoachCardSection from "./coachCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";



const Coaches = () => {
    return (
        <><Navbar/>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3",marginTop:"30px" }}>
        
            <HeroSection />
         
            <CoachCardSection />

        </div>
        <AppFooter/>
        </> 
     );
}
 
export default Coaches;