import {FormContextType} from "interfaces/form/form";
import {createContext} from "react";

export const FormContext = createContext<FormContextType>({} as FormContextType);
