import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ErrorMsg from "../../shared/components/ErrorMsg";
import "../../styles/form.css";
import { useCourseClient } from "../../services/courseClient";
import { Button } from "../../shared/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { newSectionSchema } from "@repo/validations";
import { usePosition } from "../../services/positionClient";

export default function NewSectionForm({ onClose }) {
  const queryClient = useQueryClient();
  const { addSection } = useCourseClient();
  const { mutate, error, isPending } = addSection;
  const { position } = usePosition();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(newSectionSchema) });

  const onSubmit = (formData) => {
    const payload = { ...formData, position };
    mutate(payload, {
      onSuccess: () => {
        reset(); // Clear the form fields upon success
        queryClient.invalidateQueries({ queryKey: ["courses"] }); // Refetch data in DisplaySections
        onClose();
      },
      onError: (err) => {
        console.error("Err", err);
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
          {errors.input && <ErrorMsg msg={errors.input.message} />}
          {errors.root && <ErrorMsg msg={errors.root.message} />}
        </div>

        <Button type="submit" isLoading={isPending}>
          Create New Section
        </Button>
      </form>
    </div>
  );
}
