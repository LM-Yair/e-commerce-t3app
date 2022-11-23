import {useInputNumber} from "hooks/forms/useInputNumber";
import {InputForm} from "Types";
import {Alert} from "./Alert";
import {Label} from "./Label";

type InputNumberType = 
  Omit<InputForm, "value"> & {value: string | number};

export const InputNumber = ({
  label = '', 
  name = '', 
  value = '', 
  statusForm,
  placeholder = '',
  setInputForm,
  validation,
  alert,
}: InputNumberType) => {
  const {change, onBlur} = useInputNumber({ 
    name, 
    value, 
    validation,
    setInputForm, 
    statusForm
  });
  const output = value === 0 ? '' : value;
  return(
    <div>
      { label.trim() !== '' && <Label htmlFor={name} text={label} /> }
      <input 
	id={name} 
	className="p-2 rounded-lg w-full outline-none" 
	type="text" 
	name={name}
	value={output} 
	placeholder={placeholder} 
	onChange={change}
      />
      { onBlur.isTouched && !onBlur.isValid && (<Alert text={alert}/>) }
    </div>
  );
}
