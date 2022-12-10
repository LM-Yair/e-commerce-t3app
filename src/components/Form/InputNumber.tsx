import { BLUR, INPUT_STATE } from "CONSTANTS/FORM";
import { FormContext } from "context/form/FormContext";
import { useInputValidation } from "hooks/forms/useInputValidation";
import { BaseSyntheticEvent, useContext } from "react";
import { Alert } from "./Alert";
import { Label } from "./Label";

export interface InputNumberProps {
  name: string;
  alert: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const InputNumber = ({
  name,
  alert,
  label,
  placeholder,
  className = "",
}: InputNumberProps) => {
  const { setInputForm, form } = useContext(FormContext);

  const { onFocusIn, onFocusOut, onBlur, isValid } = useInputValidation({
    inputName: name,
  });

  const change = (e: BaseSyntheticEvent) => {
    const input = e.target.value;
    if (input === "") return setInputForm(name, 0);
    const number = Number(input);
    const isNaN: boolean = Number.isNaN(number);
    if (!isNaN) setInputForm(name, number);
  };
  const output = form[name] === 0 ? "" : form[name];
  return (
    <div>
      {label && <Label htmlFor={name} text={label} />}
      <input
        id={name}
        className={className}
        type="text"
        name={name}
        value={output}
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
