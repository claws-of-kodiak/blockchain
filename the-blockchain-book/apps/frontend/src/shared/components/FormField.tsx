import React from "react";
import ErrorMsg from "./ErrorMsg";

interface FormFieldProps {
  label: string;
  error?: Error;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="form-field-group">
      <label className="form-label">{label ? label + ": " : ""}</label>
      {children}
      {error && <ErrorMsg msg={error.message} />}
    </div>
  );
}
