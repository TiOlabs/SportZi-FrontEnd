import Navbar from "../../components/navbar";
import CoachCardSection from "./coachCardSection";
import HeroSection from "./heroSection";
import AppFooter from "../../components/footer";
import { usePlayer } from "../../context/player.context";
import NavbarLogin from "../../components/NavBarLogin";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Coaches = () => {
  const { userDetails } = usePlayer();

  const coaches = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [coaches]);

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

        <CoachCardSection />
      </div>
      <AppFooter />
    </>
  );
};

export default Coaches;
