import { Link, useNavigate } from "react-router";
import { headerRouteList, profileMenuRoutes } from "../../routes";
import "../../styles/header.css";
import { logout } from "../../services/authClient";
import type { Route } from "@repo/validations";

export default function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="header-list">
          {headerRouteList.map((route: Route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}

          <li className="dropdown">
            <Link
              to="/profile"
              className="dropdown-trigger"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Profile
            </Link>

            <ul className="dropdown-menu" role="menu">
              {profileMenuRoutes.map((route) => (
                <li key={route.path} role="none">
                  <Link to={route.path} role="menuitem">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button type="button" onClick={handleLogOut}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
