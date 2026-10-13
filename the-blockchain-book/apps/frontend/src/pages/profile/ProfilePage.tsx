import "../../styles/index.css";
import DisplayUserData from "../../features/profile/DisplayUserData";
import Header from "../../shared/components/Header";
import { Link } from "react-router";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <DisplayUserData />
      <Link to="/settings" className="retro-link">
        ⚙️ Settings
      </Link>
    </>
  );
}
