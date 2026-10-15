import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import "../../styles/auth-card.css";
import { useMutation } from "@tanstack/react-query";
import { login, loginWithGoogle } from "../../services/authClient";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/validations";
import { Button } from "../../shared/components/Button";
import { FormField } from "../../shared/components/FormField";
import { Input } from "../../shared/components/Input";
import { FcGoogle } from "react-icons/fc";

export default function LogInCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      reset();
      navigate("/home");
    },
  });

  const handleGoogleLogIn = async () => {
    await loginWithGoogle();
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="auth-card">
      <h2>Log In</h2>
      <Button onClick={handleGoogleLogIn}>
        <FcGoogle /> Sign in with Google
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="" error={errors.email}>
          <Input type="email" placeholder="Email" {...register("email")} />
        </FormField>
        <FormField label="" error={errors.password}>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </FormField>
        <Button type="submit" isLoading={isPending}>
          Log In
        </Button>
      </form>
      {error && <ErrorMsg msg={error.message} />}
      <span>
        <Link to="/register">Create an Account</Link>
      </span>
    </div>
  );
}
