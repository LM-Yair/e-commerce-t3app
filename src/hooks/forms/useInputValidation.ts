import {BLUR, FORM_STATUS, INPUT_STATE} from "CONSTANTS/FORM";
import {FormContext} from "context/form/FormContext";
import {useContext, useEffect, useState} from "react";
import {useOnBlur} from "./useOnBlur";

interface UseInputValidationProps {
  inputName: string;
}

export const useInputValidation = ({inputName}: UseInputValidationProps) => {
  const {
    validationShape,
    form,
    status: statusForm,
  } = useContext(FormContext);
  const { onBlur, onFocusIn, onFocusOut } = useOnBlur();
  const [isValid, setIsValid] = useState(INPUT_STATE.INITIAL_STATE);

  useEffect(() => {
    // si el input esta fuera de foco o no ha sido tocado, return;
    if (onBlur.inFocus !== BLUR.IS_IN_FOCUS && onBlur.touch !== BLUR.IS_TOUCHED)
      return;
    // si el status del form se resetea, isValid vuelve a su estado inicial.
    if (
      statusForm === FORM_STATUS.INITIAL &&
      isValid !== INPUT_STATE.INITIAL_STATE
    ) {
      setIsValid(INPUT_STATE.INITIAL_STATE);
      return;
    }
    // si existe validacion para este input, se ejecuta
    const validationState = validationShape[inputName]?.safeParse(form[inputName]);
    if (validationState?.success) {
      setIsValid(INPUT_STATE.IS_VALID);
      return;
    }
    setIsValid(INPUT_STATE.IS_INVALID);
  }, [form[inputName]]);

  return {isValid,onBlur,onFocusIn, onFocusOut};
}
