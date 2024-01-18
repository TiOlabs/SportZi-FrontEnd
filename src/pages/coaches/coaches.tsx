import CoachCardSection from "./coachCardSection";
import HeroSection from "./heroSection";

const Coaches = () => {
    return (
        <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",lineHeight:"3"}}>
        <HeroSection/>
        <CoachCardSection/>
        </div> 
     );
}
 
export default Coaches;