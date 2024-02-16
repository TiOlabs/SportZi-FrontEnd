import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Coaches from "../pages/coaches/coaches";
import Arcades from "../pages/arcades/arcades";
import About from "../pages/about/about";
import Login from "../pages/login/login";
import Profiles from "../pages/profiles/profiles";
import BookingForm from "../pages/bookingForm/bookingForm";
import DiscountCardForm from "../pages/forms/discountCard.form";
import SignupPlayer from "../pages/signup/signupPlayer";
import SignupCoach from "../pages/signup/signupCoach";
import SignupArcadeManager from "../pages/signup/signupArcadeManager";


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="coaches" element={<Coaches/>} />
                <Route path="arcades" element={<Arcades/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="bookings" element={<BookingForm/>}/>
                <Route path="profile/:id" element={<Profiles/>}/>
                <Route path="forms/discountcardform" element={<DiscountCardForm/>}/>
                <Route path="signupPlayer" element={<SignupPlayer/>}/>
                <Route path="signupCoach" element={<SignupCoach/>}/>
                <Route path="signupArcadeManager" element={<SignupArcadeManager/>}/>


            </Routes>
        </>
    );
}

export default AppRoutes;