import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Coaches from "../pages/coaches/coaches";
import Arcades from "../pages/arcades/arcades";
import About from "../pages/about/about";
import Login from "../pages/login/login";
// import Profiles from "../pages/profiles/profiles";
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
import CoachBookingForm from "../pages/bookingForm/coachBookingForm";
import PlayerProfile from "../pages/profiles/playerProfile";
import { AdminRoute, Auth, ProtectedRoute } from "../middlewares/auth";
import ChooseArcade from "../pages/login/chooseArcade";
import ResetPassword from "../pages/login/resetPassword";
import VerifyEmail from "../components/VerifyEmail";
import SendVerification from "../components/SendVerificationEmail";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route
          path="coaches"
          element={
            <ProtectedRoute>
              {" "}
              <Coaches />{" "}
            </ProtectedRoute>
          }
        /> */}
        <Route path="coaches" element={<Coaches />} />
        <Route path="arcades" element={<Arcades />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route
          path="bookings"
          element={
            <Auth>
              <ProtectedRoute>
                {" "}
                <BookingForm />{" "}
              </ProtectedRoute>
            </Auth>
          }
        />
        <Route path="forms/discountcardform" element={<DiscountCardForm />} />
        <Route path="signupPlayer" element={<SignupPlayer />} />
        <Route path="signupCoach" element={<SignupCoach />} />
        <Route path="coachProfile" element={<CoachProfile />} />
        <Route path="signupArcadeManager" element={<SignupArcadeManager />} />
        <Route path="PlayerUser/:playerId" element={<PlayerProfileUser />} />
        <Route
          path="forms/coachassigndetailsform"
          element={
            <Auth>
              <ProtectedRoute>
                <CoachAssignDetailsForm />
              </ProtectedRoute>
            </Auth>
          }
        />
        <Route path="CoachUser/:coachId" element={<CoachProfileUser />} />
        <Route
          path="ArcadeforArcade/:ArcadeId"
          element={<ArcadeProfileArcade />}
        />
        <Route path="arcadeProfile/:ArcadeId" element={<ArcadeProfileUser />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Admin />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="coachBookingForm"
          element={
            <Auth>
              <ProtectedRoute>
                <CoachBookingForm />{" "}
              </ProtectedRoute>
            </Auth>
          }
        />
        <Route path="profile" element={<PlayerProfile />} />
        <Route path="ChooseArchade" element={<ChooseArcade />} />
        <Route path="resetPassword/:token" element={<ResetPassword />} />
        <Route path="verify-email?" element={<VerifyEmail />} />
        <Route path="sendVerificationEmail" element={<SendVerification />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

// REACT_APP_GOOGLE_MAP_API_KEY=AIzaSyBeROe-ao-HyAMy-Nx292M9Nx0Ke67Xmuc
// # REACT_APP_API_URL=https://sportzilive-hzb3h7ddaqefdvac.eastus-01.azurewebsites.net/
// REACT_APP_API_URL=http://localhost:8000/
