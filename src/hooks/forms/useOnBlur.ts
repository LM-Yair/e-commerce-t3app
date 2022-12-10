import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { BLUR, FORM_STATUS } from "CONSTANTS/FORM";
import { FormContext } from "context/form/FormContext";

export const useOnBlur = () => {
  const { status: statusForm } = useContext(FormContext);
  const [onBlur, setOnBlur] = useState({
    touch: BLUR.INITIAL_STATE,
    inFocus: BLUR.INITIAL_STATE,
  });
  const onFocusIn = (e: BaseSyntheticEvent) => {
    if (onBlur.touch !== BLUR.IS_TOUCHED) {
      setOnBlur({
        ...onBlur,
        touch: BLUR.IS_TOUCHED,
        inFocus: BLUR.IS_IN_FOCUS,
      });
      return;
    }
    setOnBlur({
      ...onBlur,
      inFocus: BLUR.IS_IN_FOCUS,
    });
  };
  const onFocusOut = (e: BaseSyntheticEvent) => {
    if (e.isTrusted) {
      setOnBlur({
        ...onBlur,
        inFocus: BLUR.IS_UNFOCUSED,
      });
    }
  };
  useEffect(() => {
    // si el status del form cambia a INITIAL
    // se resetean los valores del onBlur
    if (statusForm === FORM_STATUS.INITIAL) {
      setOnBlur({
        touch: BLUR.INITIAL_STATE,
        inFocus: BLUR.INITIAL_STATE,
      });
      return;
    }
  }, [statusForm]);
  return { onBlur, onFocusIn, onFocusOut };
};
