import { useUser } from "../../shared/hooks/useUser";
import { formatDate } from "../../util/formatDate";

export default function DisplayUserData() {
  const { email, birthDate, createdAt, isAdmin } = useUser();

  console.log(email, birthDate, createdAt);

  return (
    <div id="user-data-wrap">
      <p>{email}</p>
      <p>Birthday: {formatDate(birthDate)}</p>
      <p>Member since: {formatDate(createdAt)}</p>
      <p>{isAdmin ? "You have admin permissions." : "No admin permissions"}</p>
    </div>
  );
}
