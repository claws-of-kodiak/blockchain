import { useForm } from "react-hook-form";
import { Link } from "react-router";
import "../../styles/auth-card.css";

export default function LogInCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form skelton works", data);
    reset();
  };

  return (
    <div className="auth-card">
      <h2>Log In</h2>
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
