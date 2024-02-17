import Navbar2 from "../../components/NavBar2";
import Navbar from "../../components/navbar";
import CoachCardSection from "./coachCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";

const Coaches = () => {
    return (
        <><Navbar2 />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3" }}>
            <HeroSection />
            <CoachCardSection />

        </div>
        <AppFooter/>
        </> 
     );
}
 
export default Coaches;