import { BaseSyntheticEvent } from "react";
import { ZodType } from "zod";

export interface Form {
  [key: string]: string | number;
}

export interface FormContextType {
  form: Form;
  validationShape: {
    [key: string]: ZodType;
  };
  status: number;
  onSubmitPrevented: (e: BaseSyntheticEvent) => void;
  setInputForm: (name: string, value: string | number) => void;
  resetForm: () => void;
}

export interface FormProviderProps {
  className?: string;
  formInit: {
    initialState: {
      [key: string]: string | number;
    };
    stateToReset: {
      [key: string]: string | number;
    };
    validationShape: {
      [key: string]: ZodType;
    };
    submitPrevented: (resetForm: Function, values: Form) => any;
  };
  children: JSX.Element | JSX.Element[];
}

export interface FormInputText {
  label?: string;
  name: string;
  placeholder?: string;
  alert: string;
}
