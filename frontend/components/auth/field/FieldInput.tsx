import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "../../ui/input";

import PasswordInput from "./PasswordInput";
import TermsCheckbox from "./TermsCheckbox";
import { useFormContext } from "react-hook-form";

export default function FieldInput({
  name,
  label,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="grid gap-2">
          {field.name !== "terms" && (
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          )}

          {field.name === "terms" ? (
            <TermsCheckbox field={field} fieldState={fieldState} />
          ) : field.name === "password" || field.name === "confirmPassword" ? (
            <PasswordInput
              field={field}
              fieldState={fieldState}
              placeholder={placeholder}
            />
          ) : (
            <Input
              {...field}
              id={field.name}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              required
            />
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
