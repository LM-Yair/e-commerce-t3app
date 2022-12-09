import { BLUR } from "CONSTANTS/FORM";
import { FormContext } from "context/form/FormContext";
import { useOnBlur } from "hooks/forms/useOnBlur";
import { BaseSyntheticEvent, useContext } from "react";
import { Alert } from "./Alert";
import { Label } from "./Label";

export interface InputTextProps {
  name: string;
  alert: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const InputText = ({
  name,
  alert,
  label,
  placeholder,
  className = "",
}: InputTextProps) => {
  const { validationShape, status, setInputForm, form } =
    useContext(FormContext);
  const { onBlur, onFocusIn, onFocusOut } = useOnBlur({
    value: form[name],
    validation: validationShape[name],
    statusForm: status,
  });
  const change = (e: BaseSyntheticEvent) => {
    setInputForm(name, e.target.value);
    return 0;
  };
  return (
    <div>
      {label && <Label htmlFor={name} text={label} />}
      <input
        id={name}
        className={className}
        type="text"
        name={name}
        value={form[name]}
        placeholder={placeholder}
        onChange={change}
        onFocus={onFocusIn}
        onBlur={onFocusOut}
      />
      {onBlur.touch === BLUR.IS_TOUCHED &&
        onBlur.isValid === BLUR.IS_INVALID && <Alert text={alert} />}
    </div>
  );
};
