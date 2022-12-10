import { BLUR, INPUT_STATE } from "CONSTANTS/FORM";
import { FormContext } from "context/form/FormContext";
import { useInputValidation } from "hooks/forms/useInputValidation";
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
  const { setInputForm, form } = useContext(FormContext);

  const { onFocusIn, onFocusOut, onBlur, isValid } = useInputValidation({
    inputName: name,
  });

  const change = (e: BaseSyntheticEvent) => {
    setInputForm(name, e.target.value);
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
        isValid === INPUT_STATE.IS_INVALID && <Alert text={alert} />}
    </div>
  );
};
