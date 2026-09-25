import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ErrorMsg from "../../shared/components/ErrorMsg";
import "../../styles/form.css";
import { useCourseClient } from "../../services/courseClient";

export default function NewSectionForm({ onClose }) {
  const queryClient = useQueryClient();
  const { addSection } = useCourseClient();
  const { error, isPending } = addSection;

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addSection.mutate(data, {
      onSuccess: () => {
        reset(); // Clear the form fields upon success
        queryClient.invalidateQueries({ queryKey: ["courses"] }); // Refetch data in DisplaySections
        onClose();
      },
      onError: (err) => {
        console.error("Error creating section:", err);
      },
    });
  };

  return (
    <div className="form-container">
      <h2>Create New Section</h2>

      {error && (
        <p className="error-banner">
          {addSection.error.message || "Something went wrong"}
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

        <button type="submit">
          {isPending ? "Creating Section..." : "Create new section."}
        </button>
      </form>
    </div>
  );
}
