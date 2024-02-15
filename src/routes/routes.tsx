import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Coaches from "../pages/coaches/coaches";
import Arcades from "../pages/arcades/arcades";
import About from "../pages/about/about";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Profiles from "../pages/profiles/profiles";
import BookingForm from "../pages/bookingForm/bookingForm";
import DiscountCardForm from "../pages/forms/discountCard.form";
import CoachProfile from "../pages/profiles/coachProfile";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="coaches" element={<Coaches />} />
        <Route path="arcades" element={<Arcades />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="bookings" element={<BookingForm />} />
        <Route path="profile/:id" element={<Profiles />} />
        <Route path="forms/discountcardform" element={<DiscountCardForm />} />
        <Route path="coacheProfile" element={<CoachProfile />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
