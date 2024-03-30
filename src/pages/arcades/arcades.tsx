import Navbar from "../../components/navbar";
import ArcadeCardSection from "./arcadeCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";
import CoachBookingForm from "../bookingForm/coachBookingForm";

const Arcades = () => {
    return ( 
        <><Navbar/>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3",marginTop:"30px" }}>
          
              <HeroSection />
              <CoachBookingForm/>
              <ArcadeCardSection />
              <AppFooter/>
         </div>
         </>
     );
}
 
export default Arcades;