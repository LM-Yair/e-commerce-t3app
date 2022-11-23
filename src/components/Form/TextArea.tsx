import {useInputText} from "hooks/forms/useInputText";
import {InputForm} from "Types";
import {Alert} from "./Alert";
import {Label} from "./Label";

export const TextArea = ({
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
      <textarea 
	id={name} 
	name={name}
	value={value} 
	placeholder={placeholder} 
	onChange={change}
	className="p-2 h-24 w-full resize-none rounded-lg outline-none"
      ></textarea>
      { onBlur.isTouched && !onBlur.isValid && (<Alert text={alert}/>) }
    </div>
  );
}
