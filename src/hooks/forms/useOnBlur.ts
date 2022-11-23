import {useEffect, useState} from "react";
import {FORM_STATUS} from "CONSTANTS/FORM";
import {UseInputParamsHook} from "Types";

type UseOnBlur = Omit<UseInputParamsHook, 'name' | 'setInputForm'>

export const useOnBlur = ({value, validation, statusForm}:UseOnBlur) => {
  const [onBlur, setOnBlur] = useState({ 
    isTouched: false, 
    isValid: false,
    initialvalue: value, 
  });
  const toggleBlur = (success: boolean) => {
    success 
      ? setOnBlur({ ...onBlur, isTouched: true, isValid: true })
      : setOnBlur({ ...onBlur, isTouched: true, isValid: false });
      return;
  }
  useEffect(() => {
    if(statusForm === FORM_STATUS.INITIAL){
      setOnBlur({
        ...onBlur,
        isTouched: false, 
        isValid: false,
      });
      return;
    }
    if(statusForm === FORM_STATUS.IS_INVALID){
      const {success} = validation.safeParse(value);
      toggleBlur(success);
      return;
    }
    if(onBlur.initialvalue !== value) {
      const {success} = validation.safeParse(value);
      toggleBlur(success);
      return;
    };
  },[value, statusForm]);
  return { onBlur }
}
