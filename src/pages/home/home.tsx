import Navbar from "../../components/navbar";
import ArcadeRatingCardsSection from "./arcadeRatingCardSection";
import CoachCardSection from "./coachCardSection";
import DiscoutCardsSection from "./discountCardSection";
import HeroSection from "./heroSection";
import MapSction from "./mapSection";
import AppFooter from "../../components/footer";

const Home = () => {

    return (
        <div style={{}}>
            <Navbar/>
            <HeroSection/>
            <CoachCardSection/>
            <DiscoutCardsSection/>
            <MapSction/>
            <ArcadeRatingCardsSection/>
            <AppFooter/>
        </div>
    );
}


export default Home;
