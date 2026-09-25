import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNewSection } from "../../services/courseClient";
import ErrorMsg from "../../shared/components/ErrorMsg";
import "../../styles/form.css";

export default function NewSectionForm({ onClose }) {
  const queryClient = useQueryClient();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, error } = useMutation({
    mutationFn: postNewSection,
    onSuccess: (data) => {
      console.log("Section created at:", data.createdAt);
      reset(); // Clear the form fields upon success
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Refetch data in DisplaySections
      onClose();
    },
    onError: (err) => {
      console.error("Error creating section:", err);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="form-container">
      <h2>Create New Section</h2>

      {error && (
        <p className="error-banner">
          {error.message || "Something went wrong"}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Section Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g., The First Objective"
            {...register("title", { required: "Title is required" })}
          />
          {errors.root && <ErrorMsg msg={errors.root.message} />}
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Section"}
        </button>
      </form>
    </div>
  );
}
