import {useState, BaseSyntheticEvent} from "react"
import { SetInputForm} from "Types";
import {FORM_STATUS} from "CONSTANTS/FORM";
import {AnyZodObject} from "zod";

type UseProductForm = {
  initialState: any;
  stateToReset: any;
  validationShape: AnyZodObject;
}

export const useProductForm = ({
  initialState, 
  stateToReset, 
  validationShape,
}: UseProductForm) => {
  const [form,setForm] = useState(initialState);
  const [status,setStatus] = useState(FORM_STATUS.INITIAL);

  const setInputForm: SetInputForm = (name, value) => {
    if(status !== FORM_STATUS.EDITING) setStatus(FORM_STATUS.EDITING);
    setForm({...form, [name]: value});
  }

  const submit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log('Formulario', form);
    const {success} = validationShape.safeParse(form);
    if(!success){
      setStatus(FORM_STATUS.IS_INVALID);
      return 1;
    }
    setForm(stateToReset);
    setStatus(FORM_STATUS.INITIAL);
  }
  return {form, status, setInputForm, submit};
}
