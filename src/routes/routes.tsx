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

import PlayerProfileUser from "../pages/profiles/PlayerProfileUsers";
import CoachAssignDetailsForm from "../pages/forms/coachAssignDetails.form";

import CoachProfileUser from "../pages/profiles/CoachProfileUser";

import ArcadeProfileArcade from "../pages/profiles/arcadeProfile";

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
        <Route
          path="forms/coachassigndetailsform"
          element={<CoachAssignDetailsForm />}
        />
        <Route path="PlayerUSer" element={<PlayerProfileUser />} />

        <Route path="CoachUser" element={<CoachProfileUser />} />
        <Route path="ArcadeforArcade" element={<ArcadeProfileArcade />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
