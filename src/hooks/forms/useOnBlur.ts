import { BaseSyntheticEvent, useEffect, useState } from "react";
import { BLUR, FORM_STATUS } from "CONSTANTS/FORM";
import { ZodType } from "zod";

export interface UseOnBlurProps {
  value?: string | number;
  validation?: ZodType;
  statusForm: number;
}

export const useOnBlur = ({ value, validation, statusForm }: UseOnBlurProps) => {
  const [onBlur, setOnBlur] = useState({
    touch: BLUR.INITIAL_STATE,
    isValid: BLUR.INITIAL_STATE,
    inFocus: BLUR.INITIAL_STATE,
    initialvalue: value,
  });
  const toggleBlur = (success: boolean) => {
      if(success && onBlur.isValid !== BLUR.IS_VALID){
        setOnBlur({ ...onBlur, isValid: BLUR.IS_VALID });
        return;
      }
      if(!success && onBlur.isValid !== BLUR.IS_INVALID){
        setOnBlur({ ...onBlur, isValid: BLUR.IS_INVALID })
        return;
      }
  };
  const onFocusIn = (e: BaseSyntheticEvent) => {
    if(e.isTrusted && onBlur.touch !== BLUR.IS_TOUCHED){
      setOnBlur({
        ...onBlur, 
        touch: BLUR.IS_TOUCHED, 
        inFocus: BLUR.IS_IN_FOCUS,
      });
    }
  }
  const onFocusOut = (e: BaseSyntheticEvent) => {
    if(e.isTrusted && onBlur.touch !== BLUR.IS_TOUCHED){
      setOnBlur({
        ...onBlur, 
        inFocus: BLUR.IS_UNFOCUSED,
      });
    }
  }
    useEffect(() => {
      // si el status del form cambia a INITIAL
      // se resetean los valores del onBlur
      if (statusForm === FORM_STATUS.INITIAL) {
        setOnBlur({
          touch: BLUR.INITIAL_STATE,
          isValid: BLUR.INITIAL_STATE,
          inFocus: BLUR.INITIAL_STATE,
          initialvalue: value,
        });
        return;
      }
      if (validation) {
        // si el status del form cambia a IS_INVALID
        // ejecuta la validación para encontrar el input con la falla
        if (statusForm === FORM_STATUS.IS_INVALID) {
          const { success } = validation.safeParse(value);
          toggleBlur(success);
          return;
        }
        // si el input ha sido enfocado se evaluará lo que se agregue en el
        if(onBlur.touch === BLUR.IS_TOUCHED) {
          const { success } = validation.safeParse(value);
          toggleBlur(success);
          return;
        }
      }
    }, [value, statusForm, onBlur.touch]);
  return { onBlur, onFocusIn, onFocusOut };
};
