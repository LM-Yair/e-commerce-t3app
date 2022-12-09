import { BLUR } from "CONSTANTS/FORM";
import { FormContext } from "context/form/FormContext";
import { useOnBlur } from "hooks/forms/useOnBlur";
import { BaseSyntheticEvent, useContext } from "react";
import { Alert } from "./Alert";
import { Label } from "./Label";

export interface InputTextAreaProps {
  name: string;
  alert: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const TextArea = ({
  name,
  alert,
  label,
  placeholder,
  className,
}: InputTextAreaProps) => {
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
      <textarea
        id={name}
        name={name}
        value={form[name]}
        placeholder={placeholder}
        onChange={change}
        className={className}
        onFocus={onFocusIn}
        onBlur={onFocusOut}
      ></textarea>
      {onBlur.touch === BLUR.IS_TOUCHED &&
        onBlur.isValid === BLUR.IS_INVALID && <Alert text={alert} />}
    </div>
  );
};
