import Navbar from "../../components/navbar";
import ArcadeRatingCardsSection from "./arcadeRatingCardSection";
import CoachCardSection from "./coachCardSection";
import DiscoutCardsSection from "./discountCardSection";
import HeroSection from "./heroSection";
import MapSction from "./mapSection";
import AppFooter from "../../components/footer";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "3",
      }}
    >
      <Navbar />
      <HeroSection />
      <CoachCardSection />
      <DiscoutCardsSection />
      <MapSction />
      <ArcadeRatingCardsSection />
      <AppFooter />
    </div>
  );
};

export default Home;
