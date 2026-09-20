import { useForm } from "react-hook-form";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("Form skelton works", data);

  return (
    <div className="register-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name" {...register("full-name")} />
        <input type="email" placeholder="email" {...register("email")} />
        <input type="number" placeholder="age" {...register("age")} />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.root && <p>Error with form - please try again.</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
