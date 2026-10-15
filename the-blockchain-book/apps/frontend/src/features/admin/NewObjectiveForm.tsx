import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ErrorMsg from "../../shared/components/ErrorMsg";
import "../../styles/form.css";
import { useCourseClient } from "../../services/courseClient";
import { useParams } from "react-router";
import { newObjectiveSchema } from "@repo/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../shared/components/Button";
import { usePosition } from "../../services/positionClient";
import { FormField } from "../../shared/components/FormField";
import { Input } from "../../shared/components/Input";

export default function NewObjectiveForm({ onClose }) {
  const queryClient = useQueryClient();
  const { addObjective } = useCourseClient();
  const { error, isPending } = addObjective;
  const { sectionId } = useParams();
  const { position } = usePosition();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newObjectiveSchema),
  });

  const onSubmit = (data) => {
    const payload = { ...data, sectionId, position };
    addObjective.mutate(payload, {
      onSuccess: () => {
        reset(); // Clear the form fields upon success
        queryClient.invalidateQueries({ queryKey: ["sections"] }); // Refetch data in EditSection
        onClose();
      },
      onError: (err) => {
        console.error("Err", err.message);
      },
    });
  };

  return (
    <div className="form-container">
      <h2>New Objective</h2>

      {error && (
        <p className="error-banner">
          {addObjective.error.message || "Something went wrong"}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <FormField label="" error={errors.label}>
            <Input type="text" placeholder="Label" {...register("label")} />
          </FormField>
          <FormField label="" error={errors.description}>
            <Input
              id="description"
              type="text"
              placeholder="Description"
              {...register("description")}
            />
          </FormField>
        </div>
        <Button type="submit" isLoading={isPending}>
          Add to Section
        </Button>
      </form>
    </div>
  );
}
