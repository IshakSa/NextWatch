import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { ControllerFieldState, FieldValues } from "react-hook-form";

export default function PasswordInput({
  field,
  fieldState,
  placeholder,
}: {
  field: FieldValues;
  fieldState: ControllerFieldState;
  placeholder: string;
}) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  function handlePasswordDisplay() {
    setIsPasswordShown(!isPasswordShown);
  }
  return (
    <InputGroup>
      <InputGroupInput
        {...field}
        id={field.name}
        placeholder={placeholder}
        type={isPasswordShown ? "text" : "password"}
        aria-invalid={fieldState.invalid}
        required
      />
      <InputGroupAddon align="inline-end">
        <Button variant="ghost" onClick={handlePasswordDisplay}>
          {isPasswordShown ? <EyeIcon /> : <EyeClosedIcon />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
