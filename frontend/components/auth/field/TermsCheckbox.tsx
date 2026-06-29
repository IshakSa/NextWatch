import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import { ControllerFieldState, FieldValues } from "react-hook-form";

export default function TermsCheckbox({
  field,
  fieldState,
}: {
  field: FieldValues;
  fieldState: ControllerFieldState;
}) {
  const { value, ...checkboxProps } = field;

  return (
    <div className="flex gap-2 items-center justify-center">
      <Checkbox
        id="terms-checkbox"
        className="mt-1 sm:mt-0 cursor-pointer"
        aria-invalid={fieldState.invalid}
        {...checkboxProps}
        checked={value}
        onCheckedChange={field.onChange}
        required
      />
      <FieldLabel htmlFor="terms-checkbox">
        <span className="text-sm muted-text tracking-tight">
          I accept the{" "}
          <Link
            href="/privacy"
            className="text-foreground hover:underline mx-0.5"
          >
            Privacy Policy
          </Link>{" "}
          &{" "}
          <Link href="/tos" className="text-foreground hover:underline ml-0.5">
            Terms of Service
          </Link>
        </span>
      </FieldLabel>
    </div>
  );
}
