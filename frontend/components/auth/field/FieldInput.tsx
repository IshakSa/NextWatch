import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "../../ui/input";

import PasswordInput from "./PasswordInput";
import TermsCheckbox from "./TermsCheckbox";
import { useFormContext } from "react-hook-form";

interface FieldInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

export default function FieldInput<TFieldValues extends FieldValues>({
  name,
  label,
  type,
  placeholder,
}: FieldInputProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="grid gap-2">
          {field.name !== "terms" && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          {field.name === "terms" ? (
            <TermsCheckbox field={field} fieldState={fieldState} />
          ) : field.name === "password" || field.name === "confirmPassword" ? (
            <PasswordInput field={field} fieldState={fieldState} placeholder={placeholder} />
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
