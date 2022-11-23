import {BaseSyntheticEvent} from "react"
import {UseInputParamsHook} from "Types";
import {useOnBlur} from "./useOnBlur";

export const useInputText = ({
  name, 
  value, 
  setInputForm, 
  validation,
  statusForm,
}: UseInputParamsHook) => {
  const {onBlur} = useOnBlur({value, validation, statusForm});
  const change = (e:BaseSyntheticEvent) => {
    setInputForm(name,e.target.value);
    return 0;
  }
  return {change, onBlur};
}
