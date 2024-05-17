import PlayerProfile from "./playerProfile";
import AppFooter from "../../components/footer";
import NavbarProfile from "../../components/NavBarProfile";
const Profiles = () => {
  return (
    <>
      <NavbarProfile/>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", lineHeight: "3"}}>
      <PlayerProfile />
      <AppFooter />
      </div>
    </>
  );
};

export default Profiles;
