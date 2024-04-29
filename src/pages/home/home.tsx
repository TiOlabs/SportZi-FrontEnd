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
// Redirect or perform other logout operations if necessary

const Home = () => {
  const index = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);
  const { userDetails } = usePlayer();
  console.log("userDetails", userDetails);
  return (
    <>
      {userDetails.id!=="" ? <Navbar/> : <NavbarLogin />}
      <HeroSection />
      <CoachCardSection />
      <DiscoutCardsSection />
      <MapSction />
      <ArcadeRatingCardsSection />
      <AppFooter />
    </>
  );
};

export default Home;
