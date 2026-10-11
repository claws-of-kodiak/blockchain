import { useForm } from "react-hook-form";
import "../../styles/auth-card.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authClient";
import { useNavigate } from "react-router";
import ErrorMsg from "../../shared/components/ErrorMsg";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@repo/validations";
import { Button } from "../../shared/components/Button";
import { FormField } from "../../shared/components/FormField";
import { Input } from "../../shared/components/Input";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isAdmin: false,
    },
  });
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
        <FormField label="" error={errors.name}>
          <Input type="text" placeholder="Name" {...register("name")} />
        </FormField>
        <FormField label="" error={errors.email}>
          <Input type="email" placeholder="Email" {...register("email")} />
        </FormField>
        <FormField label="" error={errors.date}>
          <Input
            type="text"
            placeholder="Birthday"
            {...register("birthDate")}
          />
        </FormField>
        <FormField label="" error={errors.password}>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </FormField>
        <FormField
          label="Check below if you want to be admin"
          error={errors.isAdmin}
        >
          <Input type="checkbox" {...register("isAdmin")} />
        </FormField>
        {errors.root && <ErrorMsg msg={errors.root.message} />}
        <Button type="submit" isLoading={isPending}>
          Create Account
        </Button>
      </form>
      {error && <ErrorMsg msg={error.message} />}
    </div>
  );
}
