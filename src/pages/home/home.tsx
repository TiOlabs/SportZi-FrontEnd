import Navbar from "../../components/navbar";
import ArcadeRatingCardsSection from "./arcadeRatingCardSection";
import CoachCardSection from "./coachCardSection";
import DiscoutCardsSection from "./discountCardSection";
import HeroSection from "./heroSection";
import MapSction from "./mapSection";
import AppFooter from "../../components/footer";
import NavbarLogin from "../../components/NavBarLogin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePlayer } from "../../context/player.context";
import { useLocation } from "react-router-dom";
import { useArcade } from "../../context/Arcade.context";
import { useCoach } from "../../context/coach.context";
import CoachApplyForm from "../../components/coachApplyForArcade";
import ArcadeZoneCardUserView from "../../components/arcadeZoneCard(UserView)";

const Home = () => {
  const location = useLocation();
  const [token, setToken] = useState<string | undefined>(undefined);
  const { userDetails } = usePlayer();
  const { managerDetails } = useArcade();
  const { coachDetails } = useCoach();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {userDetails.id !== "" ||
      managerDetails.id !== "" ||
      coachDetails.id !== "" ? (
        <Navbar />
      ) : (
        <NavbarLogin />
      )}
      <HeroSection />
      {/* <ArcadeZoneCardUserView /> */}
      {/* <CoachApplyForm /> */}
      <CoachCardSection />
      <DiscoutCardsSection />
      <MapSction />
      <ArcadeRatingCardsSection />
      <AppFooter />
    </>
  );
};

export default Home;
