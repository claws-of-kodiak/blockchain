import { useUser } from "../../shared/hooks/useUser";

export default function DisplayUserData() {
  const { email, birthDate, createdAt, isAdmin } = useUser();

  console.log(email, birthDate, createdAt);

  return (
    <div id="user-data-wrap">
      <p>{email}</p>
      <p>Birthday: {birthDate.toLocaleString()}</p>
      <p>Member since: {createdAt.toLocaleString()}</p>
      <p>{isAdmin ? "You have admin permissions." : "No admin permissions"}</p>
    </div>
  );
}
