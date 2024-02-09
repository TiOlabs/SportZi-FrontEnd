import { Footer } from "antd/es/layout/layout";
import Navbar from "../../components/navbar";
import ArcadeCardSection from "../arcades/arcadeCardSection";
import ArcadeRatingCardsSection from "./arcadeRatingCardSection";
import CoachCardSection from "./coachCardSection";
import DiscoutCardsSection from "./discountCardSection";
import HeroSection from "./heroSection";
import MapSction from "./mapSection";
import AppFooter from "../../components/footer";

const Home = () => {
    return (
        <>
        <Navbar/>
        <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",lineHeight:"3"}}>
            
            <HeroSection/>
            <CoachCardSection/>
            <DiscoutCardsSection/>
            <MapSction/>
            <ArcadeRatingCardsSection/>
            
        </div>
        <AppFooter/>
        </>
    );
}

export default Home;