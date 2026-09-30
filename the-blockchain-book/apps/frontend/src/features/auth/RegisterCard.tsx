import { useForm } from "react-hook-form";
import "../../styles/auth-card.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authClient";
import { useNavigate } from "react-router";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@repo/validations";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: () => {
      reset();
      navigate("/login"); // create home route and constant
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="auth-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="date" placeholder="Birthday" {...register("birthDate")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input type="checkbox" {...register("isAdmin")} />
        {errors.root && <ErrorMsg msg={errors.root.message} />}
        <button disabled={isPending} type="submit">
          {isPending ? "..." : "Create Account"}
        </button>
      </form>
      {error && <ErrorMsg msg={error.message} />}
    </div>
  );
}
