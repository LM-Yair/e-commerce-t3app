import { FORM_STATUS } from "CONSTANTS/FORM";
import { FormProviderProps } from "interfaces/form/form";
import { BaseSyntheticEvent, useState } from "react";
import { z } from "zod";
import { FormContext } from "./FormContext";

export const FormProvider = ({
  formInit,
  className = "",
  children,
}: FormProviderProps) => {
  const [provider, setProvider] = useState({
    form: formInit.initialState,
    status: FORM_STATUS.INITIAL,
  });

  const setInputForm = (name: string, value: string | number) => {
    if (provider.status !== FORM_STATUS.EDITING) {
      setProvider({
        ...provider,
        form: {
          ...provider.form,
          [name]: value,
        },
        status: FORM_STATUS.EDITING,
      });
      return;
    }
    setProvider({
      ...provider,
      form: {
        ...provider.form,
        [name]: value,
      },
    });
    return;
  };

  const resetForm = () => {
    setProvider({
      ...provider,
      form: formInit.stateToReset,
      status: FORM_STATUS.INITIAL,
    });
  };

  const onSubmitPrevented = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const validationShape = z.object(formInit.validationShape);
    const { success } = validationShape.safeParse(provider.form);
    if (!success) {
      // console.log("Formulario - IS_INVALID", provider.form);
      setProvider({ ...provider, status: FORM_STATUS.IS_INVALID });
      return 1;
    }
    // console.log("Formulario - IS_VALID", provider.form);
    formInit.submitPrevented(resetForm, provider.form);
  };
  return (
    <FormContext.Provider
      value={{
        ...provider,
        validationShape: formInit.validationShape,
        onSubmitPrevented,
        setInputForm,
        resetForm,
      }}
    >
      <form onSubmit={onSubmitPrevented} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
