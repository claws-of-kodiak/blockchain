import { Link, useNavigate } from "react-router";
import { headerRouteList } from "../../routes";
import "../../styles/header.css";
import { logout } from "../../services/authClient";

export default function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <nav>
        <ul>
          {headerRouteList &&
            headerRouteList.map((route) => (
              <li key={route.path}>
                <Link style={{ all: "unset" }} to={route.path}>
                  {route.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  );
}
