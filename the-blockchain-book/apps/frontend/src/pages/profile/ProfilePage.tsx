import { Link } from "react-router";
import AdminPage from "./AdminPage";
import { IoSettingsSharp } from "react-icons/io5";
import "../../styles/index.css";

export default function ProfilePage() {
  return (
    <>
      <AdminPage />
      <Link to="/settings" className="settings-icon">
        <IoSettingsSharp className="settings-icon" /> Settings
      </Link>
    </>
  );
}
