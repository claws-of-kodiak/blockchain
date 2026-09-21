import { useForm } from "react-hook-form";
import "../../styles/auth-card.css";

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("Form skelton works", data);

  return (
    <div className="auth-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full Name" {...register("full-name")} />
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="number" placeholder="Age" {...register("age")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.root && <p>Error with form - please try again.</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
