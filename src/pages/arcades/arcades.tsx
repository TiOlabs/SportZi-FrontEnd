import Navbar from "../../components/navbar";
import ArcadeCardSection from "./arcadeCardSection";
import HeroSection from "./heroSection";

const Arcades = () => {
    return ( 
        <><Navbar />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3" }}>
          
              <HeroSection />
              <ArcadeCardSection />
         </div>
         </>
     );
}
 
export default Arcades;