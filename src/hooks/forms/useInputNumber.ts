import {BaseSyntheticEvent} from "react"
import {UseInputParamsHook} from "Types";
import {useOnBlur} from "./useOnBlur";

export const useInputNumber = ({
  name, 
  value, 
  validation,
  setInputForm, 
  statusForm 
}: UseInputParamsHook) => {
  const {onBlur} = useOnBlur({value, validation, statusForm});
  const change = (e:BaseSyntheticEvent) => {
    const input = e.target.value;
    if(input === '') return setInputForm(name, 0);
    const number = Number(input);
    const isNaN: boolean = Number.isNaN(number);
    if(!isNaN) setInputForm(name, number);
  } 
  return {change, onBlur};
}
