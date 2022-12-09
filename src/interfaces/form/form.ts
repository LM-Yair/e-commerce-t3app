import {BaseSyntheticEvent} from "react";
import {ZodType} from "zod";

export interface FormContextType {
  form: {
    [key: string]: string | number;
  };
  validationShape: {
    [key: string]: ZodType;
  };
  status: number;
  onSubmitPrevented: (e: BaseSyntheticEvent) => void;
  setInputForm: (name: string, value: string | number) => void;
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
    submitPrevented: Function;
  };
  children: JSX.Element| JSX.Element[];
}

export interface FormInputText {
  label?: string; 
  name: string;
  placeholder?: string;
  alert: string;
}
