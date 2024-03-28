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
import CoachProfile from "../pages/profiles/coachProfile";
import PlayerProfileUser from "../pages/profiles/PlayerProfileUsers";
import CoachAssignDetailsForm from "../pages/forms/coachAssignDetails.form";
import CoachProfileUser from "../pages/profiles/CoachProfileUser";
import Admin from "../pages/admin/admin";
import ArcadeProfileArcade from "../pages/profiles/arcadeProfile";
import ArcadeProfileUser from "../pages/profiles/arcadeProfileUsers";
import Auth from "../middlewares/auth";
import PlayerProfile from "../pages/profiles/playerProfile";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="coaches"
          element={
            <Auth>
              <Coaches />
            </Auth>
          }
        />
        <Route path="arcades" element={<Arcades />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route
          path="bookings"
          element={
            <Auth>
              <BookingForm />
            </Auth>
          }
        />
        <Route path="forms/discountcardform" element={<DiscountCardForm />} />
        <Route path="signupPlayer" element={<SignupPlayer />} />
        <Route path="signupCoach" element={<SignupCoach />} />
        <Route path="coacheProfile" element={<CoachProfile />} />
        <Route path="signupArcadeManager" element={<SignupArcadeManager />} />
        <Route path="PlayerUser" element={<PlayerProfileUser />} />
        <Route
          path="forms/coachassigndetailsform"
          element={<CoachAssignDetailsForm />}
        />
        <Route path="CoachUser" element={<CoachProfileUser />} />
        <Route path="ArcadeforArcade" element={<ArcadeProfileArcade />} />
        <Route path="arcadeProfile" element={<ArcadeProfileUser />} />
        <Route path="admin" element={<Admin />} />
        <Route path="profile" element={<PlayerProfile />} />
      </Routes>
    </>
  ); /*  */
};

export default AppRoutes;
