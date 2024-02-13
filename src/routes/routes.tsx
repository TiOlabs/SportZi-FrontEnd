import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Coaches from "../pages/coaches/coaches";
import Arcades from "../pages/arcades/arcades";
import About from "../pages/about/about";
import Login from "../pages/login/login";
import SignupPlayer from "../pages/signup/signupPlayer";
import SignupCoach from "../pages/signup/signupCoach"
import SignupArcadeManager from "../pages/signup/signupArcadeManager";
import Profiles from "../pages/profiles/profiles";
import Test from "../pages/signup/test"


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="coaches" element={<Coaches/>} />
                <Route path="arcades" element={<Arcades/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="signupPlayer" element={<SignupPlayer/>}/>
                <Route path="signupCoach" element={<SignupCoach/>}/>
                <Route path="signupArcadeManager" element={<SignupArcadeManager/>} />
                <Route path="profile/:id" element={<Profiles/>}/>
                <Route path="test" element={<Test/>}/>
                

            </Routes>
        </>
    );
}

export default AppRoutes;