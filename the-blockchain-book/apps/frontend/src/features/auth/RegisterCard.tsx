import { useForm } from "react-hook-form";
import "../../styles/auth-card.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authClient";
import { useNavigate } from "react-router";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
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
        {errors.root && <p>Error with form - please try again.</p>}
        <button disabled={isPending} type="submit">
          {isPending ? "..." : "Create Account"}
        </button>
      </form>
      {isError && ( // Need to copy ErrorMsg component over
        <p>There was an error creating your account. Please try again. </p>
      )}
    </div>
  );
}
