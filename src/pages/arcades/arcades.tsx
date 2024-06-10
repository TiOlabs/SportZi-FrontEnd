import Navbar from "../../components/navbar";
import ArcadeCardSection from "./arcadeCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";
import NavbarLogin from "../../components/NavBarLogin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePlayer } from "../../context/player.context";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/userContext";

const Arcades = () => {
  const arcades = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [arcades]);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);
  const { userDetails } = useUser();
  return (
    <>
      {userDetails.id !== "" ? <Navbar /> : <NavbarLogin />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: "3",
          marginTop: "30px",
        }}
      >
        <HeroSection />
        <ArcadeCardSection />
        <AppFooter />
      </div>
    </>
  );
};

export default Arcades;
