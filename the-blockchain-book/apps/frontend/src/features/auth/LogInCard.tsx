import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function LogInCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("Form skelton works", data);

  return (
    <div className="login-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("email")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.root && <p>Error with form - please try again.</p>}
        <button type="submit">Log In</button>
      </form>
      <span>
        <Link to="/register">Create an Account</Link>
      </span>
    </div>
  );
}
