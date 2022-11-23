import {useProductForm} from "hooks/forms/useProductForm";
import {z} from "zod";
import {InputNumber} from "./InputNumber";
import {InputText} from "./InputText";
import {Submit} from "./Submit";
import {TextArea} from "./TextArea";

const initialvalue = {
  name: '',
  description: '',
  price: 0,
  inventary: 0,
}

const inputsValidations = {
  name: z .string() .min(5),
  description: z.string().min(10),
  price: z.number().positive(),
  inventary: z.number().positive(),
}

const validShape = z.object(inputsValidations);

export const Form = () => {
  const {form, setInputForm, submit, status} = useProductForm({
    initialState: initialvalue,
    stateToReset: initialvalue,
    validationShape: validShape,
  });
  return(
    <form 
      onSubmit={submit} 
      className="p-4 text-neutral-700 mx-auto w-96 bg-neutral-100 shadow-md shadow-neutral-300 rounded-lg"
    >
      <InputText 
	label="Nombre del producto:" 
	name="name" 
	value={form.name} 
	statusForm={status}
	setInputForm={setInputForm}
	validation={inputsValidations.name}
	alert="Coloca un nombre más especifico"
      />
      <TextArea 
	label="Descripción:" 
	name="description" 
	value={form.description} 
	statusForm={status}
	setInputForm={setInputForm}
	validation={inputsValidations.description}
	alert="Debes de ser más descriptivo"
      />
      <div className="flex justify-between gap-2">
	<InputNumber 
	  placeholder="Precio MXN" 
	  name="price" 
	  value={form.price} 
	  statusForm={status}
	  setInputForm={setInputForm}
	  validation={inputsValidations.price}
	  alert="No puede ser 0 o negativo"
	/>
	<InputNumber 
	  placeholder="Inventario" 
	  name="inventary" 
	  value={form.inventary} 
	  statusForm={status}
	  setInputForm={setInputForm}
	  validation={inputsValidations.inventary}
	  alert="Debes tener en existencia"
	/>
      </div>
      <Submit />
    </form>
  );
}
