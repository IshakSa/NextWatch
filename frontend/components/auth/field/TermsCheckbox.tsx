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
    <div className="flex items-start gap-3 sm:items-center sm:justify-center">
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
        <span className="text-sm muted-text leading-relaxed">
          I agree to our{" "}
          <Link
            href="/privacy"
            className="text-foreground hover:underline mx-1"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/tos" className="text-foreground hover:underline mx-1">
            Terms of Service
          </Link>
        </span>
      </FieldLabel>
    </div>
  );
}
