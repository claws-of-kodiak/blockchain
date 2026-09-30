import { useUser } from "../../shared/hooks/useUser";

export default function DisplayUserData() {
  const { email, birthDate, createdAt } = useUser();

  console.log(email, birthDate, createdAt);

  return (
    <div id="user-data-wrap">
      <p>{email}</p>
      <p>Birthday: {birthDate.toLocaleString()}</p>
      <p>Member since: {createdAt.toLocaleString()}</p>
    </div>
  );
}
