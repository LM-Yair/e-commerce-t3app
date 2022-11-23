import {useInputText} from "hooks/forms/useInputText";
import {InputForm} from "Types";
import {Alert} from "./Alert";
import {Label} from "./Label";

export const InputText = ({
  label = '', 
  name = '', 
  value = '', 
  statusForm,
  placeholder = '',
  setInputForm,
  validation,
  alert,
}: InputForm) => {
  const {change, onBlur} = useInputText({
    name, 
    value, 
    setInputForm, 
    validation, 
    statusForm
  });
  return(
    <div>
      { label.trim() !== '' && <Label htmlFor={name} text={label}/> }
      <input 
	id={name} 
	className="p-2 rounded-lg w-full outline-none" 
	type="text" 
	name={name}
	value={value} 
	placeholder={placeholder} 
	onChange={change}
      />
      { onBlur.isTouched && !onBlur.isValid && (<Alert text={alert}/>) }
    </div>
  );
}
