import { FormProvider } from "context/form/FormProvider";
import { FormProviderProps } from "interfaces/form/form";

export const Form = (props: FormProviderProps) => {
  return <FormProvider {...props}>{props.children}</FormProvider>;
};
