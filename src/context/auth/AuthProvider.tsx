import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AUTH_STATUS, JWT_STATUS } from "CONSTANTS/AUTH";
import { jwt_get } from "utils/client/jsonwebtoken";
import { trpc } from "utils/trpc";
import { AuthContext } from "./AuthContext";
import { Notice } from "components/Info/Notice";

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
  redirect?: boolean;
  hideContentDurignValidating?: boolean;
}

const auth_initial = {
  auth_status: AUTH_STATUS.INITIAL,
  jwt_status: JWT_STATUS.INITIAL,
};
const redirectTo = "/login";

export const AuthProvider = ({
  children,
  redirect = false,
  hideContentDurignValidating = false,
}: AuthProviderProps) => {
  const router = useRouter();
  const ctx = trpc.useContext();
  const [statusAuth, setStatusAuth] = useState(auth_initial);

  const redirectToLoginPage = () => router.replace(redirectTo);
  // si se habilita la redirección
  // se se ejecutará autoRedirect donde se llamé
  const autoRedirect = () => {
    if (redirect) redirectToLoginPage();
  };

  useEffect(() => {
    const jwt = jwt_get("jwt");
    if (!jwt) {
      autoRedirect();
      setStatusAuth({
        ...statusAuth,
        jwt_status: JWT_STATUS.JWT_DOES_NOT_EXIST,
      });
      return;
    }
    ctx.userAuth.verifyAuth
      .fetch({ jwt })
      .then((data) => {
        if (data.error || !data.tokenIsValid) {
          autoRedirect();
          setStatusAuth({
            auth_status: AUTH_STATUS.AUTHENTICATED,
            jwt_status: JWT_STATUS.JWT_HAS_EXPIRED,
          });
          return;
        }
        if (data.tokenIsValid) {
          setStatusAuth({
            auth_status: AUTH_STATUS.AUTHENTICATED,
            jwt_status: JWT_STATUS.JWT_HAS_NOT_EXPIRED,
          });
        }
      })
      .catch(console.warn);
  }, []);
  const valueCtx = {
    statusAuth,
    redirectToLoginPage,
  };
  // si hideContentDurignValidating esta en true
  // no mostrará el contenido mientras se hace la validación
  if (
    hideContentDurignValidating &&
    statusAuth.jwt_status === JWT_STATUS.INITIAL
  ) {
    return (
      <div className="background_desing flex h-screen items-center justify-center">
        <Notice text="Validando autenticación" />
      </div>
    );
  }
  if (redirect && statusAuth.auth_status !== AUTH_STATUS.AUTHENTICATED) {
    return (
      <div className="background_desing flex h-screen items-center justify-center">
        <Notice text="Redireccionando" />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={valueCtx}>{children}</AuthContext.Provider>
  );
};
