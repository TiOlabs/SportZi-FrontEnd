import Navbar2 from "../../components/NavBar2";
import Navbar from "../../components/navbar";
import ArcadeCardSection from "./arcadeCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";

const Arcades = () => {
    return ( 
        <><Navbar2 />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3" }}>
          
              <HeroSection />
              <ArcadeCardSection />
              <AppFooter/>
         </div>
         </>
     );
}
 
export default Arcades;