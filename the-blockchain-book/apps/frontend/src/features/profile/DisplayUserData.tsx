import { Link } from "react-router";
import { useUser } from "../../shared/hooks/useUser";
import { formatDate } from "../../util/formatDate";

export default function DisplayUserData() {
  const { name, email, birthDate, createdAt, isAdmin } = useUser();

  return (
    <div id="user-data-wrap">
      <p>
        {name} - {email}
      </p>
      <p>Birthday: {formatDate(birthDate)}</p>
      <p>Member since: {formatDate(createdAt)}</p>
      <p>
        {isAdmin ? (
          <Link to="/admin" className="retro-link">
            👷‍♂️Admin Controls
          </Link>
        ) : (
          "No admin permissions"
        )}
      </p>
    </div>
  );
}
