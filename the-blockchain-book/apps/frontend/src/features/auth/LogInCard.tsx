import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import "../../styles/auth-card.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authClient";

export default function LogInCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      reset();
      navigate("/home");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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
        <button type="submit">{isPending ? "..." : "Log In"}</button>
      </form>
      {isError && <p>Error Message here</p>}
      <span>
        <Link to="/register">Create an Account</Link>
      </span>
    </div>
  );
}
