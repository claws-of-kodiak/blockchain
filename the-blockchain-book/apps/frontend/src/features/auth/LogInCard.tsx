import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import "../../styles/auth-card.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authClient";
import ErrorMsg from "../../shared/components/ErrorMsg";

export default function LogInCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
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
        {errors.root && <ErrorMsg msg={errors.root.message} />}
        <button type="submit">{isPending ? "..." : "Log In"}</button>
      </form>
      {error && <ErrorMsg msg={error.message} />}
      <span>
        <Link to="/register">Create an Account</Link>
      </span>
    </div>
  );
}
