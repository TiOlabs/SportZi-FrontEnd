import Navbar from "../../components/navbar";
import ArcadeCardSection from "./arcadeCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";
import NavbarLogin from "../../components/NavBarLogin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const Arcades = () => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        setToken(Cookies.get("token"));
      }, []);
    return ( 
        <>
        {token ? <Navbar /> : <NavbarLogin/>}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3",marginTop:"30px" }}>
          
              <HeroSection />
             
              <ArcadeCardSection />
              <AppFooter/>
         </div>
         </>
     );
}
 
export default Arcades;