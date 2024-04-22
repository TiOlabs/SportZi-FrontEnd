import Navbar from "../../components/navbar";
import CoachCardSection from "./coachCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";
import { usePlayer } from "../../context/player.context";
import NavbarLogin from "../../components/NavBarLogin";


const Coaches = () => {
    const { userDetails } = usePlayer();
    return (
        <>{userDetails.id!=="" ? <Navbar/> : <NavbarLogin />}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3",marginTop:"30px" }}>
        
            <HeroSection />
         
            <CoachCardSection />

        </div>
        <AppFooter/>
        </> 
     );
}
 
export default Coaches;